import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAgentsRequest } from "@/features/orders/store/orderSlice";

export function useAgents() {
  const dispatch = useAppDispatch();
  const { agents, isLoading, error } = useAppSelector((state) => {
    return state.orders;
  });

  useEffect(() => {
    dispatch(fetchAgentsRequest());
  }, [dispatch]);

  return {
    agents,
    isLoading,
    error,
  };
}
