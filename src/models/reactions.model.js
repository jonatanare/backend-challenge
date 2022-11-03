import mongoose from 'mongoose'

const reactionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
      }
})

const Reaction = mongoose.model('Reaction', reactionSchema)
export { Reaction }
