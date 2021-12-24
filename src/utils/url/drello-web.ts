export const path = {
  landing: () => `/`,
  signin: (id?: number) => (id ? `/signin/${id}` : `/signin`),
  boards: (id?: number) => (id ? `/boards/${id}` : `/boards`),
};
