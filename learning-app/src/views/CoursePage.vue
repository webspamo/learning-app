<template>
    <main>
        <div class="section">
            <div class="container course-container">
                <template v-if="urlLessonId && lesson">
                    lesson {{ lesson }}
                </template>
                <template v-else>
                    <div
                        v-if="course"
                        class="course-wrapper">
                        <aside class="course-aside">
                            <nav class="lessons-list">
                                <router-link
                                    :to="
                                        '/course/' + course.id + '/' + lesson.id
                                    "
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
                                </router-link>
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
                                            {{ convertDate(course.launchDate) }}
                                        </span>
                                    </div>
                                </div>

                                <CourseTags
                                    class="course-tags"
                                    :tags="course.tags" />
                            </div>

                            <div
                                class="item-video-content"
                                @mouseenter="isHovered = true"
                                @mouseleave="isHovered = false">
                                <img
                                    v-show="!isHovered"
                                    :src="
                                        course.previewImageLink + '/cover.webp'
                                    "
                                    alt=""
                                    width="516"
                                    height="290"
                                    class="item-preview-image" />
                                <video
                                    v-show="isHovered"
                                    ref="video"
                                    poster="https://i.gifer.com/ZZ5H.gif"
                                    muted
                                    controls
                                    width="516"
                                    height="290"
                                    class="item-preview-video"></video>
                            </div>
                        </div>
                    </div>
                    <div v-else>Empty</div>
                </template>
            </div>
        </div>
    </main>
</template>

<script>
import {getCourse} from "@/api/courses.js";
import Hls from "hls.js";

import CourseTags from "../components/CourseTags.vue";
import CourseAvailability from "../components/CourseAvailability.vue";

export default {
    name: "CoursePage",
    components: {CourseTags, CourseAvailability},
    props: {},
    data() {
        return {
            // courseId: null,
            // lessonId: null,

            course: null,
            availability: `&#128274;`,
            isHovered: false,
        };
    },
    computed: {
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

            return this.course.lessons.find((e) => e.id === this.urlLessonId);
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
    created() {
        // this.courseId = this.$route.params.courseId;
    },
    async mounted() {
        await this.updateCourse();

        if (Hls.isSupported()) {
            let hls = new Hls();
            let stream = this.courseVideoPreviewLink;
            let video = this.$refs["video"];

            hls.loadSource(stream);
            hls.attachMedia(video);
        }
    },
    watch: {
        async isHovered(newValue) {
            let video = this.$refs["video"];
            let stream = this.courseVideoPreviewLink;
            if (!video || !stream) return;

            if (newValue) {
                video.currentTime = 0;
                video.play();
            } else {
                video.pause();
            }
        },
        // $route (newValue) {
        //     const route =
        // }
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";
.course-container {
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.75);
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
        margin-bottom: 1.5rem;
    }
    .title-cover {
        display: flex;
        .course-title {
            flex-grow: 1;
        }
    }

    .course-launch-date {
        padding: 0.4rem 0.9rem;
        min-width: 138px;
        text-align: right;
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

.item-video-content {
    .item-preview-image {
        object-fit: cover;
    }
    .item-preview-video {
    }
}
</style>
