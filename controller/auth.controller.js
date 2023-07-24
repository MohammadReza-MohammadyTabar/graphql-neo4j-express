import jwt from "jsonwebtoken"
import error from "../errors/index.js"
import {getDriver} from '../config/noe4j.config.js'
import {StatusCodes} from "http-status-codes";
import {createUser, findUserByUsername} from "../service/auth.service.js";



export async function login(req, res) {
    // const drive = getDriver()
    // const s= drive.session()
    const {password, username} = req.body
    if (!username || !password)
        throw new error.BadRequestError("Please provide username or password");
    const findUser = await findUserByUsername(username)
    // await s.close()

    if (findUser.records.length!==0&&findUser.records[0].get('p').properties.password===password){
        const id=findUser.records.id
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        res.status(StatusCodes.OK).send({msg:'user login',token})
    }else {
        throw new error.UnauthenticatedError("please check credential")
    }

}

export async function signup(req, res) {
    try {
        // const drive = getDriver()
        // const s= drive.session()
        const {password, username} = req.body
        if (!username || !password)
            throw new error.BadRequestError("Please provide username or password");
        const findUser=await findUserByUsername(username)
        if (findUser.records.length===0){
            const user= await createUser(username,password)
            // await s.close()
            res.status(StatusCodes.CREATED).send({"msg": "user Created"})
        }
        else {
            // await s.close()
            throw new error.BadRequestError("user exists!")
        }
    }catch (e){
        res.send(e)
    }
}

export async function auth(req,res){
    res.send('ok')
}
