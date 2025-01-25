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
import { Button } from "@/components/ui/button";
import { Item, Scroll, ItemStats } from "@/types/maple";
import { X, Plus } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { ItemStatInput } from "./ItemStatInput";
import { SearchInput } from "./SearchInput";
import { ItemImage } from "./ItemImage";
import { sampleItems } from "@/lib/sampleData";
import { statDisplayNames } from "@/lib/statNames";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [itemCost, setItemCost] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [editedStats, setEditedStats] = useState<ItemStats>({});
  const [showStatSelector, setShowStatSelector] = useState(false);

  const filteredItems = sampleItems
    .filter(item => 
      selectedScrolls.length === 0 || 
      selectedScrolls.some(scroll => scroll.type === item.type)
    )
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleItemSelect = (value: string) => {
    const item = sampleItems.find((i) => i.id === value);
    if (item) {
      onSelect({
        ...item,
        cost: parseInt(itemCost.replace(/[^\d]/g, '')) || 0,
        stats: { ...item.stats }
      });
      setEditedStats(item.stats);
    } else {
      onSelect(null);
      setEditedStats({});
    }
    setIsOpen(false);
  };

  const handleCostChange = (value: string) => {
    setItemCost(value);
    if (selectedItem) {
      onSelect({
        ...selectedItem,
        cost: parseInt(value.replace(/[^\d]/g, '')) || 0
      });
    }
  };

  const handleStatChange = (stat: string, value: number) => {
    if (selectedItem) {
      const newStats = { ...selectedItem.stats, [stat]: value };
      onSelect({
        ...selectedItem,
        stats: newStats
      });
      setEditedStats(newStats);
    }
  };

  const handleAddStat = (stat: string) => {
    if (selectedItem) {
      const newStats = { ...selectedItem.stats, [stat]: 0 };
      onSelect({
        ...selectedItem,
        stats: newStats
      });
      setEditedStats(newStats);
      setShowStatSelector(false);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setItemCost(selectedItem.cost?.toString() || "");
      setEditedStats(selectedItem.stats);
    }
  }, [selectedItem]);

  const availableStats = Object.keys(statDisplayNames).filter(
    stat => !selectedItem?.stats[stat as keyof ItemStats]
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
        value={selectedItem?.id || ""}
        onValueChange={handleItemSelect}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select item">
            {selectedItem && (
              <div className="flex items-center gap-2">
                <ItemImage imageUrl={selectedItem.imageUrl} name={selectedItem.name} />
                <span>{selectedItem.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search items..."
          />
          {filteredItems.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <div className="flex items-center gap-2">
                <ItemImage imageUrl={item.imageUrl} name={item.name} />
                <span>{item.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedItem && (
        <div className="space-y-4 animate-in">
          <div className="space-y-2">
            <Label htmlFor="item-cost">Item Cost (Mesos)</Label>
            <Input
              id="item-cost"
              type="text"
              placeholder="Enter item cost"
              value={formatNumber(itemCost)}
              onChange={(e) => handleCostChange(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedItem.stats)
              .filter(([_, value]) => value !== undefined)
              .map(([stat, value]) => (
                <ItemStatInput
                  key={stat}
                  stat={stat}
                  value={value}
                  onChange={handleStatChange}
                />
              ))}
          </div>

          {availableStats.length > 0 && (
            <div className="space-y-2">
              {showStatSelector ? (
                <Select onValueChange={handleAddStat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stat to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStats.map(stat => (
                      <SelectItem key={stat} value={stat}>
                        {statDisplayNames[stat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowStatSelector(true)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stat
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};