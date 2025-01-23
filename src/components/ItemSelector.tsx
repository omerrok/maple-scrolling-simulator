import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Item, Scroll, ItemStats } from "@/types/maple";
import { X, Plus } from "lucide-react";
import { items } from "@/data/mapleData";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AVAILABLE_STATS = [
  "str", "dex", "int", "luk", "watk", "matk", "def", "mdef",
  "hp", "mp", "acc", "avoid", "speed", "jump"
] as const;

interface ItemSelectorProps {
  selectedItem: Item | null;
  onSelect: (item: Item | null) => void;
  selectedScrolls: Scroll[];
}

export const ItemSelector = ({
  selectedItem,
  onSelect,
  selectedScrolls,
}: ItemSelectorProps) => {
  const [additionalStats, setAdditionalStats] = useState<string[]>([]);
  const filteredItems = selectedScrolls.length > 0
    ? items.filter(item => 
        selectedScrolls.some(scroll => scroll.type === item.type)
      )
    : items;

  const getDefaultStats = (stats: ItemStats) => {
    return Object.entries(stats)
      .filter(([_, value]) => value !== 0)
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
      }), {});
  };

  const availableStats = AVAILABLE_STATS.filter(stat => 
    !selectedItem?.stats[stat as keyof ItemStats] || 
    selectedItem?.stats[stat as keyof ItemStats] === 0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="item-select">Select Item</Label>
        {selectedItem && (
          <button
            onClick={() => onSelect(null)}
            className="p-1 hover:bg-maple-muted rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-maple-text" />
          </button>
        )}
      </div>
      
      <Select
        value={selectedItem?.id}
        onValueChange={(value) => {
          const item = items.find((i) => i.id === value);
          onSelect(item || null);
          setAdditionalStats([]);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select item" />
        </SelectTrigger>
        <SelectContent>
          {filteredItems.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <div className="flex items-center gap-2">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-6 h-6 object-contain"
                  />
                )}
                <span>{item.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedItem && (
        <div className="space-y-4 animate-in">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(getDefaultStats(selectedItem.stats)).map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <Label htmlFor={`stat-${stat}`}>
                  {stat.toUpperCase()}
                </Label>
                <Input
                  id={`stat-${stat}`}
                  type="text"
                  value={formatNumber(value)}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '');
                    // Implement stat override logic
                  }}
                />
              </div>
            ))}
            {additionalStats.map(stat => (
              <div key={stat} className="space-y-2">
                <Label htmlFor={`stat-${stat}`}>
                  {stat.toUpperCase()}
                </Label>
                <Input
                  id={`stat-${stat}`}
                  type="text"
                  defaultValue="0"
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '');
                    // Implement stat override logic
                  }}
                />
              </div>
            ))}
          </div>

          {availableStats.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stat
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Available Stats</DropdownMenuLabel>
                {availableStats.map((stat) => (
                  <DropdownMenuItem
                    key={stat}
                    onClick={() => setAdditionalStats([...additionalStats, stat])}
                  >
                    {stat.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="item-cost">Item Cost (Mesos)</Label>
            <Input
              id="item-cost"
              type="text"
              placeholder="Enter cost in mesos"
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = formatNumber(newValue);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};