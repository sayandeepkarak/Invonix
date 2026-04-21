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

export function AgentAssignDialog({
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
      <div className="space-y-4 py-2">
        {!agents.length ? (
          <p className="text-center text-muted-foreground py-4">
            No agents found.
          </p>
        ) : (
          <div className="grid gap-2">
            {agents.map((agent) => {
              const isBusy = agent.status === AGENT_STATUS.BUSY;
              return (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {agent.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isBusy ? "outline" : "secondary"}
                          className="text-[10px] h-4 px-1"
                        >
                          {isBusy ? "Busy" : "Available"}
                        </Badge>
                        {agent.order && (
                          <span className="text-[10px] text-muted-foreground">
                            Order: #{agent.order.id.slice(0, 6).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <AppButton
                    size="sm"
                    variant={isBusy ? "outline" : "default"}
                    onClick={() => onAssign(agent.id)}
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
