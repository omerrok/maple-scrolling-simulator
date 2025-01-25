import { Item, Scroll } from "@/types/maple";

export const sampleItems: Item[] = [
  {
    id: "1",
    name: "Blue Cotton Robe",
    type: "overall",
    slots: 7,
    stats: { def: 10 },
    imageUrl: "https://maplestory.io/api/GMS/210.1.1/item/1050039/icon"
  },
  {
    id: "2",
    name: "Blue Jean",
    type: "bottom",
    slots: 5,
    stats: { def: 5 },
    imageUrl: "https://maplestory.io/api/GMS/210.1.1/item/1060057/icon"
  },
  {
    id: "3",
    name: "White Bandana",
    type: "hat",
    slots: 5,
    stats: { def: 3 },
    imageUrl: "https://maplestory.io/api/GMS/210.1.1/item/1002019/icon"
  }
];

export const sampleScrolls: Scroll[] = [
  {
    id: "1",
    name: "Overall DEF 60%",
    type: "overall",
    success: 0.6,
    effects: { def: 2 },
    imageUrl: "https://maplestory.io/api/GMS/210.1.1/item/2040000/icon"
  },
  {
    id: "2",
    name: "Bottom DEF 10%",
    type: "bottom",
    success: 0.1,
    effects: { def: 5 },
    imageUrl: "https://maplestory.io/api/GMS/210.1.1/item/2040100/icon"
  },
  {
    id: "3",
    name: "Hat DEF 30%",
    type: "hat",
    success: 0.3,
    effects: { def: 3 },
    imageUrl: "https://maplestory.io/api/GMS/210.1.1/item/2040200/icon"
  }
];