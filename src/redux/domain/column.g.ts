import { Card } from "src/redux/domain/card.g";

export interface Column {
  id: number;
  title?: string;
  cards?: Card[];
}
