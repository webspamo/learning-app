<template>
    <div class="availability">{{ availability }}</div>
</template>

<script>
export default {
    name: "CourseAvailability",
    components: {},
    props: {
        availability: String,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";

.availability {
    padding: 0.4rem 0.9rem;
    font-size: 1.25rem;
    color: #252525;
    font-weight: 500;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.9);
}
</style>
