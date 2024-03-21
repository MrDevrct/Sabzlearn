import Home from './pages/home';
import Search from './pages/search';
import NotFound from './pages/notFound';
import Courses from './pages/courses';
import courseInfo from './pages/courseInfo';
import courseParts from './pages/courseParts';
import Categories from './pages/categories';
import Articles from './pages/articles';
import Login from './pages/login';
import Register from './pages/register';

const router = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Search',
        path: '/courses/search',  
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
        path: '/lesson/:courseParts',
        component: courseParts
    },
    {
        name: 'Courses',
        path: '/courses/',
        component: Courses
    },
    {
        name: 'Category',
        path: '/category/:categoryName',
        component: Categories
    },
    {
        name: 'Articles',
        path: '/articles',
        component: Articles
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