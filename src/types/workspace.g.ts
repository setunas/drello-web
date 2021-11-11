// Interface for each workspace within the application
export interface Workspace {
  id: number;
  name: string;
  type?: string;
  description?: string;
  stats?: {
    id: string;
  };
}
