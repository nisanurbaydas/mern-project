import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        //log in the user..

        navigate.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        //sign up the user..

        navigate.push('/');
    } catch (error) {
        console.log(error);
    }
}