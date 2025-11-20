import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { config } from "dotenv";
import ogPlugin from "vite-plugin-open-graph";
import type { Options } from "vite-plugin-open-graph";

const ogOptions: Options = {
  basic: {
    url: "https://omnor.vercel.app/?ivnaim_so_eng20251228",
    title: "សិរីមង្គលអាពាហ៍ពិពាហ៍",
    determiner: "auto",
    description:
      "សូមគោរពអញ្ជើញ ឯកឧត្ដម អ្នកឧកញ៉ា លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតីយភាព និងជាភ្ញៀវកិត្តិយស ក្នុងកម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ។",
    locale: "zh_CN",
    localeAlternate: ["fr_FR", "es_ES"],
    type: "website",
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
