import "express-async-errors";
import app from "./config/express.config.js"
import {notFoundMiddleware} from "./middleware/not-found.js";
import {appRouter} from  './routes/app.route.js'
import {errorHandlerMiddleware} from './middleware/error-handler.js'
import {initDriver} from "./config/noe4j.config.js";
import {neoUser, neoPass, noeUrl, port} from "./config/configs.config.js"



const server =async ()=>{
    try {
        await initDriver(noeUrl,neoUser,neoPass)
        app.listen(port,()=>{
           console.log(`listening on port ${port}`)

       })
    }catch (e) {

        console.log(e)
    }
}
server()
app.use(appRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);
