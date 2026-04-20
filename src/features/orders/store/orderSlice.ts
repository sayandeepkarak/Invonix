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
  selectedOrder: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setAgents: (state, action: PayloadAction<DeliveryAgent[]>) => {
      state.agents = action.payload;
    },

    fetchOrdersRequest: (state) => {
      state.isLoading = true;
    },
    fetchAgentsRequest: (state) => {
      state.isLoading = true;
    },
    updateOrderStatusRequest: (
      _state,
      _action: PayloadAction<{ orderId: string; status: OrderStatus }>,
    ) => {},
    assignOrderRequest: (
      _state,
      _action: PayloadAction<{ orderId: string; agentId: string }>,
    ) => {},
    updateAgentStatusRequest: (
      _state,
      _action: PayloadAction<{ agentId: string; status: AgentStatus }>,
    ) => {},
  },
});

export const {
  setOrders,
  setSelectedOrder,
  setLoading,
  setError,
  setAgents,
  fetchOrdersRequest,
  fetchAgentsRequest,
  updateOrderStatusRequest,
  assignOrderRequest,
  updateAgentStatusRequest,
} = orderSlice.actions;

export default orderSlice.reducer;
