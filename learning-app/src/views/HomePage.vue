<template>
    <main>
        <div class="section">
            <div class="container">
                <h1>Hello World</h1>
                <CourseItem> </CourseItem>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0.Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM";

import CourseItem from "../components/CourseItem.vue";

export default {
    name: "HomePage",
    components: {CourseItem},
    data() {
        return {
            apiCourses: null,
        };
    },
    computed: {},
    mounted() {
        axios
            .get("http://localhost:5173/api/v1/core/preview-courses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                this.apiCourses = response.data;
                console.log(this.apiCourses); //demonstration purpose
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/_mixins";
</style>
