import React from "react";
import { Card } from "@/components/ui/card";
import { Item, Scroll, SimulationOutcome } from "@/types/maple";
import { formatNumber } from "@/lib/utils";

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
  if (!visible || !item) return null;

  const totalCost = scrolls.reduce((acc, scroll) => acc + (scroll.cost || 0), 0) + (item.cost || 0);
  const totalValue = outcomes.reduce((acc, outcome) => acc + (outcome.value || 0) * outcome.count, 0);
  const totalRuns = outcomes.reduce((acc, outcome) => acc + outcome.count, 0);
  
  const averageCost = totalRuns > 0 ? totalCost / totalRuns : 0;
  const averageValue = totalRuns > 0 ? totalValue / totalRuns : 0;
  const averageProfit = averageValue - averageCost;

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
    </div>
  );
};