import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Item, Scroll } from "@/types/maple";
import { X } from "lucide-react";
import { items } from "@/data/mapleData";

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
  const filteredItems = selectedScrolls.length > 0
    ? items.filter(item => 
        selectedScrolls.some(scroll => scroll.type === item.type)
      )
    : items;

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
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an item" />
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
            {Object.entries(selectedItem.stats).map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <Label htmlFor={`stat-${stat}`}>
                  {stat.toUpperCase()}
                </Label>
                <Input
                  id={`stat-${stat}`}
                  type="number"
                  value={value}
                  onChange={(e) => {
                    // Implement stat override logic
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item-cost">Item Cost (Mesos)</Label>
            <Input
              id="item-cost"
              type="number"
              placeholder="Enter cost in mesos"
            />
          </div>
        </div>
      )}
    </div>
  );
};