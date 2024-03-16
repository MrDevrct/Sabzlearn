import Home from './pages/home';
import Search from './pages/search';
import NotFound from './pages/notFound';
import Courses from './pages/courses';
import Course from './pages/course';
import Category from './pages/category';
import Articls from './pages/articls'
import Login from './pages/login'

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
        path: '/*',
        component: NotFound
    },
    {
        name: 'Course',
        path: '/course/:courseName',
        component: Course
    },
    {
        name: 'Courses',
        path: '/courses/',
        component: Courses
    },
    {
        name: 'Category',
        path: '/category/:categoryName',
        component: Category
    },
    {
        name: 'Articls',
        path: '/articls',
        component: Articls
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    }
]

export default router