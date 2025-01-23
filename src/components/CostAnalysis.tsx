import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item, Scroll, SimulationOutcome } from "@/types/maple";
import { Card } from "@/components/ui/card";

interface CostAnalysisProps {
  item: Item | null;
  scrolls: Scroll[];
  outcomes: SimulationOutcome[];
}

export const CostAnalysis = ({
  item,
  scrolls,
  outcomes,
}: CostAnalysisProps) => {
  const [selectedOutcome, setSelectedOutcome] = React.useState<string>("");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Total Cost</h3>
          <p className="text-2xl font-semibold">
            0 mesos {/* Replace with actual calculation */}
          </p>
        </Card>

        <Card className="p-4 glass-panel">
          <h3 className="font-medium mb-2">Total Value</h3>
          <p className="text-2xl font-semibold">
            0 mesos {/* Replace with actual calculation */}
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        <Select
          value={selectedOutcome}
          onValueChange={setSelectedOutcome}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select outcome to analyze" />
          </SelectTrigger>
          <SelectContent>
            {outcomes.map((outcome) => (
              <SelectItem key={outcome.id} value={outcome.id}>
                Outcome {outcome.successfulSteps}/{outcome.steps} Success
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedOutcome && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in">
            <Card className="p-4 glass-panel">
              <h3 className="font-medium mb-2">Average Cost</h3>
              <p className="text-xl font-semibold">
                0 mesos {/* Replace with actual calculation */}
              </p>
            </Card>

            <Card className="p-4 glass-panel">
              <h3 className="font-medium mb-2">Outcome Value</h3>
              <p className="text-xl font-semibold">
                0 mesos {/* Replace with actual calculation */}
              </p>
            </Card>

            <Card className="p-4 glass-panel">
              <h3 className="font-medium mb-2">Average Profit</h3>
              <p className="text-xl font-semibold text-maple-success">
                0 mesos {/* Replace with actual calculation */}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};