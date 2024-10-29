import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

// For SignUp
export const SignUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.json({ success: false, message: "Email alerady Used" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Account Create Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occour at SignUp",
    });
  }
};

// For SignIn
export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({ success: false, message: "Invalid Password !!!" });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Loggin is Successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName:checkUser.userName
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occour at SignIn" });
  }
};

//For Logout
export const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logout Successfully" });
};

// For Check Authenticated
export const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "UnAuthorized User!!!" });
  }
  try {
    const decode = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "UnAuthorized User!!!" });
  }
};
