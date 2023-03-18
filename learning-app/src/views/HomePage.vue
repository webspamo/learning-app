<template>
    <main>
        <div class="section">
            <div class="container">
                <h1>Hello World</h1>
                <hr />
                <div class="courses">
                    <CourseItem
                        v-for="course in pageItems"
                        :key="course.id"
                        :title="course.title"
                        :description="course.description"
                        :skills="course.meta && course.meta.skills"
                        :rating="course.rating"
                        :status="course.status"
                        :launch-date="
                            course.status === 'launched'
                                ? course.launchDate
                                : null
                        "
                        :tags="course.tags"
                        :video-preview-link="
                            course.meta &&
                            course.meta.courseVideoPreview &&
                            course.meta.courseVideoPreview.link
                        "
                        :video-preview-image-link="
                            course.previewImageLink && course.previewImageLink
                        ">
                    </CourseItem>
                </div>
                <div class="pagination-toolbar">
                    <div class="button-pages">
                        <button
                            v-for="(page, index) in pages"
                            :key="index"
                            @click.prevent="currentPage = page">
                            {{ page }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {getCourses} from "@/api/courses.js";

import CourseItem from "../components/CourseItem.vue";

export default {
    name: "HomePage",
    components: {CourseItem},
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
                console.log(this.courses); //demonstration purpose
                console.log(this.courses.map((e) => e.meta)); //demonstration purpose
            } catch (err) {
                console.log(err);
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

.courses {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}
</style>
