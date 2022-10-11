import mongoose from "mongoose"

const autorSchema = new mongoose.Schema({ //recibirá un objeto
    name: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true //si este nombre viene con espacios al principio y al final que los borre
    },
    biography: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 500,
        trim: true 
    },
    initialDate: {
        type: Date, 
        required: true
    },
    nacionality: {
        type: String, 
        required: true,
        min: 1,
        max: 100
    }
})

const Autor = mongoose.model('autors', autorSchema)
export {Autor}
