import "express-async-errors";
import app from "./config/express.config.js"
import {notFoundMiddleware} from "./middleware/not-found.js";
import {appRouter} from  './routes/app.route.js'
import {errorHandlerMiddleware} from './middleware/error-handler.js'
import {initDriver} from "./config/noe4j.config.js";
import {neoUser, neoPass, noeUrl, port} from "./config/configs.config.js"
import {expressMiddleware} from "@apollo/server/express4";
import {authenticationMiddleware} from "./middleware/auth.js";


app.use(appRouter)
await initDriver(noeUrl,neoUser,neoPass)
const server =async ()=>{
    try {
        app.listen(port,()=>{
           console.log(`🚀 Server ready at http://localhost:${port}`)

       })
    }catch (e) {

        console.log(e)
    }
}

server()
import {getGraphQLServer} from "./graphql/index.js";
let graphQLServer=await getGraphQLServer()
await graphQLServer.start()

app.use(authenticationMiddleware,expressMiddleware(graphQLServer, {
    context: async ({ req }) => ({ token: req.headers.token }),
}),)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);
