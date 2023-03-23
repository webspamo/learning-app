<template>
    <div
        class="aspect-ratio--16x9"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <div class="aspect-ratio__inner-wrapper">
            <img
                v-show="!isHovered"
                ref="previewImage"
                :src="imageLink"
                :alt="imageAlt"
                class="preview-image" />

            <video
                v-show="isHovered"
                ref="video"
                :poster="videoPoster"
                muted
                controls
                class="video"></video>
        </div>
    </div>
</template>

<script>
import Hls from "hls.js";

export default {
    name: "VideoContent",
    components: {},
    props: {
        materialId: String,
        imageLink: String,
        imageAlt: String,
        onMouseLeaveBehaviour: String,
        videoLink: {
            type: String,
            default: "/src/assets/videos/loading-preview.webm",
        },
    },
    data() {
        return {
            isHovered: false,
            videoPoster: "/src/assets/images/loading-preview.gif",
        };
    },
    methods: {
        preventPlayInterruption(video) {
            let playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise
                    .then((_) => {
                        video.play();
                    })
                    .catch((error) => {
                        video.pause();
                    });
            }
        },
        resetVideo(video) {
            if (!video) return;

            video.currentTime = 0;
            this.preventPlayInterruption(video);
        },
        saveCurrentTime(time) {
            localStorage.setItem(this.materialId, time);
        },
    },

    mounted() {
        if (Hls.isSupported()) {
            let hls = new Hls();
            let stream = this.videoLink;
            let video = this.$refs["video"];

            hls.loadSource(stream);
            hls.attachMedia(video);

            let retried = false;

            hls.on(Hls.Events.ERROR, function (event, data) {
                const errorType = data.type;

                if (errorType === Hls.ErrorTypes.NETWORK_ERROR) {
                    if (!retried) {
                        video.poster = "/src/assets/images/video-not-found.jpeg";
                        retried = true;
                    }
                }
            });
        }
    },
    created() {},
    watch: {
        async isHovered(newValue) {
            let video = this.$refs["video"];
            let stream = this.videoLink;

            if (!stream || !video) return;

            if (newValue) {
                video.currentTime = 0;
                this.preventPlayInterruption(video);

                if (this.onMouseLeaveBehaviour === "remember") {
                    let savedTime = localStorage.getItem(this.materialId);

                    if (savedTime) {
                        video.currentTime = savedTime;
                    }
                }
            }

            if (!newValue) {
                video.pause();

                if (this.onMouseLeaveBehaviour === "remember") {
                    this.saveCurrentTime(video.currentTime);
                }
                return;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

.aspect-ratio--16x9 {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
}

.aspect-ratio__inner-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.preview-image,
.video {
    width: 100%;
    height: 100%;
}
.preview-image {
    object-fit: cover;
}
</style>
