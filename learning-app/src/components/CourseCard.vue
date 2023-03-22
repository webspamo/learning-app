<template>
    <div class="card">
        <div class="card-content">
            <h4 class="card-title">{{ title }}</h4>

            <CourseTags
                class="card-tags"
                :tags="tags" />

            <div class="card-rating">
                <div>{{ rating }}</div>
            </div>

            <CourseAvailability
                class="card-availability"
                v-if="!containsLockedLessons"
                :availability="availability" />

            <div class="card-text-details">
                <p class="card-description">
                    {{ description }}
                </p>
                <hr />
                <ul class="card-skills">
                    <li
                        class="skill"
                        v-for="(skill, index) in skills"
                        :key="index">
                        {{ skill }}
                    </li>
                </ul>
            </div>

            <div class="card-controls">
                <router-link
                    :to="'/course/' + id"
                    class="card-button button">
                    Enroll now <span>&#8594;</span>
                </router-link>
            </div>
        </div>
        <div class="card-video-content">
            <VideoContent
                :image-link="this.videoPreviewImageLink + '/cover.webp'"
                :image-alt="videoContent.imageAlt"
                :mouse-leave-prop="videoContent.mouseLeaveProp"
                :video-link="this.videoPreviewLink" />
        </div>
    </div>
</template>

<script>
import CourseTags from "./CourseTags.vue";
import CourseAvailability from "./CourseAvailability.vue";
import VideoContent from "./VideoContent.vue";

export default {
    name: "Coursecard",
    components: {
        CourseTags,
        CourseAvailability,
        VideoContent,
    },
    props: {
        id: String,
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
            videoContent: {
                imageAlt: "Course image preview",
                mouseLeaveProp: "reset",
                videoPoster: "https://i.gifer.com/ZZ5H.gif",
            },
        };
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

hr {
    width: 95%;
    margin: 0.5rem 0;
}

.card {
    position: relative;
    height: 340px;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;

    display: flex;
    justify-content: space-between;
    gap: 1rem;

    // @include mixins.below(desktop) {
    //     height: unset;
    //     flex-direction: column;
    // }

    &-content {
        flex-grow: 1;
        align-self: stretch;

        display: flex;
        flex-direction: column;
    }
    &-video-content {
        position: relative;
        min-width: 45%;

        display: flex;
        align-items: center;
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
    .card-availability {
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
        .card-button {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            span {
                font-family: Arial;
            }
        }
    }
}
</style>
