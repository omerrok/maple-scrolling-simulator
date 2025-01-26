import React from 'react';
import { Item, Scroll, ScrollingStep } from "@/types/maple";
import { StepRow } from "./step-configurator/StepRow";
import { SimulationControls } from "./step-configurator/SimulationControls";

interface StepConfiguratorProps {
  item: Item;
  scrolls: Scroll[];
  steps: ScrollingStep[];
  onStepsChange: (steps: ScrollingStep[]) => void;
  onStart: () => void;
  disabled: boolean;
  simulationRuns: number;
  onSimulationRunsChange: (runs: number) => void;
}

export const StepConfigurator = ({
  item,
  scrolls,
  steps,
  onStepsChange,
  onStart,
  disabled,
  simulationRuns,
  onSimulationRunsChange,
}: StepConfiguratorProps) => {
  const addStep = () => {
    if (steps.length < item.slots) {
      onStepsChange([
        ...steps,
        {
          scroll: null,
          onSuccess: steps.length === item.slots - 1 ? "stop" : "next",
          onFailure: "stop",
          failureLimit: 0,
        },
      ]);
    }
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    onStepsChange(newSteps);
  };

  const updateStep = (index: number, updates: Partial<ScrollingStep>) => {
    const newSteps = steps.map((step, i) =>
      i === index ? { ...step, ...updates } : step
    );
    onStepsChange(newSteps);
  };

  React.useEffect(() => {
    if (steps.length === 0) {
      onStepsChange([
        {
          scroll: scrolls.length === 1 ? scrolls[0] : null,
          onSuccess: "next",
          onFailure: "stop",
          failureLimit: 0,
        },
      ]);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <StepRow
            key={index}
            step={step}
            index={index}
            scrolls={scrolls}
            isLastStep={index === steps.length - 1}
            onUpdate={(updates) => updateStep(index, updates)}
            onRemove={() => removeStep(index)}
            canRemove={steps.length > 1}
          />
        ))}
      </div>

      <SimulationControls
        canAddStep={steps.length < item.slots}
        onAddStep={addStep}
        simulationRuns={simulationRuns}
        onSimulationRunsChange={onSimulationRunsChange}
        onStart={onStart}
        disabled={disabled}
        hasInvalidSteps={steps.some((step) => !step.scroll)}
      />
    </div>
  );
};