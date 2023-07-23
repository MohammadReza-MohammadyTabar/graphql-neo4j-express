import app from '../config/express.config.js'
import {config} from 'dotenv'
import {port} from "../config/configs.config.js";

describe('express configs', () => {
    beforeAll(() => config())

    it('Should defined environment ', () => {
        const {
            PORT
        } = process.env
        expect(PORT).toBeDefined()
        app.listen(port, () => {
           return 'ok'
        })
    })


})
