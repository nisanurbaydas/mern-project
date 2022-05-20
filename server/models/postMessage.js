import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String], //the array of ids (the array of the likes)
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//turn to schema into a model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;