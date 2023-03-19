<template>
    <div class="item">
        <div class="item-content">
            <h4 class="item-title">{{ title }}</h4>

            <CourseTags
                class="item-tags"
                :tags="tags" />

            <div class="item-rating">
                <div>{{ rating }}</div>
            </div>

            <CourseAvailability
                class="item-availability"
                v-if="!containsLockedLessons"
                :availability="availability" />

            <div class="item-text-details">
                <p class="item-description">
                    {{ description }}
                </p>
                <ul class="item-skills">
                    <li
                        class="skill"
                        v-for="(skill, index) in skills"
                        :key="index">
                        {{ skill }}
                    </li>
                </ul>
            </div>

            <div class="item-controls">
                <button class="item-button button">
                    Enroll now <span>&#8594;</span>
                </button>
            </div>
        </div>

        <div class="item-video-content">
            <img
                src="https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/cover.webp"
                alt=""
                width="516"
                height="290"
                class="item-preview-image" />
            <video
                src=""
                class="item-preview-video"></video>
        </div>
    </div>
</template>

<script>
import CourseTags from "../components/CourseTags.vue";
import CourseAvailability from "./CourseAvailability.vue";

export default {
    name: "CourseItem",
    components: {CourseTags, CourseAvailability},
    props: {
        title: String,
        description: String,
        skills: Object,
        rating: Number,
        containsLockedLessons: Boolean,
        status: String,
        launchDate: String,
        tags: Array,
        videoPreviewLink: String,
        videoPreviewImageLink: String,
    },
    data() {
        return {
            availability: "Free",
        };
    },
    computed: {},
    mounted() {},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

hr {
    width: 100%;
    margin: 0.5rem 0;
}

.item {
    position: relative;
    height: 340px;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;

    display: flex;
    justify-content: space-between;
    gap: 1rem;

    &-content {
        flex-grow: 1;
        align-self: stretch;

        display: flex;
        flex-direction: column;
    }

    &-title {
        font-size: 1.6rem;
    }

    &-tags {
        margin-bottom: 0.5rem;

        display: flex;
        gap: 0.5rem;
    }

    &-rating {
        position: absolute;
        top: -0.9rem;
        right: -1.5rem;
        z-index: 1;
        width: 3.8rem;
        height: 3.5rem;
        padding: 0.4rem 0.9rem;
        font-size: 1.25rem;
        border-radius: 5px;
        background: #252525;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-availability {
        position: absolute;
        top: -1.3rem;
        left: -1.5rem;
        z-index: 1;
    }

    &-text-details {
        overflow-y: auto;
        margin-bottom: 0.5rem;

        &::-webkit-scrollbar {
            width: 10px;
            width: 10px;
        }
        &::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: #dfe9eb20;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #fdc500;
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: #fdd300;
        }

        &-description {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    &-skills {
        list-style-type: circle;
    }

    &-controls {
        margin-top: auto;
        .item-button {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            span {
                font-family: Arial;
            }
        }
    }

    .item-video-content {
        .item-preview-image {
            object-fit: cover;
        }
        .item-preview-video {
            display: none;
        }
    }
}
</style>
