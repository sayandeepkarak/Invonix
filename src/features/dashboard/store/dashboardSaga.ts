import { put, takeLatest, select } from "redux-saga/effects";
import {
  fetchAnalyticsRequest,
  setAnalyticsData,
  setLoading,
} from "./dashboardSlice";
import { Order, OrderStatus } from "@/features/orders/types";
import { ORDER_STATUS_LABELS } from "@/features/orders/const";

const selectOrders = (state: any) => state.orders.orders;

function* handleFetchAnalytics() {
  try {
    const orders: Order[] = yield select(selectOrders);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const revenueData = months.map((month) => ({
      month,
      amount: Math.floor(Math.random() * 5000) + 2000,
    }));

    const statusCounts: Record<string, number> = {};
    orders.forEach((order) => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });

    const statusDistribution = Object.entries(statusCounts).map(
      ([status, count]) => ({
        status: ORDER_STATUS_LABELS[status as OrderStatus] || status,
        count,
      }),
    );

    const recentActivity = [
      {
        id: "1",
        type: "order",
        message: "New order #1234 from John Doe",
        timestamp: "5 mins ago",
      },
      {
        id: "2",
        type: "system",
        message: "Low stock alert: Product X",
        timestamp: "1 hour ago",
      },
      {
        id: "3",
        type: "delivery",
        message: "Order #1232 delivered",
        timestamp: "2 hours ago",
      },
    ];

    yield put(
      setAnalyticsData({
        revenueData,
        statusDistribution,
        recentActivity,
      }),
    );
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setLoading(false));
  }
}

export function* dashboardSaga() {
  yield takeLatest(fetchAnalyticsRequest.type, handleFetchAnalytics);
}
