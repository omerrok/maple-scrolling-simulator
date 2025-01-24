import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
import { formatStatName } from "@/lib/statNames";

interface ItemStatInputProps {
  stat: string;
  value: number;
  onChange: (stat: string, value: number) => void;
}

export const ItemStatInput = ({ stat, value, onChange }: ItemStatInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`stat-${stat}`}>
        {formatStatName(stat)}
      </Label>
      <Input
        id={`stat-${stat}`}
        type="text"
        value={formatNumber(value)}
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^\d]/g, '');
          onChange(stat, parseInt(newValue) || 0);
        }}
      />
    </div>
  );
};