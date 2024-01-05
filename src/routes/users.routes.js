import { Router } from "express"
import { getAllUsers, indexRoute } from "../controllers/users/index.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = new Router()

router.route('/').get(getAllUsers)
router.route('/register').post(upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]),indexRoute)

export default router