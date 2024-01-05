import { User } from "../../models/users.model.js"
import { uploadToCloudinary } from "../../utils/cloudinary.js"

const getAllUsers = async (req, res, next) => {
  res.status(200).send("Hello All Users")
  next()
}

const indexRoute = async (req, res, next) => {

    // ***** STEPS ***** //
    
    // Empty Fields Validations
    // User Existence Check
    // Avatar File Check & Upload to Couldinary
    // Remove Password Field and Refresh Tokken after submission the user successfully.
    // Check for the Entry.

    const { username, email, fullname, password } = req.body

    if ([username, email, fullname, password].some(val => val?.trim() === "")) {
        return res.status(422).send("Fields Cannot Be Empty")
    }

    const userFound = User.findOne({
        $or: [{ username }, { email }]
    })

    if (userFound) {
        return res.status(400).send('User Already Exist')
    }

    const avatarFile = req.files['avatar'][0]?.path
    const coverImageFile = req.files['coverImage'][0]?.path

    if (!avatarFile) {
        return res.status(400).send('Avatar File Required!!!')
    }
    if (!coverImageFile) {
        return res.status(400).send('coverImage File File Required!!!')
    }

    const avatarCouldianryUrl = await uploadToCloudinary(avatarFile)
    console.log(avatarCouldianryUrl.url, "AVATAR URL")
    console.log(avatarCouldianryUrl, "AVATAR ")

    const coverImageFileUrl = await uploadToCloudinary(coverImageFile)
    console.log(coverImageFileUrl.url, "COVER IMAGE URL")

    const createdUser = await User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        password,
        avatar: avatarCouldianryUrl.url,
        coverImage: coverImageFileUrl.url,
    })

    if (!createdUser._id) {
        res.status(500).send("User Not Created!!!!")
    }
    const response = User.findById(createdUser?._id).select('-password -refreshToken')
    // createdUser.select('-password -refreshToken')

    res.status(201).json(response);

}

export { indexRoute,getAllUsers }