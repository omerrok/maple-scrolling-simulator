import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimulationOutcome } from "@/types/maple";

interface SimulationResultsProps {
  outcomes: SimulationOutcome[];
  onStop: () => void;
}

export const SimulationResults = ({
  outcomes,
  onStop,
}: SimulationResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="p-4 bg-white rounded-lg shadow-sm space-y-4 animate-in"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Outcome {outcome.successfulSteps}/{outcome.steps} Success
              </h3>
              <span className="text-maple-text/60">
                {outcome.count} times
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(outcome.finalStats).map(([stat, value]) => (
                <div key={stat} className="text-sm">
                  <span className="text-maple-text/60">{stat.toUpperCase()}:</span>{" "}
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`outcome-value-${outcome.id}`}>
                Outcome Value (Mesos)
              </Label>
              <Input
                id={`outcome-value-${outcome.id}`}
                type="number"
                placeholder="Enter value in mesos"
              />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onStop} variant="outline" className="w-full">
        Stop Simulation
      </Button>
    </div>
  );
};