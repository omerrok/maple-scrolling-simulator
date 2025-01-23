export interface Item {
  id: string;
  name: string;
  type: string;
  slots: number;
  stats: ItemStats;
  imageUrl?: string;
}

export interface ItemStats {
  str?: number;
  dex?: number;
  int?: number;
  luk?: number;
  watk?: number;
  matk?: number;
  def?: number;
  mdef?: number;
  hp?: number;
  mp?: number;
  acc?: number;
  avoid?: number;
  speed?: number;
  jump?: number;
}

export interface Scroll {
  id: string;
  name: string;
  type: string;
  success: number;
  effects: ScrollEffects;
  imageUrl?: string;
}

export interface ScrollEffects {
  str?: number;
  dex?: number;
  int?: number;
  luk?: number;
  watk?: number;
  matk?: number;
  def?: number;
  mdef?: number;
  hp?: number;
  mp?: number;
  acc?: number;
  avoid?: number;
  speed?: number;
  jump?: number;
}

export interface ScrollingStep {
  scroll: Scroll | null;
  onSuccess: "next" | "stop";
  onFailure: "next" | "stop";
}

export interface SimulationOutcome {
  id: string;
  steps: number;
  successfulSteps: number;
  finalStats: ItemStats;
  count: number;
}