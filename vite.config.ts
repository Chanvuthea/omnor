import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { config } from "dotenv";

config();
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": process.env,
    },
    // base: "omnor",
  };
});
