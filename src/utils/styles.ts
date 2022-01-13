export const colors = {
  primary: "#31AF90",
  secondary: "#F0F465",
  text: "#425466",
  boldText: "#0A2540",
  placeholder: "#C1CBD7",
  background: "#fff",
  backgroundB: "#eee",

  black: (opacity: number = 1) => `rgba(0, 0, 0, ${opacity})`,
  white: (opacity: number = 1) => `rgba(255, 255, 255, ${opacity})`,
  greyish: (opacity: number = 1) => `rgba(141, 153, 174, ${opacity})`,
};

export const zIndex = {
  mainOfBoardPage: 0,
  footer: 100,
};

export const fontFamily = {
  primary: `"sohne-var","Helvetica Neue","Arial",sans-serif;`,
};
