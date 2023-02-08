import { Schema, model } from "mongoose";

const user = Schema({
    userName: {
        type: "string",
        required: true,
    },
    accountNumber:{
        type: "string",
        required: true,
    },
    emailAddress:{
        type: "string",
        required: true,
    },
    identityNumber:{
        type: "string",
        required: true,
    },
})

export default model('User', user);