interface WizardNavProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  isFirst?: boolean;
  isLast?: boolean;
  lastLabel?: string;
  onSubmit?: () => void;
  disabled?: boolean;
}

export function WizardNav({
  onPrev,
  onNext,
  prevLabel = "Prev",
  nextLabel = "Next",
  isFirst = false,
  isLast = false,
  lastLabel = "Publish",
  onSubmit,
  disabled = false,
}: WizardNavProps) {
  return (
    <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors ${
          isFirst
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        ← {prevLabel}
      </button>

      <button
        onClick={isLast ? onSubmit : onNext}
        disabled={disabled}
        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : isLast
            ? "bg-[#3d2b1f] text-white hover:bg-[#2d1f15]"
            : "bg-green-700 text-white hover:bg-green-800"
        }`}
      >
        {isLast ? lastLabel : `${nextLabel} →`}
      </button>
    </div>
  );
}
