export const statDisplayNames: { [key: string]: string } = {
  str: "STR",
  dex: "DEX",
  int: "INT",
  luk: "LUK",
  watk: "Weapon Attack",
  matk: "Magic Attack",
  hp: "HP",
  mp: "MP",
  def: "Weapon Defense",
  mdef: "Magic Defense",
  acc: "Accuracy",
  avoid: "Avoidability",
  speed: "Speed",
  jump: "Jump"
};

export const formatStatName = (stat: string): string => {
  return statDisplayNames[stat.toLowerCase()] || stat.toUpperCase();
};

// Order of stats for the dropdown
export const statOrder = [
  "str", "dex", "int", "luk",
  "watk", "matk",
  "hp", "mp",
  "def", "mdef",
  "acc", "avoid",
  "speed", "jump"
];