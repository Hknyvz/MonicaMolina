import dbConnect from '@/mongoose/dbConnect'
import User from '@/mongoose/models/User';

const handler = async (req,res)=>{
    await dbConnect();
    const {method}=req;

    if(method === "GET"){
        try {
            const users = await User.find();
            console.log(users);
            res.status(200).json(users);
        } catch (error) {
            
        }
    }

    if(method === "POST"){
        try {
            const newUser = await User.create(req.body);
            console.log(newUser);
            res.status(200).json(newUser);
        } catch (error) {
            console.log(error)
        }
    }
}

export default handler;