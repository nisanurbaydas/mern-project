import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req, res) => {
    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({email});
        //that means we're searching for the existing user in the db
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        //we can't simply do a normal string check cause before or rather later when we  implement the bcrypt

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credential." })
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        /*if the user already exists in the db and the password is correct 
          then we can finally get users jwt that we need to the send to the frontend
        */
    } catch(error) {
        res.status(500).json({ message: "Something went wrong."});
    }
}

export const signup = async(req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exist."})

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12)
        //before we create the user though we have to hash the password. we don't wanna store it in a plain text

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}