import { all, call, put, takeLatest } from "redux-saga/effects";
import { ordersTable } from "@/services/dexie/tables/orders";
import { productsTable } from "@/services/dexie/tables/products";
import {
  setAnalyticsData,
  setLoading,
  fetchAnalyticsRequest,
} from "@/features/dashboard/store/dashboardSlice";
import { ORDER_STATUS, ORDER_STATUS_LABELS } from "@/features/orders/const";

function* handleFetchAnalytics() {
  try {
    const orders: any[] = yield call(ordersTable.getAll);
    const products: any[] = yield call(productsTable.getAll);

    const revenueData = [
      { month: "Jan", amount: 2400 },
      { month: "Feb", amount: 1398 },
      { month: "Mar", amount: 9800 },
      { month: "Apr", amount: 3908 },
      { month: "May", amount: 4800 },
      { month: "Jun", amount: 3800 },
    ];

    const statusCounts = orders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const statusDistribution = Object.entries(ORDER_STATUS).map(
      ([key, value]) => ({
        status: ORDER_STATUS_LABELS[value],
        count: statusCounts[value] || 0,
      }),
    );

    const topProducts = products
      .slice(0, 4)
      .map((p) => ({ name: p.name, sales: 50, revenue: p.price * 50 }));

    const recentActivity = [
      {
        id: "1",
        type: "order",
        message: "New order #ORD-001 placed",
        timestamp: "2 minutes ago",
      },
      {
        id: "2",
        type: "delivery",
        message: "Order #ORD-002 out for delivery",
        timestamp: "1 hour ago",
      },
    ];

    yield put(
      setAnalyticsData({
        revenueData,
        statusDistribution,
        topProducts,
        recentActivity,
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
