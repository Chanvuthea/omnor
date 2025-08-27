import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "process.env.VITE_IMAGE_URL": JSON.stringify(env.VITE_IMAGE_URL),
      "process.env.VITE_TOKEN": JSON.stringify(env.VITE_TOKEN),
    },
    // base: "omnor",
  };
});
