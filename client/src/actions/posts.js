import * as api from '../api';

//Action Creators ara function that return an action

//payload is usually the data where we store all of our posts
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data });
        //instead of return with redux we dispatch the action
    } catch (error) {
        console.log(error.message);
    }
}
/*
We're working with asynchronous data to acctually fetch all the posts
sometime is gonna have to pass and for that we have to use redux thunk.
Redux thunk allows us to in here specify an additional arrow function.
*/ 

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch ({ type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}