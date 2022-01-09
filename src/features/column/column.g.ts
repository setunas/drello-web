export interface OuterColumn {
  id: number;
  title: string;
  position: number;
  boardId: number;
}

export interface Column {
  id: number;
  title?: string;
  position: number;
  boardId: number;
}
