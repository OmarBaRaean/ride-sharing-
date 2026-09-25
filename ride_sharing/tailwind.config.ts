import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      my28: ["28px", "30px"],
      my14: ["14px", "16px"],
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        myco01: "rgba(153, 226, 180, 0.6)",
        myco0: "rgba(153, 226, 180)",
        myco1: "rgb(70, 157, 137)",
        myco2: "rgb(3, 102, 102)",
        myco3: "rgba(86, 171, 145, 1)",
        myco10: "rgba(20, 116, 111, 1)",
      },

      height: {
        "60": "60px",
        "182": "182px",
        "150": "150px",
        "500": "500px",
      },

      width: {
        "95/100": "95%",
        "150": "150px",
        "340": "340px",
        "380": "380px",
        "315": "315px",
        "140": "140px",
        "custom-75": "75%",
      },

      borderRadius: {
        "40": "40px", // Add your custom corner radius here
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
