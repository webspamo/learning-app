<template>
    <main>
        <div class="section">
            <div class="container">
                <h1>Hello World</h1>
                <hr />

                <div class="courses">
                    <CourseCard
                        v-for="course in pageItems"
                        :key="course.id"
                        :id="course.id"
                        :title="course.title"
                        :description="course.description"
                        :skills="course.meta?.skills"
                        :rating="course.rating"
                        :contains-locked-lessons="course.containsLockedLessons"
                        :status="course.status"
                        :launch-date="
                            course.status === 'launched'
                                ? course.launchDate
                                : null
                        "
                        :tags="course.tags"
                        :video-preview-link="
                            course.meta?.courseVideoPreview?.link
                        "
                        :video-preview-image-link="
                            course.previewImageLink && course.previewImageLink
                        ">
                    </CourseCard>

                    <div v-if="!courses.length">Empty</div>
                </div>

                <div class="pagination-toolbar">
                    <button
                        class="button"
                        :class="page == currentPage ? 'button-active' : ''"
                        v-for="(page, index) in pages"
                        :key="index"
                        @click.prevent="currentPage = page">
                        {{ page }}
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {getCourses} from "@/api/courses.js";

import CourseCard from "../components/CourseCard.vue";

export default {
    name: "CoursesPage",
    components: {CourseCard},
    data() {
        return {
            courses: [],
            itemsPerPage: 10,
            currentPage: 1,
        };
    },
    computed: {
        pageItems() {
            for (
                let i =
                    this.currentPage * this.itemsPerPage - this.itemsPerPage;
                i < this.courses.length;
                i += this.itemsPerPage
            ) {
                return this.courses.slice(i, i + this.itemsPerPage);
            }
        },
        pages() {
            return Math.ceil(this.courses.length / this.itemsPerPage);
        },
    },
    methods: {
        async updateCourses() {
            try {
                const courses = await getCourses();
                this.courses = courses.data.courses;
            } catch (err) {
                console.log(err);
                this.courses = [];
            }
        },
    },
    mounted() {
        this.updateCourses();
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

hr {
    margin-bottom: 3rem;
}
.courses {
    margin-bottom: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.pagination-toolbar {
    display: flex;
    gap: 0.3125rem;
}
</style>
