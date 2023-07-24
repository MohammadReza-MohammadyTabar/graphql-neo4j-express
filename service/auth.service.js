import {getDriver} from "../config/noe4j.config.js";


export const findUserByUsername=async (username)=> {
    try{
        const drive = getDriver()
        const session= drive.session()
        const user= session.executeRead(tx => tx.run(
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
        const drive = getDriver()
        const session= drive.session()
         const user =session.executeWrite(tx => tx.run(
            'CREATE (p:Person {username:$username,password:$password}) RETURN p', {username,password}
        ))
        await session.close()
        return user
    }catch (e){

    }
}
