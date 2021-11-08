import { Card } from "./card.g";

export interface Column {
  id: number;
  title?: string;
  cards?: Card[];
}
