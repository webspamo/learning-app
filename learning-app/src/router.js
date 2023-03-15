import {createRouter, createWebHashHistory} from "vue-router";

import HomePage from "@/views/HomePage.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
        },
    ],
});
