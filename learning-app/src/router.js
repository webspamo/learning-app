import {createRouter, createWebHashHistory} from "vue-router";

import CoursesPage from "@/views/CoursesPage.vue";
import CoursePage from "@/views/CoursePage.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: CoursesPage,
        },
        {
            path: "/course/:courseId/:lessonId?",
            component: CoursePage,
        },
    ],
});
