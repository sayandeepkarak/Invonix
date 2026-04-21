import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  revenueData: { month: string; amount: number }[];
  statusDistribution: { status: string; count: number }[];
  recentActivity: {
    id: string;
    type: string;
    message: string;
    timestamp: string;
  }[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  revenueData: [],
  statusDistribution: [],
  recentActivity: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setAnalyticsData: (
      state,
      action: PayloadAction<Partial<DashboardState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchAnalyticsRequest: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setAnalyticsData, setLoading, fetchAnalyticsRequest } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
