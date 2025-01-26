import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Item, Scroll, ScrollingStep } from "@/types/maple";
import { Plus, Minus } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { ItemImage } from "./ItemImage";

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

  const handleSimulationRunsChange = (value: string) => {
    const runs = Math.min(Math.max(parseInt(value) || 0, 1), 10000);
    onSimulationRunsChange(runs);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm animate-in"
          >
            <span className="font-medium min-w-[4rem]">
              Step {index + 1}
            </span>
            
            <Select
              value={step.scroll?.id || ""}
              onValueChange={(value) => {
                const scroll = scrolls.find((s) => s.id === value);
                updateStep(index, { scroll: scroll || null });
              }}
            >
              <SelectTrigger className="w-64">
                <SelectValue>
                  {step.scroll && (
                    <div className="flex items-center gap-2">
                      <ItemImage imageUrl={step.scroll.imageUrl} name={step.scroll.name} />
                      <span>{step.scroll.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {scrolls.map((scroll) => (
                  <SelectItem key={scroll.id} value={scroll.id}>
                    <div className="flex items-center gap-2">
                      <ItemImage imageUrl={scroll.imageUrl} name={scroll.name} />
                      <span>{scroll.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-maple-text/60">On Success:</span>
                <Select
                  value={step.onSuccess}
                  onValueChange={(value: "next" | "stop") =>
                    updateStep(index, { onSuccess: value })
                  }
                  disabled={index === steps.length - 1}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next Step</SelectItem>
                    <SelectItem value="stop">Stop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-sm text-maple-text/60">On Failure:</span>
                <Select
                  value={step.onFailure}
                  onValueChange={(value: "next" | "stop") =>
                    updateStep(index, { onFailure: value })
                  }
                  disabled={index === steps.length - 1}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next Step</SelectItem>
                    <SelectItem value="stop">Stop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-sm text-maple-text/60">Failure Limit:</span>
                <Input
                  type="number"
                  min="0"
                  max={index + 1}
                  value={step.failureLimit}
                  onChange={(e) => {
                    const value = Math.min(
                      Math.max(parseInt(e.target.value) || 0, 0),
                      index + 1
                    );
                    updateStep(index, { failureLimit: value });
                  }}
                  className="w-24"
                  placeholder="0"
                />
              </div>
            </div>

            {steps.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStep(index)}
                className="ml-auto"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="simulation-runs">Simulation Runs</Label>
          <Input
            id="simulation-runs"
            type="text"
            value={formatNumber(simulationRuns)}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '');
              handleSimulationRunsChange(value);
            }}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          {steps.length < item.slots && (
            <Button
              variant="outline"
              onClick={addStep}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Step
            </Button>
          )}

          <Button
            onClick={onStart}
            disabled={disabled || steps.some((step) => !step.scroll)}
            className="ml-auto"
            variant="default"
          >
            Start Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};
