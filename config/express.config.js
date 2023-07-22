import  express from'express'
import cors from 'cors'

const app=express()
app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(`request to ${req.path} request type ${req.method}`)
    next()
})

export default app


