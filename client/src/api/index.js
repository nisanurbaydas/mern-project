import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});
/*It is going to help our middleware. Our middleware can't work without that add something specific to each one of our requests.
This going to happen on each one of our requests, this is going to happen before all of these requests.
We have to send our token back to our backend so that the backend middleware can verify that we are actually logged in.
*/

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts',newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);