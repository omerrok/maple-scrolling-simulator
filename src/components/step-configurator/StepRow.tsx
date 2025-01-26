import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scroll, ScrollingStep } from "@/types/maple";
import { Minus } from "lucide-react";
import { ItemImage } from "../ItemImage";

interface StepRowProps {
  step: ScrollingStep;
  index: number;
  scrolls: Scroll[];
  isLastStep: boolean;
  onUpdate: (updates: Partial<ScrollingStep>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const StepRow = ({
  step,
  index,
  scrolls,
  isLastStep,
  onUpdate,
  onRemove,
  canRemove,
}: StepRowProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm animate-in">
      <span className="font-medium min-w-[4rem]">
        Step {index + 1}
      </span>
      
      <Select
        value={step.scroll?.id || ""}
        onValueChange={(value) => {
          const scroll = scrolls.find((s) => s.id === value);
          onUpdate({ scroll: scroll || null });
        }}
      >
        <SelectTrigger className="w-64">
          <SelectValue>
            {step.scroll && (
              <div className="flex items-center gap-2">
                <ItemImage imageUrl={step.scroll.imageUrl} name={step.scroll.name} />
                <span>{step.scroll.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {scrolls.map((scroll) => (
            <SelectItem key={scroll.id} value={scroll.id}>
              <div className="flex items-center gap-2">
                <ItemImage imageUrl={scroll.imageUrl} name={scroll.name} />
                <span>{scroll.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-4">
        <div>
          <span className="text-sm text-maple-text/60">On Success:</span>
          <Select
            value={step.onSuccess}
            onValueChange={(value: "next" | "stop") =>
              onUpdate({ onSuccess: value })
            }
            disabled={isLastStep}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next">Next Step</SelectItem>
              <SelectItem value="stop">Stop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span className="text-sm text-maple-text/60">On Failure:</span>
          <Select
            value={step.onFailure}
            onValueChange={(value: "next" | "stop") =>
              onUpdate({ onFailure: value })
            }
            disabled={isLastStep}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next">Next Step</SelectItem>
              <SelectItem value="stop">Stop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span className="text-sm text-maple-text/60">Failure Limit:</span>
          <Input
            type="number"
            min="0"
            max={index + 1}
            value={step.failureLimit}
            onChange={(e) => {
              const value = Math.min(
                Math.max(parseInt(e.target.value) || 0, 0),
                index + 1
              );
              onUpdate({ failureLimit: value });
            }}
            className="w-24"
            placeholder="0"
          />
        </div>
      </div>

      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="ml-auto"
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};