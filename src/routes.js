import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Search from './pages/search';
import NotFound from './pages/notFound';
import Courses from './pages/courses';
import courseInfo from './pages/courseInfo';
import Lesson from './pages/lesson';
import Categories from './pages/categories';
import Articles from './pages/articles';
import Teacher from './pages/teacher';
import Login from './pages/login';
import Register from './pages/register';

const router = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Dashboard',
        path: '/my-account/',
        component: Dashboard
    },
    {
        name: 'Dashboard',
        path: '/my-account/:value',
        component: Dashboard
    },
    {
        name: 'Search',
        path: '/courses/:search',  
        component: Search
    },
    {
        name: 'NotFound',
        path: '*',
        component: NotFound
    },
    {
        name: 'Course-Info',
        path: '/course/:courseName',
        component: courseInfo
    },
    {
        name: 'Course-Parts',
        path: '/lesson/:courseInfo',
        component: Lesson
    },
    {
        name: 'Courses',
        path: '/courses/',
        component: Courses
    },
    {
        name: 'Category',
        path: '/category/:categoryName/',
        component: Categories
    },
    {
        name: 'Articles',
        path: '/articles',
        component: Articles
    },
    {
        name: 'Teacher',
        path: '/teacher/:teacherName',
        component: Teacher
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'Signup',
        path: '/register',
        component: Register
    }
]

export default router