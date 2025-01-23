import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ItemSelector } from "./ItemSelector";
import { ScrollSelector } from "./ScrollSelector";
import { StepConfigurator } from "./StepConfigurator";
import { SimulationResults } from "./SimulationResults";
import { CostAnalysis } from "./CostAnalysis";
import { Item, Scroll, ScrollingStep, SimulationOutcome, ItemStats } from "@/types/maple";
import { useToast } from "@/hooks/use-toast";

const SIMULATION_COUNT = 10000;

export const ScrollingSimulator = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedScrolls, setSelectedScrolls] = useState<Scroll[]>([]);
  const [steps, setSteps] = useState<ScrollingStep[]>([]);
  const [outcomes, setOutcomes] = useState<SimulationOutcome[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const { toast } = useToast();

  const simulateScrolling = (item: Item, steps: ScrollingStep[]): ItemStats => {
    let currentStats = { ...item.stats };
    let currentStep = 0;

    while (currentStep < steps.length) {
      const step = steps[currentStep];
      if (!step.scroll) break;

      // Generate a random number between 0 and 1
      const roll = Math.random();
      // Compare against the success rate (e.g., 0.1 for 10%)
      const success = roll < step.scroll.success;

      if (success) {
        // Apply scroll effects
        Object.entries(step.scroll.effects).forEach(([stat, value]) => {
          const statKey = stat as keyof ItemStats;
          currentStats[statKey] = (currentStats[statKey] || 0) + value;
        });
        
        if (step.onSuccess === "stop") break;
        currentStep++;
      } else {
        if (step.onFailure === "stop") break;
        currentStep++;
      }
    }

    return currentStats;
  };

  const handleStartSimulation = () => {
    if (!selectedItem || steps.length === 0) return;

    setIsSimulating(true);
    setSimulationComplete(false);
    setOutcomes([]);

    let simulationResults: { [key: string]: SimulationOutcome } = {};
    let completedSimulations = 0;

    const runBatch = () => {
      const batchSize = 100;
      for (let i = 0; i < batchSize && completedSimulations < SIMULATION_COUNT; i++) {
        const finalStats = simulateScrolling(selectedItem, steps);
        const outcomeKey = JSON.stringify(finalStats);

        if (!simulationResults[outcomeKey]) {
          simulationResults[outcomeKey] = {
            id: outcomeKey,
            steps: steps.length,
            successfulSteps: Object.keys(finalStats).length - Object.keys(selectedItem.stats).length,
            finalStats,
            count: 0
          };
        }
        simulationResults[outcomeKey].count++;
        completedSimulations++;
      }

      setOutcomes(Object.values(simulationResults));

      if (completedSimulations < SIMULATION_COUNT) {
        requestAnimationFrame(runBatch);
      } else {
        setIsSimulating(false);
        setSimulationComplete(true);
        toast({
          title: "Simulation Complete",
          description: `Completed ${SIMULATION_COUNT} simulations with ${Object.keys(simulationResults).length} unique outcomes.`
        });
      }
    };

    runBatch();
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
              Scrolling Steps
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

        {(isSimulating || simulationComplete) && (
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