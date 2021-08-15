// Interface for each workspace within the application
export interface Workspace {
  id: string;
  name: string;
  type?: string;
  description?: string;
  stats?: {
    id: string;
  };
}
