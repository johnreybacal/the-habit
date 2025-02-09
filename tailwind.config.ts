import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export const themes = [
  "light",
  "dark",
  "retro",
  "cyberpunk",
  "valentine",
  "pastel",
];

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes,
  },
} satisfies Config;
