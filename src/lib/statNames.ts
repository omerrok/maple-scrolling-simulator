export const statDisplayNames: { [key: string]: string } = {
  watk: "Weapon Attack",
  matk: "Magic Attack",
  def: "Weapon Defense",
  mdef: "Magic Defense",
  acc: "Accuracy",
  avoid: "Avoidability",
  speed: "Speed",
  jump: "Jump",
  str: "STR",
  dex: "DEX",
  int: "INT",
  luk: "LUK",
  hp: "HP",
  mp: "MP"
};

export const formatStatName = (stat: string): string => {
  return statDisplayNames[stat.toLowerCase()] || stat.toUpperCase();
};