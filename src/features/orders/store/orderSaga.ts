import { call, put, takeLatest, all } from "redux-saga/effects";
import { ordersTable } from "@/services/dexie/tables/orders";
import { agentsTable } from "@/services/dexie/tables/agents";
import {
  setOrders,
  setAgents,
  setError,
  fetchOrdersRequest,
  fetchAgentsRequest,
  updateOrderStatusRequest,
  assignOrderRequest,
  createOrderRequest,
} from "@/features/orders/store/orderSlice";
import { productsTable } from "@/services/dexie/tables/products";
import { fetchProductsRequest } from "@/features/inventory/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrderStatus, Order } from "@/features/orders/types";
import type { DeliveryAgent } from "@/features/orders/types/agents";
import type { Product } from "@/features/inventory/types";
import { AGENT_STATUS } from "@/features/orders/const";

function* seedData() {
  const existingAgents: DeliveryAgent[] = yield call(agentsTable.getAll);

  if (!existingAgents?.length) {
    const dummyAgents: DeliveryAgent[] = [
      {
        id: "agent-1",
        name: "Express Mike",
        email: "mike@delivery.com",
        phone: "555-0101",
        status: AGENT_STATUS.AVAILABLE,
        createdAt: new Date().toISOString(),
      },
      {
        id: "agent-2",
        name: "Fast Sarah",
        email: "sarah@delivery.com",
        phone: "555-0102",
        status: AGENT_STATUS.AVAILABLE,
        createdAt: new Date().toISOString(),
      },
      {
        id: "agent-3",
        name: "Quick Dave",
        email: "dave@delivery.com",
        phone: "555-0103",
        status: AGENT_STATUS.AVAILABLE,
        createdAt: new Date().toISOString(),
      },
    ];
    for (const agent of dummyAgents) {
      yield call(agentsTable.create, agent);
    }
  }
}

function* handleFetchOrders() {
  try {
    const orders: Order[] = yield call(ordersTable.getAll);
    yield put(setOrders(orders || []));
  } catch (err) {
    yield put(setError(String(err)));
  }
}

function* handleFetchAgents() {
  try {
    yield call(seedData);
    const agents: DeliveryAgent[] = yield call(agentsTable.getAll);
    yield put(setAgents(agents || []));
  } catch (err) {
    yield put(setError(String(err)));
  }
}

function* handleCreateOrder(action: PayloadAction<Order>) {
  try {
    yield call(ordersTable.create, action.payload);

    for (const item of action.payload.items) {
      const product: Product | undefined = yield call(
        productsTable.getById,
        item.productId,
      );
      if (product) {
        yield call(productsTable.update, item.productId, {
          stock: Math.max(0, product.stock - item.quantity),
        });
      }
    }

    yield put(fetchOrdersRequest());
    yield put(fetchProductsRequest());
  } catch (err) {
    yield put(setError(String(err)));
  }
}

function* handleUpdateOrderStatus(
  action: PayloadAction<{ orderId: string; status: OrderStatus }>,
) {
  try {
    yield call(
      ordersTable.updateStatus,
      action.payload.orderId,
      action.payload.status,
    );
    yield put(fetchOrdersRequest());
    yield put(fetchAgentsRequest());
  } catch (err) {
    yield put(setError(String(err)));
  }
}

function* handleAssignOrder(
  action: PayloadAction<{ orderId: string; agentId: string }>,
) {
  try {
    yield call(
      ordersTable.assignAgent,
      action.payload.orderId,
      action.payload.agentId,
    );
    yield put(fetchOrdersRequest());
    yield put(fetchAgentsRequest());
  } catch (err) {
    yield put(setError(String(err)));
  }
}

export function* orderSaga() {
  yield takeLatest(fetchOrdersRequest.type, handleFetchOrders);
  yield takeLatest(fetchAgentsRequest.type, handleFetchAgents);
  yield takeLatest(createOrderRequest.type, handleCreateOrder);
  yield takeLatest(updateOrderStatusRequest.type, handleUpdateOrderStatus);
  yield takeLatest(assignOrderRequest.type, handleAssignOrder);
}
