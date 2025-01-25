import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Item, Scroll, ItemStats } from "@/types/maple";
import { X, Plus } from "lucide-react";
import { ItemStatInput } from "./ItemStatInput";
import { formatStatName } from "@/lib/statNames";
import { fetchItems } from "@/lib/googleSheets";
import { useToast } from "@/hooks/use-toast";
import { formatNumber } from "@/lib/utils";

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
  const [itemStats, setItemStats] = useState<ItemStats>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [itemCost, setItemCost] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
      } catch (error) {
        toast({
          title: "Error loading items",
          description: "Failed to load items from Google Sheets",
          variant: "destructive",
        });
      }
    };
    loadItems();
  }, [toast]);

  const filteredItems = items
    .filter(item => 
      selectedScrolls.length === 0 || 
      selectedScrolls.some(scroll => scroll.type === item.type)
    )
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleItemSelect = (value: string) => {
    const item = items.find((i) => i.id === value);
    onSelect(item || null);
    setIsOpen(false);
  };

  const handleStatChange = (stat: string, value: number) => {
    setItemStats(prev => ({
      ...prev,
      [stat]: value
    }));
    
    if (selectedItem) {
      onSelect({
        ...selectedItem,
        stats: {
          ...selectedItem.stats,
          [stat]: value
        }
      });
    }
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

  const availableStats = AVAILABLE_STATS.filter(stat => 
    !selectedItem?.stats[stat as keyof ItemStats] || 
    selectedItem?.stats[stat as keyof ItemStats] === 0
  );

  React.useEffect(() => {
    if (selectedItem) {
      setItemStats(selectedItem.stats);
      setItemCost(selectedItem.cost?.toString() || "");
      setAdditionalStats([]);
    }
  }, [selectedItem]);

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
          <SelectValue placeholder="Select item" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
          </div>
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
              .filter(([_, value]) => value !== 0)
              .map(([stat, value]) => (
                <ItemStatInput
                  key={stat}
                  stat={stat}
                  value={itemStats[stat as keyof ItemStats] || value}
                  onChange={handleStatChange}
                />
              ))}
            {additionalStats.map(stat => (
              <ItemStatInput
                key={stat}
                stat={stat}
                value={itemStats[stat as keyof ItemStats] || 0}
                onChange={handleStatChange}
              />
            ))}
          </div>

          {availableStats.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
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
                    {formatStatName(stat)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
};