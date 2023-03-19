<template>
    <main>
        <div class="section">
            <div class="container course-container">
                <div
                    v-if="course"
                    class="course-wrapper">
                    <aside class="course-aside">
                        <nav class="lessons-list">
                            <a
                                href=""
                                class="lesson"
                                v-for="(lesson, index) in course.lessons"
                                :key="index">
                                <div class="lesson-content">
                                    <div class="lesson-title">
                                        {{ lesson.title }}
                                    </div>
                                </div>

                                <CourseAvailability
                                    class="lesson-availability"
                                    v-if="lesson.status === 'locked'"
                                    v-html="availability" />
                            </a>
                        </nav>
                    </aside>

                    <div class="course">
                        <div class="course-header">
                            <div class="title-cover">
                                <h1 class="course-title">
                                    {{ course.title }}
                                </h1>
                                <div class="course-launch-date">
                                    <span>Course-start</span>
                                    <hr />
                                    <span>
                                        {{
                                            convertDate(course.launchDate)
                                        }}</span
                                    >
                                </div>
                            </div>

                            <CourseTags
                                class="course-tags"
                                :tags="course.tags" />
                        </div>
                    </div>
                </div>
                <div v-else>Empty</div>
            </div>
        </div>
    </main>
</template>

<script>
import {getCourse} from "@/api/courses.js";

import CourseTags from "../components/CourseTags.vue";
import CourseAvailability from "../components/CourseAvailability.vue";

export default {
    name: "CoursePage",
    components: {CourseTags, CourseAvailability},
    props: {
        //courseId: String,
    },
    data() {
        return {
            courseId: "352be3c6-848b-4c19-9e7d-54fe68fef183",
            course: null,
            availability: `&#128274;`,
        };
    },
    computed: {},
    methods: {
        convertDate(isoFormat) {
            return new Date(isoFormat).toDateString();
        },
        async updateCourse() {
            try {
                const course = await getCourse(this.courseId);
                this.course = course.adata;
                console.log(this.course); //demonstration purpose
            } catch (err) {
                console.log(err);
                this.course = null;
            }
        },
    },
    mounted() {
        this.updateCourse();
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";
.course-container {
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.75);

    display: flex;
    gap: 3rem;
}

.course-wrapper {
}

.course-aside {
    padding: 0.5rem;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
}
.lessons-list {
    display: flex;
    flex-direction: column;
}
.lesson {
    padding: 0.7rem;
    border-left: 6px solid transparent;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.7rem;

    &:hover {
        border-left: 6px solid #fdc500;
        background: rgba(0, 0, 0, 0.2);
    }

    &-title {
    }

    &-content {
    }

    &-availability {
        padding: 0.1rem 0.5rem;
        background: rgba(255, 255, 255, 0.2);
    }
}
.course {
    flex-grow: 1;

    &-header {
    }
    .title-cover {
        display: flex;
        .course-title {
            flex-grow: 1;
        }
    }

    &-tags {
        display: flex;
    }
}
.course-launch-date {
    text-align: right;
    color: rgb(255, 255, 255);
    padding: 0.4rem 0.9rem;
    font-size: 1.25rem;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
}
</style>
