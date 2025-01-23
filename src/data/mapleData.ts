import { Item, Scroll } from "@/types/maple";

export const items: Item[] = [
  {
    id: "1",
    name: "Maple Soul Searcher",
    type: "weapon",
    slots: 7,
    stats: {
      watk: 108,
      str: 0,
      dex: 0
    }
  },
  {
    id: "2",
    name: "Maple Storm Finger",
    type: "weapon",
    slots: 7,
    stats: {
      watk: 108,
      luk: 0,
      dex: 0
    }
  },
  {
    id: "3",
    name: "Maple Dragon Axe",
    type: "weapon",
    slots: 7,
    stats: {
      watk: 108,
      str: 0
    }
  },
  {
    id: "4",
    name: "Maple Demon Axe",
    type: "weapon",
    slots: 7,
    stats: {
      watk: 108,
      str: 0
    }
  }
];

export const scrolls: Scroll[] = [
  {
    id: "1",
    name: "Scroll for Weapon for ATT 60%",
    type: "weapon",
    success: 0.6,
    effects: {
      watk: 5
    }
  },
  {
    id: "2",
    name: "Scroll for Weapon for ATT 10%",
    type: "weapon",
    success: 0.1,
    effects: {
      watk: 7
    }
  },
  {
    id: "3",
    name: "Dark Scroll for Weapon for ATT 30%",
    type: "weapon",
    success: 0.3,
    effects: {
      watk: 9
    }
  },
  {
    id: "4",
    name: "Dark Scroll for Weapon for ATT 70%",
    type: "weapon",
    success: 0.7,
    effects: {
      watk: 3
    }
  }
];