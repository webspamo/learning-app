import axios from "axios";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0.Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM";
axios.defaults.headers.Authorization = `Bearer ${token}`;
axios.defaults.baseURL = `http://localhost:5173/api/v1`;

export async function getCourses() {
    return await axios.get("/core/preview-courses");
}
export async function getCourse(courseId) {
    return await axios.get(`/core/preview-courses/${courseId}`);
}
