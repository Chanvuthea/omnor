import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { config } from "dotenv";
import ogPlugin from "vite-plugin-open-graph";
import type { Options } from "vite-plugin-open-graph";

const ogOptions: Options = {
  basic: {
    url: "https://omnor.vercel.app/",
    title: "_lmmmmmm",
    determiner: "auto",
    description: "_lmmmmmm, Front-end Developer.",
    locale: "zh_CN",
    localeAlternate: ["fr_FR", "es_ES"],
  },
};

config();
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), ogPlugin(ogOptions)],

    define: {
      "process.env": process.env,
    },
  };
});
