<template>
    <main>
        <div class="section">
            <div class="container">
                <h1>Hello World</h1>
                <hr />
                <div class="courses">
                    <CourseItem
                        v-for="course in courses"
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
        };
    },
    computed: {},
    methods: {
        async updateCourses() {
            try {
                const courses = await getCourses();
                this.courses = courses.data.courses;
                console.log(this.courses);
                console.log(this.courses.map((e) => e.meta));
                console.log(this.courses[0].meta.skills);
                console.log(this.courses[1].meta.courseVideoPreview);
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
