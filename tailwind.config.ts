import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      colors: {
        soma: {
          green: "#5ebc44",
          leaf: "#4d9b39",
          lime: "#8dd66c",
          cream: "#f8f3e8",
          mango: "#ffb347",
          berry: "#ea5f78",
          cocoa: "#7b4b2a",
          mint: "#dff6d4"
        }
      },
      boxShadow: {
        card: "0 16px 40px rgba(28, 77, 37, 0.12)",
        soft: "0 10px 30px rgba(50, 95, 43, 0.10)"
      },
      borderRadius: {
        blob: "2rem"
      },
      backgroundImage: {
        "soma-radial":
          "radial-gradient(circle at top left, rgba(141,214,108,0.3), transparent 40%), radial-gradient(circle at top right, rgba(255,179,71,0.18), transparent 35%), radial-gradient(circle at bottom, rgba(234,95,120,0.12), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
