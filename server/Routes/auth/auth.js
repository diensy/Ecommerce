import express from "express";
import {
  authMiddleWare,
  logout,
  SignIn,
  SignUp,
} from "../../controllers/auth/auth.js";

const router = express.Router();

router.post("/register", SignUp);
router.post("/login", SignIn);
router.post("/logout", logout);
router.get("/check-auth", authMiddleWare, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated User", user });
});

export default router;
