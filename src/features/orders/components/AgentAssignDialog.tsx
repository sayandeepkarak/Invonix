import { AppDialog, AppButton } from "@/components/wrapper";
import { User } from "lucide-react";
import type { DeliveryAgent } from "@/features/orders/types/agents";
import { AGENT_STATUS } from "@/features/orders/const";
import { Badge } from "@/components/ui/badge";

interface AgentAssignDialogProps {
  open: boolean;
  onClose: () => void;
  agents: DeliveryAgent[];
  onAssign: (agentId: string) => void;
  isLoading: boolean;
}

export default function AgentAssignDialog({
  open,
  onClose,
  agents,
  onAssign,
  isLoading,
}: AgentAssignDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onClose}
      title="Assign Delivery Agent"
      maxWidth="sm:max-w-md"
    >
      <div className="space-y-4 pt-2">
        {!agents.length ? (
          <p className="text-muted-foreground py-4 text-center">
            No agents found.
          </p>
        ) : (
          <div className="grid gap-2">
            {agents.map((agent) => {
              const isBusy = agent.status === AGENT_STATUS.BUSY;
              return (
                <div
                  key={agent.id}
                  className="bg-card hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {agent.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isBusy ? "outline" : "secondary"}
                          className="h-4 px-1 text-[10px]"
                        >
                          {isBusy ? "Busy" : "Available"}
                        </Badge>
                        {agent.order && (
                          <span className="text-muted-foreground text-[10px]">
                            Order: #{agent.order.id.slice(0, 6).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <AppButton
                    size="sm"
                    variant={isBusy ? "outline" : "default"}
                    onClick={() => {
                      return onAssign(agent.id);
                    }}
                    disabled={isBusy || isLoading}
                    className="h-8"
                  >
                    {isBusy ? "Busy" : "Assign"}
                  </AppButton>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppDialog>
  );
}
