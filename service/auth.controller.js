import {getDriver} from "../config/noe4j.config.js";


export const findUserByUsername=async (username,session)=> {
    try{

        const user= session.executeRead(tx => tx.run(
            'MATCH (p:Person  {username:$username}) RETURN p', {username}
        ))

        return user
    }catch (e){
        throw e
    }
}

export const createUser=async (username,password,session)=>{
    try{

         const user =s.executeWrite(tx => tx.run(
            'CREATE (p:Person {username:$username,password:$password}) RETURN p', {username,password}
        ))
        await s.close()
        return user
    }catch (e){

    }
}
