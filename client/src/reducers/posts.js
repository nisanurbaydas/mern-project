//in reducers the state always needs to be equal to something
//that's why we have to set this initial value
//posts are going to be an array and that's why we're specifying this empty array there
export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            //we have to sprea all the posts that we have
            /*and the new post. that new post is stored in the
            action.payload*/
            return [...posts, action.payload];
        default:
            return posts;
    }
}