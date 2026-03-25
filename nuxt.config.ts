// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15", // Nuxt 4 compatibility
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: "cloudflare_module", // Essential for Cloudflare Workers
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  modules: ["nitro-cloudflare-dev", "@nuxt/icon"],
});
