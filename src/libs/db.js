import mongoose from "mongoose";
/* import * as dotenv from 'dotenv';

dotenv.config()

const {} = process.env

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env
 */
const URL = 'mongodb+srv://movebike:movebike2022@movebike-backend.vb4jydi.mongodb.net/devto?retryWrites=true&w=majority' //uri que nos da mongo para podernos conectar 

function connect(){
    return mongoose.connect(URL) //nos regresa una promesa 
}

export default connect 