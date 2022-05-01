import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";

import Post from "./Post/Post";

import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    /*
    Accept the setCurrentId as prop and send it to the Post component.
    We're basically continuing sending the same prop over and over again to the most child component.
    And this is called as "props drilling".
    */
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    
    return(
        //if there is no post that length than return loading sphere
        !posts.length ? <CircularProgress /> :(
            //Grid of our posts
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;