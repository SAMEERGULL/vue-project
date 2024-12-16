import { createRouter, createWebHistory } from "vue-router";
import RegisterComponent from "@/components/Auth/RegisterComponent.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import LoginComponent from "@/components/Auth/LoginComponent.vue";

const routes = [
    { path: '/', name: 'Login', component: LoginComponent},
    { path: '/register', name: 'Register', component: RegisterComponent},
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;