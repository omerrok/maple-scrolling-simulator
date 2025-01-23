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

interface ScrollSelectorProps {
  selectedScrolls: Scroll[];
  onSelect: (scrolls: Scroll[]) => void;
  selectedItem: Item | null;
}

// Temporary mock data - replace with CSV data
const mockScrolls: Scroll[] = [
  {
    id: "1",
    name: "Scroll for Weapon for ATT 60%",
    type: "weapon",
    success: 0.6,
    effects: { watk: 5 },
  },
];

export const ScrollSelector = ({
  selectedScrolls,
  onSelect,
  selectedItem,
}: ScrollSelectorProps) => {
  const filteredScrolls = selectedItem
    ? mockScrolls.filter(scroll => scroll.type === selectedItem.type)
    : mockScrolls;

  const handleScrollSelect = (scrollId: string) => {
    const scroll = mockScrolls.find(s => s.id === scrollId);
    if (scroll && !selectedScrolls.find(s => s.id === scroll.id)) {
      onSelect([...selectedScrolls, scroll]);
    }
  };

  const handleScrollRemove = (scrollId: string) => {
    onSelect(selectedScrolls.filter(s => s.id !== scrollId));
  };

  return (
    <div className="space-y-4">
      <Label>Select Scrolls</Label>
      
      <Select onValueChange={handleScrollSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose scrolls" />
        </SelectTrigger>
        <SelectContent>
          {filteredScrolls.map((scroll) => (
            <SelectItem key={scroll.id} value={scroll.id}>
              <div className="flex items-center gap-2">
                {scroll.imageUrl && (
                  <img
                    src={scroll.imageUrl}
                    alt={scroll.name}
                    className="w-6 h-6 object-contain"
                  />
                )}
                <span>{scroll.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedScrolls.length > 0 && (
        <div className="space-y-4 animate-in">
          {selectedScrolls.map((scroll, index) => (
            <div key={scroll.id} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {scroll.imageUrl && (
                    <img
                      src={scroll.imageUrl}
                      alt={scroll.name}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <span className="font-medium">{scroll.name}</span>
                  <button
                    onClick={() => handleScrollRemove(scroll.id)}
                    className="p-1 hover:bg-maple-muted rounded-full transition-colors ml-auto"
                  >
                    <X className="h-4 w-4 text-maple-text" />
                  </button>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label htmlFor={`scroll-cost-${index}`}>
                    Scroll Cost (Mesos)
                  </Label>
                  <Input
                    id={`scroll-cost-${index}`}
                    type="number"
                    placeholder="Enter cost in mesos"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};