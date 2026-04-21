import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDebounce } from "@/hooks/use-debounce";
import {
  fetchOrdersRequest,
  fetchAgentsRequest,
  updateOrderStatusRequest,
  assignOrderRequest,
  createOrderRequest,
} from "@/features/orders/store/orderSlice";
import { fetchProductsRequest } from "@/features/inventory/store";
import type { Order, OrderItem, OrderStatus } from "@/features/orders/types";
import { ORDER_STATUS, type OrderStatusFilter } from "@/features/orders/const";
import { APP_CONSTANTS } from "@/constants";

export function useOrders() {
  const dispatch = useAppDispatch();
  const { orders, agents, isLoading } = useAppSelector((state) => {
    return state.orders;
  });
  const { products } = useAppSelector((state) => {
    return state.inventory;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>(
    APP_CONSTANTS.FILTER_ALL,
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    dispatch(fetchAgentsRequest());
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const searchStr = debouncedSearchQuery.toLowerCase();
    const userName = order.user?.name?.toLowerCase() || "";
    const userEmail = order.user?.email?.toLowerCase() || "";
    const orderId = order.id.toLowerCase();

    const matchesSearch =
      userName.includes(searchStr) ||
      userEmail.includes(searchStr) ||
      orderId.includes(searchStr);

    const matchesStatus =
      statusFilter === APP_CONSTANTS.FILTER_ALL ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    dispatch(updateOrderStatusRequest({ orderId, status }));
  };

  const handleAssignClick = (order: Order) => {
    setSelectedOrder(order);
    setIsAssignDialogOpen(true);
  };

  const handleAssignAgent = (agentId: string) => {
    if (selectedOrder) {
      dispatch(assignOrderRequest({ orderId: selectedOrder.id, agentId }));
      setIsAssignDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleAddOrder = (items: OrderItem[]) => {
    const totalAmount = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      userId: APP_CONSTANTS.GUEST_USER,
      user: {
        id: APP_CONSTANTS.GUEST_USER,
        name: "Walk-in Customer",
        email: "customer@invonix.com",
        phone: "+123456789",
        businessName: "Guest",
        businessType: "Retail",
        isVerified: true,
        createdAt: new Date().toISOString(),
      },
      items,
      totalAmount,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(createOrderRequest(newOrder));
    setIsAddOrderOpen(false);
  };

  return {
    orders: filteredOrders,
    agents,
    products,
    isLoading,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    statusFilter,
    setStatusFilter,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    isAddOrderOpen,
    setIsAddOrderOpen,
    handleUpdateStatus,
    handleAssignClick,
    handleAssignAgent,
    handleAddOrder,
  };
}
