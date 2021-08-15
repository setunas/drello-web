import { Workspace } from "./workspace.g";

export interface Stats {
  id?: number;
  measure: string;
  content: string[];
}

export interface Board {
  id: number;
  title: string;
  focus?: boolean;
  workspace?: Workspace;
  stats?: Stats[];
}
