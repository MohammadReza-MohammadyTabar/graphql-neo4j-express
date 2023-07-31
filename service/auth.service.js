import {getSession} from "../config/noe4j.config.js";


export const findUserByUsername=async (username)=> {
    try{

        const session= getSession()
        const user=await session.executeRead(tx => tx.run(
            'MATCH (p:Person  {username:$username}) RETURN p', {username}
        ))
        session.close()
        return user
    }catch (e){
        throw e
    }
}

export const createUser=async (username,password)=>{
    try{

        const session= getSession()
         const user =session.executeWrite(tx => tx.run(
            'CREATE (p:Person {username:$username,password:$password}) RETURN p', {username,password}
        ))
        session.close()
        return user
    }catch (e){

    }
}
