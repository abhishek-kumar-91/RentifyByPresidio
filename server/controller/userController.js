const User  = require("../models/userSchema.js");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

 const Register = async (req, res) => {
  try {
    const {firstName, lastName, email, phone,  password, userType } = req.body;
    console.log(firstName, lastName, email, phone, password, userType);
    if (!firstName || !lastName || !email || !email || !phone || !password || !userType) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findOne({email});
    if (user) {
      return res.status(401).json({
        message: "User Already exist.",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      phoneNumber:phone,
      password: hashedPassword,
      userType
    });

    return res.status(201).json({
      message: "Account successfully created!",
      success: true,
    });
  } catch (err) {
    console.log("Register user ", err);
    return res.json({
      message: "Error during register the user",
      success: false,
    });
  }
};


 const Login = async(req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(401).json({
        message: "All fields are required.",
        success: false
      })
    };
    const user = await User.findOne({email});

    if(!user){
      return res.status(401).json({
        message:"User doesn't exist with this email.",
        success: false
      })
    }

    const isMatch = await bcryptjs.compare( password, user.password);

    if(!isMatch){
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false
      })
    }

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRY} )

    return res.status(200).cookie("token", token, {expireIn: process.env.TOKEN_EXPIRY, httpOnly:true}).json({
      message: `Welcome back ${user.firstName}`,
      user,
      success: true,
      token
    })

  }catch(err){

    console.log("Error from Login ", err)
  }
}


const Logout = (req, res) => {
  return  res.clearCookie('token').json({ message: 'Logout successful' });
}


module.exports = {Register, Login, Logout};

