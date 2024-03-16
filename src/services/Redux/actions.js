import apiRequest from '../Axios/config';

export const setCourses = (courses) => ({
  type: 'SET_COURSES',
  payload: courses
});

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest.get('/courses');
      const courses = response.data;
      dispatch(setCourses(courses));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};