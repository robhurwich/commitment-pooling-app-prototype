interface StepProgressProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, i) => (
        <div key={i} className="flex-1 relative group">
          <div
            className={`h-1 transition-colors ${
              i < currentStep
                ? "bg-green-600"
                : i === currentStep
                ? "bg-green-400"
                : "bg-gray-200"
            }`}
          />
          {/* Step label on hover */}
          <div className="absolute left-0 top-3 text-[10px] text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}
