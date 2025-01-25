import React, { useState, useEffect } from "react";
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
import { formatNumber } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { ItemImage } from "./ItemImage";
import { fetchScrolls } from "@/lib/googleSheets";
import { useQuery } from "@tanstack/react-query";

interface ScrollSelectorProps {
  selectedScrolls: Scroll[];
  onSelect: (scrolls: Scroll[]) => void;
  selectedItem: Item | null;
}

export const ScrollSelector = ({
  selectedScrolls,
  onSelect,
  selectedItem,
}: ScrollSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: scrolls = [] } = useQuery({
    queryKey: ['scrolls'],
    queryFn: fetchScrolls,
  });

  const filteredScrolls = scrolls
    .filter(scroll => 
      !selectedItem || scroll.type === selectedItem.type
    )
    .filter(scroll => 
      scroll.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleScrollSelect = (scrollId: string) => {
    const scroll = scrolls.find(s => s.id === scrollId);
    if (scroll && !selectedScrolls.find(s => s.id === scroll.id)) {
      onSelect([...selectedScrolls, scroll]);
    }
    setIsOpen(false);
  };

  const handleScrollRemove = (scrollId: string) => {
    onSelect(selectedScrolls.filter(s => s.id !== scrollId));
  };

  const handleCostChange = (scrollId: string, value: string) => {
    const updatedScrolls = selectedScrolls.map(scroll => {
      if (scroll.id === scrollId) {
        return {
          ...scroll,
          cost: parseInt(value.replace(/[^\d]/g, '')) || 0
        };
      }
      return scroll;
    });
    onSelect(updatedScrolls);
  };

  return (
    <div className="space-y-4">
      <Label>Select Scrolls</Label>
      
      <Select 
        open={isOpen} 
        onOpenChange={setIsOpen}
        onValueChange={handleScrollSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select scroll" />
        </SelectTrigger>
        <SelectContent>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search scrolls..."
          />
          {filteredScrolls.map((scroll) => (
            <SelectItem key={scroll.id} value={scroll.id}>
              <div className="flex items-center gap-2">
                <ItemImage imageUrl={scroll.imageUrl} name={scroll.name} />
                <span>{scroll.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedScrolls.length > 0 && (
        <div className="space-y-4 animate-in">
          {selectedScrolls.map((scroll) => (
            <div key={scroll.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-1 space-y-2">
                <Label>
                  {scroll.name} Cost (Mesos)
                </Label>
                <Input
                  type="text"
                  placeholder="Enter cost in mesos"
                  value={formatNumber(scroll.cost?.toString() || "")}
                  onChange={(e) => handleCostChange(scroll.id, e.target.value)}
                />
              </div>
              <button
                onClick={() => handleScrollRemove(scroll.id)}
                className="p-1 hover:bg-maple-muted rounded-full transition-colors self-start mt-2"
              >
                <X className="h-4 w-4 text-maple-text" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};