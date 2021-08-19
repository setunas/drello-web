export const path = {
  workspaces: (id?: number) => (id ? `/workspaces/${id}` : `/workspaces`),
  boards: (id?: number) => (id ? `/boards/${id}` : `/boards`),
};
