import { Workspace } from "./workspace.g";

export interface Stats {
  id?: string;
  measure: string;
  content: string[];
}

export interface Board {
  id: string;
  title: string;
  focus?: boolean;
  workspace?: Workspace;
  stats?: Stats[];
}
