import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimulationOutcome, ItemStats } from "@/types/maple";
import { formatNumber } from "@/lib/utils";

interface SimulationResultsProps {
  outcomes: SimulationOutcome[];
  onStop: () => void;
  isComplete: boolean;
  onCalculateProfit: () => void;
}

const statDisplayNames: { [key: string]: string } = {
  watk: "Weapon Attack",
  matk: "Magic Attack",
  def: "Weapon Defense",
  mdef: "Magic Defense",
  acc: "Accuracy",
  avoid: "Avoidability",
  speed: "Speed",
  jump: "Jump",
  str: "STR",
  dex: "DEX",
  int: "INT",
  luk: "LUK",
  hp: "HP",
  mp: "MP"
};

const formatOutcomeTitle = (stats: ItemStats): string => {
  return Object.entries(stats)
    .filter(([_, value]) => value !== 0)
    .map(([stat, value]) => `${value} ${statDisplayNames[stat] || stat.toUpperCase()}`)
    .join(", ");
};

const calculateTotalValue = (stats: ItemStats): number => {
  return Object.values(stats).reduce((sum, value) => sum + (value || 0), 0);
};

export const SimulationResults = ({
  outcomes,
  onStop,
  isComplete,
  onCalculateProfit,
}: SimulationResultsProps) => {
  const [outcomeValues, setOutcomeValues] = useState<{ [key: string]: number }>({});

  const totalRuns = outcomes.reduce((sum, outcome) => sum + outcome.count, 0);
  const sortedOutcomes = [...outcomes]
    .map(outcome => ({
      ...outcome,
      percentage: (outcome.count / totalRuns) * 100
    }))
    .sort((a, b) => calculateTotalValue(a.finalStats) - calculateTotalValue(b.finalStats));

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