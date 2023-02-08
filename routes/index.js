import express from 'express';
import userRoute from './user/index.js'
import authJwt from "../middlewares/authJwt.js"
const route = express.Router();



route.get('/', (req, res) => {
    res.status(200).send({ message: 'OK' });
})
route.post('/generate-token',authJwt.generateToken);
route.use('/user',userRoute);
export default route;