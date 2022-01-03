export interface Card {
  id: number;
  title: string;
  columnId: number;
  nextCardId: number | null;
}
