import { Workspace } from "src/types/inner/workspace.g";
import { Column } from "src/types/inner/column.g";
import { Card } from "src/types/inner/card.g";

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
  workspace?: Workspace;
  stats?: Stats[];
  columns?: Column[] | [];
  cards?: Card[] | [];
}
