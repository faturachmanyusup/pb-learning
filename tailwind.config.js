module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'mn': '360px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      t: "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      orange: "0px 20px 20px -15px rgba(245,56,56,0.81) ",
      "orange-md": "0px 20px 40px -15px rgba(245,56,56,0.81) ",
      none: "none",
    },
    colors: {
      transparent: "transparent",
      black: {
        500: "#2A3140",
        600: "#0B132A",
        900: "#000",
      },
      orange: {
        100: "#FFECEC",
        500: "#F53855",
      },
      green: {
        200: '#6EE7B7',
        300: '#6ee7b7',
        500: "#2FAB73",
        700: '#2F855A'
      },
      white: {
        300: "#F8F8F8",
        500: "#fff",
      },
      gray: {
        100: "#EEEFF2",
        200: "#F6F5F7",
        400: "#AFB5C0",
        500: "#DDDDDD",
        900: "#111827",
      },
      red: {
        400: "#F56565",
        600: "#C53030",
      }
    },
    extend: {
      animation: {
        'fade-out': 'fadeOut 15s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': {
            backgroundColor: theme('backgroundColor'),
            borderColor: theme('borderColor'),
            textColor: theme('text'),
            boxShadow: theme('boxShadow')
          },
          '100%': {
            backgroundColor: theme('colors.transparent'),
            borderColor: theme('colors.transparent'),
            textColor: theme('colors.transparent'),
            boxShadow: theme('boxShadow.none')
          },
        },
      }),
      margin: {
        '0.3': '0.3rem'
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ["active", "hover"],
    },
  },
  plugins: [],
}
