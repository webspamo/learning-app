<template>
    <main>
        <div class="section">
            <div class="container">
                <div class="course-container">
                    <template v-if="urlLessonId && lesson">
                        <router-link
                            :to="'/course/' + course.id"
                            class="back-button button">
                            <span>&#8592;</span> Back to Course
                        </router-link>

                        <div class="lesson">
                            <h1 class="lesson-title">
                                {{ lesson.title }}
                            </h1>
                            <VideoContent
                                :image-link="`${lesson.previewImageLink}/lesson-${lesson.order}.webp`"
                                :image-alt="videoContent.lessonImageAlt"
                                :mouse-leave-prop="videoContent.mouseLeaveProp"
                                :video-link="lesson.link" />
                        </div>
                    </template>

                    <template v-else>
                        <router-link
                            to="/courses"
                            class="back-button button">
                            <span>&#8592;</span> All Courses
                        </router-link>

                        <div
                            v-if="course"
                            class="course-wrapper">
                            <aside class="course-aside">
                                <nav class="lessons-list">
                                    <router-link
                                        :to="
                                            '/course/' +
                                            course.id +
                                            '/' +
                                            lesson.id
                                        "
                                        class="lesson-item"
                                        v-for="(
                                            lesson, index
                                        ) in course.lessons"
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
                                    </router-link>
                                </nav>
                            </aside>

                            <div class="course">
                                <div class="course-header">
                                    <div class="course-header-details">
                                        <h1 class="course-title">
                                            {{ course.title }}
                                        </h1>

                                        <CourseTags
                                            class="course-tags"
                                            :tags="course.tags" />
                                    </div>
                                    <div class="course-header-launch-date">
                                        <span>Course-start</span>
                                        <hr />
                                        <span>
                                            {{ convertDate(course.launchDate) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="video-content">
                                    <VideoContent
                                        :image-link="
                                            this.courseImagePreviewLink
                                        "
                                        :image-alt="videoContent.courseImageAlt"
                                        :mouse-leave-prop="
                                            videoContent.mouseLeaveProp
                                        "
                                        :video-link="
                                            this.courseVideoPreviewLink
                                        " />
                                </div>
                            </div>
                        </div>
                        <div v-else>Empty</div>
                    </template>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {getCourse} from "@/api/courses.js";

import VideoContent from "../components/VideoContent.vue";
import CourseTags from "../components/CourseTags.vue";
import CourseAvailability from "../components/CourseAvailability.vue";

export default {
    name: "CoursePage",
    components: {
        CourseTags,
        CourseAvailability,
        VideoContent,
    },
    props: {},
    data() {
        return {
            course: null,
            availability: `&#128274;`,
            videoContent: {
                courseImageAlt: "Course image preview",
                lessonImageAlt: "Lesson image preview",
                mouseLeaveProp: "remember",
            },
        };
    },
    computed: {
        courseImagePreviewLink() {
            return this.course?.previewImageLink + "/cover.webp";
        },
        courseVideoPreviewLink() {
            return this.course?.meta?.courseVideoPreview?.link;
        },
        urlLessonId() {
            return this.$route.params.lessonId;
        },
        urlCourseId() {
            return this.$route.params.courseId;
        },
        lesson() {
            if (!this.course) return null;

            return this.course.lessons.find(
                (lesson) => lesson.id === this.urlLessonId
            );
        },
    },
    methods: {
        convertDate(isoFormat) {
            return new Date(isoFormat).toDateString();
        },
        async updateCourse() {
            try {
                const course = await getCourse(this.urlCourseId);
                this.course = course.data;
            } catch (err) {
                console.log(err);
                this.course = null;
            }
        },
    },
    created() {},
    async mounted() {
        await this.updateCourse();
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

.section {
    .container:first-child {
        position: relative; //back-to button
    }
}

.course-container {
    padding: 2rem;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.75);
}

.lesson {
    &-title {
        margin-bottom: 1.5rem;
    }
}

.course-wrapper {
    display: flex;
    gap: 3rem;
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
.lesson-item {
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
        margin-bottom: 1.5rem;

        display: flex;
        justify-content: space-between;
    }
    .title-cover {
        display: flex;
        .course-title {
            flex-grow: 1;
        }
    }

    .course-header-launch-date {
        align-self: flex-start;

        padding: 0.4rem 0.9rem;
        min-width: 138px;
        text-align: right;
        white-space: nowrap; // above 1200px $desktop
        color: rgb(255, 255, 255);
        font-size: 1.25rem;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.3);

        display: flex;
        flex-direction: column;
    }

    &-tags {
        display: flex;
    }
}

.video-content {
    position: relative;
}

.back-button {
    position: absolute;
    top: -2.5rem;
    left: 2rem;
    vertical-align: center;
    transform: translateY(-50%);

    display: inline-flex;
    //align-items: center;
    gap: 0.3rem;

    span {
        font-family: Arial;
    }
}

// @include mixins.below(desktop) {
//     height: unset;
//     flex-direction: column;
// }
</style>
