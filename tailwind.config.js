module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'atkinson': ['Atkinson Hyperlegible', 'sans-serif'],
      },
      colors: {
        bodyColor: "#152938",
        logoColor: "#FFFFFF",
        spanBlue: "#7191A5",
        selectBlue: "#BCCED9",
        yellowButton: "#FDA214",
        playergray: "#DFE7EC",
        timerColor: "#304859",
        hoverColor: "#6395B8",
        hoverYellow: "#FFB84A",
      },
      screens: {
        tablet: "768px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};
