import { Column } from "src/features/column/column.g";
import { Card } from "src/features/card/card.g";

export interface Stats {
  id?: number;
  measure: string;
  content: string[];
}

export interface BoardImage {
  src: string;
  alt: string;
}

export interface Board {
  id: number;
  title: string;
  focus?: boolean;
  boardImage?: BoardImage;
  stats?: Stats[];
  columns?: Column[];
  cards?: Card[];
}
