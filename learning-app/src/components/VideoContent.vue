<template>
    <div
        class="video-content"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <img
            v-show="!isHovered"
            ref="previewImage"
            :src="imageLink"
            :alt="imageAlt"
            :width="width"
            :height="height"
            class="preview-image" />

        <video
            v-show="isHovered"
            ref="video"
            :poster="videoPoster"
            muted
            controls
            :width="width"
            :height="height"
            class="preview-video"></video>
    </div>
</template>

<script>
import Hls from "hls.js";

export default {
    name: "VideoContent",
    components: {},
    props: {
        width: Number,
        height: Number,
        imageLink: String,
        imageAlt: String,
        mouseLeaveProp: String,
        videoLink: {
            type: String,
            default: "/src/assets/videos/loading-preview.webm",
        },
    },
    data() {
        return {
            isHovered: false,
            currentVideoProgress: 0,
            videoPoster: "/src/assets/images/loading-preview.gif",
        };
    },
    methods: {
        updateLocalStorage() {
            localStorage.setItem("videoProgress", this.currentVideoProgress);
        },
    },

    mounted() {
        if (localStorage.getItem("videoProgress")) {
            this.currentVideoProgress = localStorage.getItem("videoProgress");
        }
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
                        video.poster =
                            "/src/assets/images/video-not-found.jpeg";
                        retried = true;
                    }
                }
            });
        }
    },
    watch: {
        async isHovered(newValue) {
            let video = this.$refs["video"];
            let stream = this.videoLink;
            if (!stream || !video) return;

            switch (this.mouseLeaveProp) {
                case "reset":
                    if (newValue) {
                        video.currentTime = 0;
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
                    } else {
                        video.pause();
                    }

                    break;
                case "remember":
                    if (newValue) {
                        video.currentTime = this.currentVideoProgress;
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
                    } else {
                        video.pause();
                        this.currentVideoProgress = video.currentTime;
                    }
                    break;
            }
        },
        currentVideoProgress: {
            handler() {
                this.updateLocalStorage();
            },
        },
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

.video-content {
    .preview-image {
        object-fit: cover;
    }
    .preview-video {
    }
}
</style>
