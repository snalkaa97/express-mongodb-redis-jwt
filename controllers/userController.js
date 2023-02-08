import User from '../models/userModel.js'
// import Redis from 'ioredis'


//REDIS LOCAL

let redisClient
import redis from 'redis';
(async () => {
	redisClient = redis.createClient();

	redisClient.on("error", (error) => console.error(`Error : ${error}`));

	await redisClient.connect();
})();



export default {
    async getAll(req, res) {
        try{
            let isCached = false;
            const cachedData = JSON.parse(await redisClient.get("users:all"))
            const users = cachedData ?? await User.find();
            (cachedData) ? isCached = true : await redisClient.set("users:all", JSON.stringify(users));
            const result = {
                status: "success",
                title: 'get all users',
                isCached: isCached,
                count: users.length,
                data: users,
                errors:null
            }
            res.status(200).send(result);
        } catch(e){
            console.log(e);
            res.json({error: e});
        }
    },
    async getByAccountNumber(req, res) {
        try{
            const user = await User.findOne({
                accountNumber: req.params.accountNumber
            });
            if(!user){
                return res.json({
                    message: 'user not found',
                })
            }
            const result = {
                status: "success",
                title: 'get user by account number',
                data: user,
                errors:null
            }
            res.status(200).send(result);
        } catch(e){
            console.log(e);
            res.json({error: e});
        }
    },
    async getByIdentityNumber(req, res) {
        try{
            const user = await User.findOne({
                identityNumber: req.params.identityNumber
            });
            if(!user){
                return res.json({
                    message: 'user not found',
                })
            }
            const result = {
                status: "success",
                title: 'get user by identity number',
                data: user,
                errors:null
            }
            res.status(200).send(result);
        } catch(e){
            console.log(e);
            res.json({error: e});
        }
    },
    async create(req, res){
        try {
            const cekUser = await User.find({
                $or:[{userName: req.body.userName}, {email: req.body.emailAddress}, {accountNumber: req.body.accountNumber}, {identityNumber: req.body.identityNumber}]
            })
            if(cekUser.length > 0){
                return res.json({message: 'user already exists'})
            }
            await User.create({
                userName: req.body.userName, 
                accountNumber: req.body.accountNumber,
                emailAddress: req.body.emailAddress,
                identityNumber: req.body.identityNumber
            })
            .then(async(user)=>{
                res.status(200).send({
                    message: 'Your account has been created.',
                    data: {
                        userName: user.userName,
                        emailAddress: user.emailAddress,
                        accountNumber: user.accountNumber,
                        identityNumber: user.identityNumber
                    }
                });

                const users = await User.find();
                await redisClient.set("users:all", JSON.stringify(users));
            })
            .catch(e => {
                console.log(e);
                res.json({error: e});
            })
            
        } catch (e) {
            console.log(e);
            res.json({error: e});
        }
    },
    async update(req, res){
        try {
            const cekUser = await User.find({
                $or:[{email: req.body.emailAddress}, {accountNumber: req.body.accountNumber}],
                userName: {
                    $ne: req.params.userName
                }
            })
            if(cekUser.length>0){
                return res.json({
                    message: 'email address or account number already taken'
                })
            }
            const user = await User.findOne({userName: req.params.userName})
            if(user){
                user.emailAddress = req.body.emailAddress
                user.accountNumber = req.body.accountNumber
                user.save();
                res.status(200).send({
                    message: 'Your account has been updated',
                    data: {
                        userName: user.userName,
                        emailAddress: user.emailAddress,
                        accountNumber: user.accountNumber,
                    }
                })
                const users = await User.find();
                await redisClient.set("users:all", JSON.stringify(users));
            } else {
                return res.json({
                    message: 'user not found',
                })
            }
        } catch (e) {
            console.log(e);
            res.json({error: e});
        }
    },
    async delete(req, res){
        try {
            const user = await User.findOne({userName: req.params.userName});
            if(!user){
                return res.json({
                    message: 'user not found',
                })
            }
            const deleteduser = await User.deleteOne({userName:req.params.userName});
            const users = await User.find();
            await redisClient.set("users:all", JSON.stringify(users));
            res.status(200).send({message: 'deleted user'});
        } catch (e) {
            console.log(e);
            res.json({error: e});
        }
    }
}