import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderState, OrderStatus } from "@/features/orders/types";
import type {
  DeliveryAgent,
  AgentStatus,
} from "@/features/orders/types/agents";

interface CombinedOrderState extends OrderState {
  agents: DeliveryAgent[];
}

const initialState: CombinedOrderState = {
  orders: [],
  agents: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    setAgents: (state, action: PayloadAction<DeliveryAgent[]>) => {
      state.agents = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchOrdersRequest: (state) => {
      state.isLoading = true;
    },
    fetchAgentsRequest: (state) => {
      state.isLoading = true;
    },
    createOrderRequest: (state, _action: PayloadAction<Order>) => {
      state.isLoading = true;
    },
    updateOrderStatusRequest: (
      state,
      _action: PayloadAction<{ orderId: string; status: OrderStatus }>,
    ) => {
      state.isLoading = true;
    },
    assignOrderRequest: (
      state,
      _action: PayloadAction<{ orderId: string; agentId: string }>,
    ) => {
      state.isLoading = true;
    },
    updateAgentStatusRequest: (
      state,
      _action: PayloadAction<{ agentId: string; status: AgentStatus }>,
    ) => {
      state.isLoading = true;
    },
  },
});

export const {
  setOrders,
  setAgents,
  setLoading,
  setError,
  fetchOrdersRequest,
  fetchAgentsRequest,
  createOrderRequest,
  updateOrderStatusRequest,
  assignOrderRequest,
  updateAgentStatusRequest,
} = orderSlice.actions;

export default orderSlice.reducer;
