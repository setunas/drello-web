export const path = {
  landing: () => `/`,
  signin: (id?: number) => (id ? `/signin/${id}` : `/signin`),
  boards: (id?: number) => (id ? `/boards/${id}` : `/boards`),
};

export const imagePath = { template1: "/images/template-1.JPG" } as const;
