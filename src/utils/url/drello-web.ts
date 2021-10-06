export const path = {
  landing: () => `/`,
  workspaces: (id?: number) => (id ? `/workspaces/${id}` : `/workspaces`),
  boards: (id?: number) => (id ? `/boards/${id}` : `/boards`),
};
