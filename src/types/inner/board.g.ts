import { Workspace } from "./workspace.g";

export interface Stats {
  id?: number;
  measure: string;
  content: string[];
}

export interface Card {
  id: number;
  title: string;
}

export interface Column {
  id: number;
  title?: string;
  cards?: Card[];
}

export interface Image {
  src: string;
  alt: string;
}

export interface Board {
  id: number;
  title: string;
  focus?: boolean;
  image?: Image;
  workspace?: Workspace;
  stats?: Stats[];
  columns: Column[];
}
