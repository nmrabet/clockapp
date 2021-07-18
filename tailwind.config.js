module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('./assets/mobile/bg-image-daytime.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
