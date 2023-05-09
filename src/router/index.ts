// Composables
import Home from '@/views/Home.vue'
import Signin from '@/views/Signin.vue'
import VideoBrowser from '@/views/VideoBrowser.vue'
import Video from '@/views/Video.vue'
import NotFound from '@/views/NotFound.vue'
import Profile from '@/views/Profile.vue'
import Timetable from '@/views/Timetable.vue'
import NewComments from '@/views/NewComments.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { RectureApi } from '@/api/RectureApi'
import SignUpTeacherVue from '@/views/SignUpTeacher.vue'
import SignUpStudentVue from '@/views/SignUpStudent.vue'
import SignUpSelectVue from '@/views/SignUpSelect.vue'
import RequestPasswordReset from '@/views/RequestPasswordReset.vue'
import PasswordReset from '@/views/PasswordReset.vue'

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                name: 'videoBrowser',
                component: VideoBrowser,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/videos/:id',
        component: Home,
        children: [
            {
                path: '',
                component: Video,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/profile/:userId?',
        component: Home,
        children: [
            {
                path: '',
                name: 'profile',
                component: Profile,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/newcomments',
        component: Home,
        children: [
            {
                path: '',
                component: NewComments,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/timetable',
        component: Home,
        children: [
            {
                path: '',
                component: Timetable,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: "/signin",
        name: "signin",
        component: Signin,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            lastSuccessfulAuthCheckTimestamp = 0;
        }
    },
    {
        path: "/signup/select",
        name: "signup_select",
        component: SignUpSelectVue,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            lastSuccessfulAuthCheckTimestamp = 0;
        }
    },
    {
        path: "/signup/teacher",
        name: "signup_teacher",
        component: SignUpTeacherVue,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            lastSuccessfulAuthCheckTimestamp = 0;
        }
    },
    {
        path: "/signup/student",
        name: "signup_student",
        component: SignUpStudentVue,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            lastSuccessfulAuthCheckTimestamp = 0;
        }
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
        meta: { requiresAuth: false }
    },
    {
        path: "/reset",
        name: "request_password_reset",
        component: RequestPasswordReset,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            lastSuccessfulAuthCheckTimestamp = 0;
        }
    },
    {
        path: "/reset/:code",
        name: "reset_password",
        component: PasswordReset,
        meta: { requiresAuth: false },
        beforeEnter: () => {
            lastSuccessfulAuthCheckTimestamp = 0;
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

//TODO: Maybe store in localstorage?
let lastSuccessfulAuthCheckTimestamp = 0;

router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth) {
        //TODO: Verify that this works in every possible scenario
        const timestamp = Date.now();
        if (timestamp - lastSuccessfulAuthCheckTimestamp < 60000 && from.meta.requiresAuth === true) return;

        try {
            const result = await RectureApi.validateAuthentication();
            if (result.success) lastSuccessfulAuthCheckTimestamp = timestamp;
            else return { name: "signin" };
        } catch (e) {
            return { name: "signin" };
        }
    }
});

export default router