import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
dotenv.config();

export default {
    async generateToken(req, res){
        try {
            const user = await User.findOne({
                accountNumber: req.body.accountNumber,
                identityNumber: req.body.identityNumber
            })
            if(!user){
                return res.json({
                    auth: false,
                    accessToken: null,
                    message: 'invalid account!'
                })
            }
            const token ="Bearer " +jwt.sign(
                {
                    accountNumber: user.accountNumber,
                    identityNumber: user.identityNumber
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: 3600
                },
            );
            return res.status(200).send({
                auth:true,
                accessToken: token,
                message: 'success',

            })
        } catch (e) {
            
        }
    },
    verifyToken(req, res, next){
        let tokenHeader = req.headers['authorization'];
		if (tokenHeader == undefined) {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Token Invalid or Null",
			});
		}

		if (tokenHeader.split(" ")[0] !== "Bearer") {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Incorrect token format",
			});
		}

		let token = tokenHeader.split(" ")[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided",
			});
		}

		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err,
				});
			}
			next();
		});
    }
}