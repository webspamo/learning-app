<template>
    <ul class="tags">
        <li
            class="tag"
            v-for="(tag, index) in tags"
            :key="index">
            {{ tag }}
        </li>
    </ul>
</template>

<script>
export default {
    name: "CourseTags",
    components: {},
    props: {
        tags: Array,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

.tags {
    list-style: none;
    .tag {
        padding: 0.1rem 0.35rem;
        font-family: "Josefin Sans", sans-serif;
        font-weight: 500;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.2);
    }
}
</style>
