import { Column, OuterColumn } from "src/features/column/column.g";
import { Card, OuterCard } from "src/features/card/card.g";

export interface Stats {
  id?: number;
  measure: string;
  content: string[];
}

export interface BoardImage {
  src: string;
  alt: string;
}

export interface OuterBoard {
  id: number;
  title: string;
  columns?: OuterColumn[];
  cards?: OuterCard[];
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
