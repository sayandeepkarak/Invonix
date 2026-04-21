import { all, call, put, takeLatest } from "redux-saga/effects";
import { ordersTable } from "@/services/dexie/tables/orders";
import { productsTable } from "@/services/dexie/tables/products";
import {
  setAnalyticsData,
  setLoading,
  fetchAnalyticsRequest,
} from "@/features/dashboard/store/dashboardSlice";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "@/features/orders/const";
import type { Order } from "@/features/orders/types";
import type { Product } from "@/features/inventory/types";

function* handleFetchAnalytics() {
  try {
    const orders: Order[] = yield call(ordersTable.getAll);

    const revenueData = [
      { month: "Jan", amount: 2400 },
      { month: "Feb", amount: 1398 },
      { month: "Mar", amount: 9800 },
      { month: "Apr", amount: 3908 },
      { month: "May", amount: 4800 },
      { month: "Jun", amount: 3800 },
    ];

    const statusCounts = (orders || []).reduce(
      (acc: Record<string, number>, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {},
    );

    const statusDistribution = Object.entries(ORDER_STATUS).map(
      ([_, value]) => ({
        status: ORDER_STATUS_LABELS[value],
        count: statusCounts[value] || 0,
      }),
    );

    yield put(
      setAnalyticsData({
        revenueData,
        statusDistribution,
      }),
    );
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* dashboardSaga() {
  yield all([takeLatest(fetchAnalyticsRequest.type, handleFetchAnalytics)]);
}
