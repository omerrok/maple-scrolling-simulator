import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Item, Scroll, SimulationOutcome } from "@/types/maple";
import { formatNumber } from "@/lib/utils";
import { formatStatName } from "@/lib/statNames";
import { ItemImage } from "./ItemImage";

interface CostAnalysisProps {
  item: Item | null;
  scrolls: Scroll[];
  outcomes: SimulationOutcome[];
  visible: boolean;
}

export const CostAnalysis = ({
  item,
  scrolls,
  outcomes,
  visible
}: CostAnalysisProps) => {
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string | null>(null);

  if (!visible || !item) return null;

  const totalRuns = outcomes.reduce((acc, outcome) => acc + outcome.count, 0);
  const sortedOutcomes = [...outcomes].sort((a, b) => 
    Object.values(a.finalStats).reduce((sum, val) => sum + (val || 0), 0) -
    Object.values(b.finalStats).reduce((sum, val) => sum + (val || 0), 0)
  );

  const selectedOutcome = sortedOutcomes.find(o => o.id === selectedOutcomeId);
  const betterOutcomes = selectedOutcome 
    ? sortedOutcomes.slice(0, sortedOutcomes.findIndex(o => o.id === selectedOutcomeId) + 1)
    : [];

  const calculateTotalCost = () => {
    const itemCost = (item.cost || 0) * totalRuns;
    const scrollCosts = scrolls.reduce((acc, scroll) => {
      const scrollUsage = outcomes.reduce((total, outcome) => {
        const stepsWithThisScroll = outcome.steps * (outcome.count || 0);
        return total + stepsWithThisScroll;
      }, 0);
      return acc + (scroll.cost || 0) * scrollUsage;
    }, 0);
    return itemCost + scrollCosts;
  };

  const calculateTotalValue = () => {
    return outcomes.reduce((acc, outcome) => 
      acc + (outcome.value || 0) * outcome.count, 0
    );
  };

  const totalCost = calculateTotalCost();
  const totalValue = calculateTotalValue();

  const selectedOutcomesTotalCount = betterOutcomes.reduce((acc, o) => acc + o.count, 0);
  const selectedOutcomesTotalValue = betterOutcomes.reduce((acc, o) => 
    acc + (o.value || 0) * o.count, 0);

  const averageCost = selectedOutcome ? totalCost / selectedOutcomesTotalCount : 0;
  const averageValue = selectedOutcome ? selectedOutcomesTotalValue / selectedOutcomesTotalCount : 0;
  const averageProfit = averageValue - averageCost;

  const formatOutcomeTitle = (outcome: SimulationOutcome): string => {
    return Object.entries(outcome.finalStats)
      .filter(([_, value]) => value !== 0)
      .map(([stat, value]) => `${value} ${formatStatName(stat)}`)
      .join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Total Cost</h3>
          <p className="text-2xl font-semibold">
            {formatNumber(totalCost)} mesos
          </p>
        </Card>

        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Total Value</h3>
          <p className="text-2xl font-semibold">
            {formatNumber(totalValue)} mesos
          </p>
        </Card>
      </div>

      <Select
        value={selectedOutcomeId || ""}
        onValueChange={setSelectedOutcomeId}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select outcome to analyze" />
        </SelectTrigger>
        <SelectContent>
          {sortedOutcomes.map((outcome) => (
            <SelectItem key={outcome.id} value={outcome.id}>
              <div className="flex items-center gap-2">
                {item && <ItemImage imageUrl={item.imageUrl} name={item.name} />}
                <span>{formatOutcomeTitle(outcome)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOutcome && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 glass-panel">
            <h3 className="font-medium mb-2">Average Cost</h3>
            <p className="text-xl font-semibold">
              {formatNumber(averageCost)} mesos
            </p>
          </Card>

          <Card className="p-4 glass-panel">
            <h3 className="font-medium mb-2">Average Value</h3>
            <p className="text-xl font-semibold">
              {formatNumber(averageValue)} mesos
            </p>
          </Card>

          <Card className="p-4 glass-panel">
            <h3 className="font-medium mb-2">Average Profit</h3>
            <p className={`text-xl font-semibold ${averageProfit >= 0 ? 'text-maple-success' : 'text-maple-error'}`}>
              {formatNumber(averageProfit)} mesos
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};