import sample from "@/content/sample-autumn-balcony.json";
import type { TextContent } from "./types";

export const TEXTS: TextContent[] = [sample as TextContent];

export function getText(id: string): TextContent | undefined {
  return TEXTS.find((t) => t.id === id);
}

export const DEFAULT_TEXT_ID = TEXTS[0].id;
