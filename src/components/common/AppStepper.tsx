interface AppStepperProps {
  steps: readonly string[]
  currentStep: number
  children: React.ReactNode
}

export function AppStepper({ steps, currentStep, children }: AppStepperProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${index <= currentStep ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      {children}
    </div>
  )
}
