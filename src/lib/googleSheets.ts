import { Item, Scroll } from "@/types/maple";

const ITEMS_SHEET_ID = "1m4N0tSfspEegwFXpSI-ijeY9x7EOUZw12VelDL1KzJ4";
const SCROLLS_SHEET_ID = "1FQSSBVJOvpmvalP7ZXR4CEoYbwkHcdNRNnDYtLWmd3Y";

const fetchGoogleSheetData = async (sheetId: string, sheetName: string) => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`
  );
  const text = await response.text();
  const json = JSON.parse(text.substring(47).slice(0, -2));
  return json.table.rows;
};

export const fetchItems = async (): Promise<Item[]> => {
  const rows = await fetchGoogleSheetData(ITEMS_SHEET_ID, "Sheet1");
  return rows.map((row: any) => ({
    id: row.c[0].v.toString(),
    name: row.c[1].v,
    type: row.c[2].v,
    slots: parseInt(row.c[3].v),
    stats: {
      str: parseInt(row.c[4]?.v) || 0,
      dex: parseInt(row.c[5]?.v) || 0,
      int: parseInt(row.c[6]?.v) || 0,
      luk: parseInt(row.c[7]?.v) || 0,
      watk: parseInt(row.c[8]?.v) || 0,
      matk: parseInt(row.c[9]?.v) || 0,
      def: parseInt(row.c[10]?.v) || 0,
      mdef: parseInt(row.c[11]?.v) || 0,
      hp: parseInt(row.c[12]?.v) || 0,
      mp: parseInt(row.c[13]?.v) || 0,
      acc: parseInt(row.c[14]?.v) || 0,
      avoid: parseInt(row.c[15]?.v) || 0,
      speed: parseInt(row.c[16]?.v) || 0,
      jump: parseInt(row.c[17]?.v) || 0
    },
    imageUrl: row.c[18]?.v || ""
  }));
};

export const fetchScrolls = async (): Promise<Scroll[]> => {
  const rows = await fetchGoogleSheetData(SCROLLS_SHEET_ID, "Sheet1");
  return rows.map((row: any) => ({
    id: row.c[0].v.toString(),
    name: row.c[1].v,
    type: row.c[2].v,
    success: parseFloat(row.c[3].v),
    effects: {
      str: parseInt(row.c[4]?.v) || 0,
      dex: parseInt(row.c[5]?.v) || 0,
      int: parseInt(row.c[6]?.v) || 0,
      luk: parseInt(row.c[7]?.v) || 0,
      watk: parseInt(row.c[8]?.v) || 0,
      matk: parseInt(row.c[9]?.v) || 0,
      def: parseInt(row.c[10]?.v) || 0,
      mdef: parseInt(row.c[11]?.v) || 0,
      hp: parseInt(row.c[12]?.v) || 0,
      mp: parseInt(row.c[13]?.v) || 0,
      acc: parseInt(row.c[14]?.v) || 0,
      avoid: parseInt(row.c[15]?.v) || 0,
      speed: parseInt(row.c[16]?.v) || 0,
      jump: parseInt(row.c[17]?.v) || 0
    },
    imageUrl: row.c[18]?.v || "",
    cost: parseInt(row.c[19]?.v) || 0
  }));
};