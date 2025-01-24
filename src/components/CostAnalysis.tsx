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
  if (!visible) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Total Cost</h3>
          <p className="text-2xl font-semibold">
            {formatNumber(0)} mesos
          </p>
        </Card>

        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Total Value</h3>
          <p className="text-2xl font-semibold">
            {formatNumber(0)} mesos
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Average Cost</h3>
          <p className="text-xl font-semibold">
            {formatNumber(0)} mesos
          </p>
        </Card>

        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Average Value</h3>
          <p className="text-xl font-semibold">
            {formatNumber(0)} mesos
          </p>
        </Card>

        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Average Profit</h3>
          <p className="text-xl font-semibold text-maple-success">
            {formatNumber(0)} mesos
          </p>
        </Card>
      </div>
    </div>
  );
};