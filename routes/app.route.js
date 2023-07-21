import express from "express"
export const appRouter = express.Router();
import {auth, login, signup} from '../controller/auth.controller.js'


import {authenticationMiddleware} from "../middleware/auth.js"

appRouter.route("/login").post(login);
appRouter.route('/signup').post(signup)
appRouter.route('/auth').get(authenticationMiddleware,auth)
