import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ItemSelector } from "./ItemSelector";
import { ScrollSelector } from "./ScrollSelector";
import { StepConfigurator } from "./StepConfigurator";
import { SimulationResults } from "./SimulationResults";
import { CostAnalysis } from "./CostAnalysis";
import { Item, Scroll, ScrollingStep, SimulationOutcome } from "@/types/maple";

export const ScrollingSimulator = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedScrolls, setSelectedScrolls] = useState<Scroll[]>([]);
  const [steps, setSteps] = useState<ScrollingStep[]>([]);
  const [outcomes, setOutcomes] = useState<SimulationOutcome[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    // Simulation logic will be implemented here
  };

  const handleStopSimulation = () => {
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-maple-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6 animate-in">
        <h1 className="text-4xl font-semibold text-maple-text text-center mb-8">
          MapleStory Scrolling Simulator
        </h1>
        
        <Card className="p-6 glass-panel slide-up">
          <h2 className="text-2xl font-medium text-maple-text mb-6">
            Select Item and Scrolls
          </h2>
          <div className="space-y-6">
            <ItemSelector
              selectedItem={selectedItem}
              onSelect={setSelectedItem}
              selectedScrolls={selectedScrolls}
            />
            <ScrollSelector
              selectedScrolls={selectedScrolls}
              onSelect={setSelectedScrolls}
              selectedItem={selectedItem}
            />
          </div>
        </Card>

        {selectedItem && selectedScrolls.length > 0 && (
          <Card className="p-6 glass-panel slide-up">
            <h2 className="text-2xl font-medium text-maple-text mb-6">
              Configure Scrolling Steps
            </h2>
            <StepConfigurator
              item={selectedItem}
              scrolls={selectedScrolls}
              steps={steps}
              onStepsChange={setSteps}
              onStart={handleStartSimulation}
              disabled={isSimulating}
            />
          </Card>
        )}

        {isSimulating && (
          <Card className="p-6 glass-panel slide-up">
            <h2 className="text-2xl font-medium text-maple-text mb-6">
              Simulation Results
            </h2>
            <SimulationResults
              outcomes={outcomes}
              onStop={handleStopSimulation}
            />
          </Card>
        )}

        {outcomes.length > 0 && (
          <Card className="p-6 glass-panel slide-up">
            <h2 className="text-2xl font-medium text-maple-text mb-6">
              Cost Analysis
            </h2>
            <CostAnalysis
              item={selectedItem}
              scrolls={selectedScrolls}
              outcomes={outcomes}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScrollingSimulator;