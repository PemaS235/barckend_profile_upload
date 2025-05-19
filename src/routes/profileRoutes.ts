// routes/profile.ts
import { Router } from "express";
import { createProfile, getAllProfiles, getProfileById } from "../controllers/profileControllers";
import { upload } from "../middleware/uploadMiddleware";

const router = Router()

router.get('/', getAllProfiles)
router.get('/:id', getProfileById)
router.post('/', upload.single('profileImage'), createProfile)

export default router