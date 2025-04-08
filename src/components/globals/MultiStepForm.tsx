"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  SkipForwardIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type Step = {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isOptional?: boolean;
  isCompleted?: boolean;
};

type MultiStepFormProps = {
  steps: Step[];
  onComplete?: () => void;
  onStepComplete?: (stepId: string, data?: any) => Promise<boolean>;
  isSubmitting?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  skipButtonText?: string;
  completeButtonText?: string;
  previewButtonText?: string;
  showPreviewButton?: boolean;
  onPreview?: () => void;
  disableProgression?: boolean;
  showStepInfo?: boolean;
};

export default function MultiStepForm({
  steps,
  onComplete,
  onStepComplete,
  isSubmitting = false,
  nextButtonText = "Continue",
  backButtonText = "Back",
  skipButtonText = "Skip",
  completeButtonText = "Complete",
  previewButtonText = "Preview",
  showPreviewButton = false,
  onPreview,
  disableProgression = false,
  showStepInfo = false,
}: MultiStepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isProcessingStep, setIsProcessingStep] = useState(false);

  // React Hooks should be called before conditional statements
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  // Step count checks
  if (steps.length === 0) {
    return <div>No steps found.</div>;
  }

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  const handleNext = async () => {
    if (isLastStep) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    if (
      isTransitioning ||
      disableProgression ||
      !currentStep ||
      isProcessingStep
    ) {
      return;
    }

    if (onStepComplete) {
      setIsProcessingStep(true);
      const success = await onStepComplete(currentStep.id);
      setIsProcessingStep(false);

      if (!success) {
        return;
      }
    }

    setIsTransitioning(true);
    setCompletedSteps((prev) => {
      if (!prev.includes(currentStep.id)) {
        return [...prev, currentStep.id];
      }
      return prev;
    });

    setTimeout(() => {
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleSkip = () => {
    if (
      isLastStep ||
      isTransitioning ||
      !currentStep ||
      isProcessingStep ||
      !currentStep.isOptional
    ) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    if (isFirstStep || isTransitioning || isProcessingStep) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
      setIsTransitioning(false);
    }, 300);
  };

  const goToStep = (index: number) => {
    if (
      index < currentStepIndex &&
      index >= 0 &&
      index < steps.length &&
      !isProcessingStep
    ) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStepIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const isStepCompleted = (stepId: string) => {
    // First check if the step is marked as completed from props
    const step = steps.find((s) => s.id === stepId);
    if (step?.isCompleted) {
      return true;
    }
    // Then check our internal state
    return completedSteps.includes(stepId);
  };

  // Safety check
  if (!currentStep) {
    return <div>Step not found.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Fixed navigation header that stays visible when scrolling */}
      <div className="sticky top-0 z-10 bg-background pb-4 pt-2">
        {/* Step indicator */}
        <div className="mb-4 space-y-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-primary">{currentStepIndex + 1}</span>
              <span>/</span>
              <span className="text-muted-foreground">{steps.length}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep.isOptional ? "Optional" : "Required"}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step titles */}
        <div className="flex overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              disabled={
                index > currentStepIndex || isSubmitting || isProcessingStep
              }
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2 text-sm whitespace-nowrap transition-all",
                index === currentStepIndex
                  ? "border-primary text-primary font-medium"
                  : isStepCompleted(step.id)
                    ? "border-green-500 text-green-600 dark:text-green-400"
                    : "border-transparent text-muted-foreground",
                index > currentStepIndex && "cursor-not-allowed opacity-50",
                index < currentStepIndex &&
                  "hover:text-primary hover:border-primary/70"
              )}
            >
              <div className="relative flex">
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                    index === currentStepIndex
                      ? "border-primary bg-primary text-primary-foreground"
                      : isStepCompleted(step.id)
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-muted-foreground"
                  )}
                >
                  {isStepCompleted(step.id) ? (
                    <CheckIcon className="size-3" />
                  ) : (
                    index + 1
                  )}
                </div>
              </div>
              <span>{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div>
        {showStepInfo && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{currentStep.title}</h2>
            <p className="text-muted-foreground">{currentStep.description}</p>
          </div>
        )}

        <div
          className={cn(
            "transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        >
          {currentStep.component}
        </div>
      </div>

      {/* Navigation buttons - Fixed at the bottom */}
      <div className="sticky bottom-0 z-10 flex justify-between border-t border bg-background pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep || isSubmitting || isProcessingStep}
          className="gap-2"
        >
          <ChevronLeftIcon className="size-4" />
          {backButtonText}
        </Button>

        <div className="flex gap-2">
          {/* Skip button for optional steps */}
          {currentStep.isOptional && !isLastStep && (
            <Button
              variant="outline"
              onClick={handleSkip}
              disabled={isSubmitting || isProcessingStep}
              className="gap-2"
            >
              <SkipForwardIcon className="size-4" />
              {skipButtonText}
            </Button>
          )}

          {/* Preview button (only shown on the last step) */}
          {isLastStep && showPreviewButton && (
            <Button
              variant="outline"
              onClick={onPreview}
              disabled={isSubmitting || isProcessingStep}
              className="gap-2"
            >
              <EyeIcon className="size-4" />
              {previewButtonText}
            </Button>
          )}

          {/* Next/Complete button */}
          <Button
            onClick={handleNext}
            disabled={disableProgression || isSubmitting || isProcessingStep}
            className="gap-2"
          >
            {isSubmitting || isProcessingStep ? (
              <div className="flex items-center gap-2">
                <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                {isLastStep ? completeButtonText : nextButtonText}
                {!isLastStep && <ChevronRightIcon className="size-4" />}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
