import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    //once we make a request (/posts/123 something like that) '123' is going to fill the value of id 
    const { id: _id } = req.params;

    const post = req.body;
    //we're receiving whole updated post (data) that is going to be sent from the frontend

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });
    //first of all we have to see if a user is even authenticated

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    /* So each like is going to be the id from a spesific person. that's how we're going to know who liked the spesific post.
    */
    if(index === -1){ //only if user's id is not in there only then is this going to be equal to -1. So this is if user wants to like post
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    /*now we're not going update only the likes or the like count we don't have that anymore.
    we're simply going to create a new post. so the post that we had we're going to update it
    because now we have the same old post that now includes the like itself
    */
   
    res.json(updatePost);
}