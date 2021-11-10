import { Column } from "src/types/outer/column";
import { Card } from "src/types/outer/card";

export interface Board {
  id: number;
  title: string;
  columns: Column[] | [];
  cards: Card[] | [];
}
