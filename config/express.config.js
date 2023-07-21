import  express from'express'
import cors from 'cors'
import {graphql} from "../graphql/index.js";
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';

const app=express()
const httpServer = http.createServer(app);
const server=graphql(httpServer)
await server.start()

app.use(cors())
app.use(express.json())
app.use(expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}),)
app.use((req,res,next)=>{
    console.log(`request to ${req.path} request type ${req.method}`)
    next()
})

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);

export default app


