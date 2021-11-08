import { Card } from "src/types/outer/card.d";

export interface Column {
  id: number;
  title?: string;
  cards?: Card[];
}
