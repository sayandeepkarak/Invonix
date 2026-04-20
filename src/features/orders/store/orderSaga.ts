import { call, put, takeLatest, all } from "redux-saga/effects";
import { ordersTable } from "@/services/dexie/tables/orders";
import { agentsTable } from "@/services/dexie/tables/agents";
import {
  setOrders,
  setAgents,
  setLoading,
  setError,
  fetchOrdersRequest,
  fetchAgentsRequest,
  updateOrderStatusRequest,
  assignOrderRequest,
} from "@/features/orders/store/orderSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrderStatus, Order } from "@/features/orders/types";
import type { DeliveryAgent } from "@/features/orders/types/agents";
import { ORDER_STATUS, AGENT_STATUS } from "@/features/orders/const";

function* seedData() {
  const existingOrders: Order[] = yield call(ordersTable.getAll);
  const existingAgents: DeliveryAgent[] = yield call(agentsTable.getAll);

  if (existingOrders.length === 0) {
    const dummyOrders: Order[] = [
      {
        id: crypto.randomUUID(),
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "1234567890",
        items: [{ productId: "1", name: "Product A", quantity: 2, price: 50 }],
        totalAmount: 100,
        status: ORDER_STATUS.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerPhone: "0987654321",
        items: [{ productId: "2", name: "Product B", quantity: 1, price: 150 }],
        totalAmount: 150,
        status: ORDER_STATUS.CONFIRMED,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    for (const order of dummyOrders) {
      yield call(ordersTable.create, order);
    }
  }

  if (existingAgents.length === 0) {
    const dummyAgents: DeliveryAgent[] = [
      {
        id: crypto.randomUUID(),
        name: "Express Mike",
        email: "mike@delivery.com",
        phone: "555-0101",
        status: AGENT_STATUS.AVAILABLE,
        rating: 4.8,
        completedOrders: 156,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Fast Sarah",
        email: "sarah@delivery.com",
        phone: "555-0102",
        status: AGENT_STATUS.BUSY,
        rating: 4.9,
        completedOrders: 243,
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
    yield call(seedData);
    const orders: any[] = yield call(ordersTable.getAll);
    yield put(setOrders(orders));
  } catch (err) {
    yield put(setError(String(err)));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleFetchAgents() {
  try {
    const agents: any[] = yield call(agentsTable.getAll);
    yield put(setAgents(agents));
  } catch (err) {
    yield put(setError(String(err)));
  } finally {
    yield put(setLoading(false));
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
  } catch (err) {
    yield put(setError(String(err)));
  }
}

export function* orderSaga() {
  yield takeLatest(fetchOrdersRequest.type, handleFetchOrders);
  yield takeLatest(fetchAgentsRequest.type, handleFetchAgents);
  yield takeLatest(updateOrderStatusRequest.type, handleUpdateOrderStatus);
  yield takeLatest(assignOrderRequest.type, handleAssignOrder);
}
