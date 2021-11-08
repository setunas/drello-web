import { Column } from "src/types/outer/column";

export interface Board {
  id: number;
  title: string;
  columns: [Column] | [];
}
