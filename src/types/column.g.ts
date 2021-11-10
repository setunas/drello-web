import { Card } from "src/types/card.g";

export interface Column {
  id: number;
  title?: string;
  cards?: Card[];
}
