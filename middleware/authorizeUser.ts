import { Request, Response, NextFunction } from "express";
import { Roles } from "../model/auth/auth.constant";

// Middleware to allow Admin or the user themselves to update profile
export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = req.user; // Comes from userAuth
  const targetUserId = req.params.userId;
console.log(loggedInUser);
console.log(targetUserId)
  if (!loggedInUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 1️⃣ Admin → allow everything
  if (loggedInUser.role === Roles.admin) {
    return next();
  }

  // 2️⃣ Customer → can update only own profile
  if (String(loggedInUser.id) !== String(targetUserId)) {
    return res.status(403).json({
      error: "Forbidden: You can update only your own profile",
    });
  }

  // 3️⃣ Allowed → proceed
  next();
};
