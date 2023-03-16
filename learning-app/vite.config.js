import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://api.wisey.app",
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/api/, ''),
                //rewrite option is used to remove the /api prefix from the request path, so that it matches the API server's expected route.
            },
        },
    },
});
