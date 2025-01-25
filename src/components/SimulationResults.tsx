import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimulationOutcome } from "@/types/maple";
import { formatNumber } from "@/lib/utils";
import { formatStatName } from "@/lib/statNames";

interface SimulationResultsProps {
  outcomes: SimulationOutcome[];
  onStop: () => void;
  isComplete: boolean;
  onCalculateProfit: () => void;
}

export const SimulationResults = ({
  outcomes,
  onStop,
  isComplete,
  onCalculateProfit,
}: SimulationResultsProps) => {
  const [outcomeValues, setOutcomeValues] = useState<{ [key: string]: number }>({});

  const totalRuns = outcomes.reduce((sum, outcome) => sum + outcome.count, 0);
  const sortedOutcomes = [...outcomes]
    .sort((a, b) => {
      const aTotal = Object.values(a.finalStats).reduce((sum, val) => sum + (val || 0), 0);
      const bTotal = Object.values(b.finalStats).reduce((sum, val) => sum + (val || 0), 0);
      return bTotal - aTotal;
    })
    .map(outcome => ({
      ...outcome,
      percentage: (outcome.count / totalRuns) * 100
    }));

  useEffect(() => {
    const updatedOutcomes = outcomes.map(outcome => ({
      ...outcome,
      value: outcomeValues[outcome.id] || 0
    }));
    
    if (JSON.stringify(updatedOutcomes) !== JSON.stringify(outcomes)) {
      outcomes.forEach(outcome => {
        outcome.value = outcomeValues[outcome.id] || 0;
      });
    }
  }, [outcomeValues, outcomes]);

  const formatOutcomeTitle = (stats: SimulationOutcome['finalStats']): string => {
    return Object.entries(stats)
      .filter(([_, value]) => value !== 0)
      .map(([stat, value]) => `${value} ${formatStatName(stat)}`)
      .join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedOutcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="p-4 bg-white rounded-lg shadow-sm space-y-4 animate-in"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {formatOutcomeTitle(outcome.finalStats)}
              </h3>
              <span className="text-maple-text/60">
                {outcome.count.toLocaleString()} times ({outcome.percentage?.toFixed(2)}%)
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`outcome-value-${outcome.id}`}>
                Outcome Value (Mesos)
              </Label>
              <Input
                id={`outcome-value-${outcome.id}`}
                type="text"
                value={formatNumber(outcomeValues[outcome.id] || '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, '');
                  setOutcomeValues(prev => ({
                    ...prev,
                    [outcome.id]: parseInt(value) || 0
                  }));
                }}
                placeholder="Enter value in mesos"
              />
            </div>
          </div>
        ))}
      </div>

      <Button 
        onClick={isComplete ? onCalculateProfit : onStop} 
        variant="outline" 
        className="w-full"
      >
        {isComplete ? "Calculate Profit" : "Stop Simulation"}
      </Button>
    </div>
  );
};