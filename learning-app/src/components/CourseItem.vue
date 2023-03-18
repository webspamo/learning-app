<template>
    <div class="item">
        <div class="item-content">
            <h4 class="item-title">
                {{ title }}
            </h4>
            <ul class="item-tags">
                <li
                    class="tag"
                    v-for="(tag, index) in tags"
                    :key="index">
                    {{ tag }}
                </li>
            </ul>
            <div class="item-rating-wrapper">
                <div class="rating">{{ rating }}</div>
            </div>

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
                <button class="item-more-button button">More &#8594;</button>
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
export default {
    name: "CourseItem",
    components: {},
    props: {
        title: String,
        description: String,
        skills: Object,
        rating: Number,
        status: String,
        launchDate: String,
        tags: Array,
        videoPreviewLink: String,
        videoPreviewImageLink: String,
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
};
</script>

<style lang="scss">
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
        & > :not(:first-child, :last-child) {
            margin-bottom: 0.5rem;
        }
    }

    &-title {
        //min-height: 3em;
        font-size: 1.6rem;
        //line-height: 1.5;
    }
    &-tags {
        list-style: none;

        display: flex;
        .tag {
            padding: 0.1rem 0.35rem;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.2);
        }
    }
    &-rating-wrapper {
        position: absolute;
        top: -1.3rem;
        right: -1.5rem;
        z-index: 1;
        width: 4.0625rem;
        height: 3.4375rem;
        padding: 0.8rem 1.3rem;
        font-size: 1.25rem;
        border-radius: 5px;
        background: #252525;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-text-details {
        overflow-y: auto;

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

    &-controls {
        margin-top: auto;
    }

    .item-video-content {
        //flex-grow: 1;
        max-width: 45%;

        // display: flex;
        // flex-direction: column;
        // justify-content: center;

        &-preview-image {
            object-fit: cover;
        }
        &-preview-video {
            display: none;
        }
    }
}
</style>
