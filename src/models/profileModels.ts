import mongoose, { Document, Schema } from "mongoose";

interface IProfile extends Document {
    name: string
    age: number
    gender: string
    imageUrl: string
}

const ProfileSchema = new Schema<IProfile>(
    {
        name: {type: String, required: true},
        age: { type: Number, required: true},
        gender: { type: String, required: true},
        imageUrl: { type: String, required: true},
    },
    {
        timestamps: true,
    }

)

export default mongoose.model<IProfile>('Profile', ProfileSchema)