import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try { // have to see if user is really show she/he is claiming to be
        const token = req.headers.authorization.split(" ")[1]; //get token from the frontend
        const isCustomAuth = token.length < 500;
        //if it is greater than 500 it means it is google's token

        let decodedData; //that is the data that we want to get from the token itself

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            //this going to give us the data from each spesific token it's going to give us the username of the person and its id

            req.userId = decodedData?.id;
        } else { // If we're working with the google oauth
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            //sub is simply google's name for a spesific id that differantiates every single google user.
            //basically it's an id that we can differentiate the users with
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;