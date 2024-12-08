import { model, Schema } from 'mongoose'

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "",
        required: true
    },
    status: {
        type: String,
        enum: ["DRAFT", "PUBLISHED"],
        default: "PUBLISHED"
    },
    visitCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

postSchema.index({
    title: 'text',
    category: 'text',
    description: 'text'
}, {
    title: 5,
    description: 4,
    category: 2
})

export const Post = model('Post', postSchema)