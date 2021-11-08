import { Workspace } from "./workspace.g";
import { Column } from "./column.g";

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
  columns?: Column[];
}
