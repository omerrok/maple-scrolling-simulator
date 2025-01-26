import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface SimulationControlsProps {
  canAddStep: boolean;
  onAddStep: () => void;
  simulationRuns: number;
  onSimulationRunsChange: (runs: number) => void;
  onStart: () => void;
  disabled: boolean;
  hasInvalidSteps: boolean;
}

export const SimulationControls = ({
  canAddStep,
  onAddStep,
  simulationRuns,
  onSimulationRunsChange,
  onStart,
  disabled,
  hasInvalidSteps,
}: SimulationControlsProps) => {
  const handleSimulationRunsChange = (value: string) => {
    const runs = Math.min(Math.max(parseInt(value) || 0, 1), 10000);
    onSimulationRunsChange(runs);
  };

  return (
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
        {canAddStep && (
          <Button
            variant="outline"
            onClick={onAddStep}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Step
          </Button>
        )}

        <Button
          onClick={onStart}
          disabled={disabled || hasInvalidSteps}
          className="ml-auto"
          variant="default"
        >
          Start Simulation
        </Button>
      </div>
    </div>
  );
};