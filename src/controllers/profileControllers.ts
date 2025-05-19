// Controllers/profileController.ts
import { Request, Response } from "express";
import Profile from '../models/profileModels'

// Extended request
interface ProfileRequest extends Request {
    file?: Express.Multer.File
}

// Get all profiles
export const getAllProfiles = async ( _req: Request, res: Response) => {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1})
        res.status(200).json(profiles)
    } catch (err) {
        console.error('Error fetching profiles:', err)
        res.status(500).json({ error: 'Server error'})
    }
}

// Get profile by ID
export const getProfileById = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findById(req.params.id)
        if (!profile) {
            res.status(400).json({ error: 'Profile not found'})
            return
        }
        res.status(200).json(profile)
    } catch (err) {
        console.error('Error fetching profile:', err)
        res.status(500).json({ error: 'Server error'})
    }
}

// Create Profile
export const createProfile = async ( req: ProfileRequest, res: Response) =>  {
    try {
        const { name, age, gender } = req.body
        const file = req.file

        if (!name || !age || !gender || !file) {
            res.status(400).json({ error: 'All fields are required: name, age, gender, profileImage',})
            return
        }

        const imageUrl = `/uploads/${file.filename}`

        const profile = new Profile({
            name, 
            age: parseInt(age),
            gender,
            imageUrl
        })

        const savedProfile = await profile.save()

        res.status(201).json({ message: 'Profile saved to database', profile: savedProfile})
    } catch (err) {
        console.error('Error saving profile:', err)
        res.status(500).json({ error: 'Server error' })
    }
}