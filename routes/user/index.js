import express from 'express';
import userController from '../../controllers/userController.js';
import authJwt from "../../middlewares/authJwt.js";
const route = express.Router();

// route.get('/', (req, res) => {
//     res.status(200).send({ message: 'user home'})
// })
route.get('/', [authJwt.verifyToken], userController.getAll);
route.get('/account-number/:accountNumber', [authJwt.verifyToken], userController.getByAccountNumber);
route.get('/identity-number/:identityNumber', [authJwt.verifyToken], userController.getByIdentityNumber);
route.post('/', userController.create);
route.put('/:userName',[authJwt.verifyToken], userController.update);
route.delete('/:userName',[authJwt.verifyToken], userController.delete);

export default route;