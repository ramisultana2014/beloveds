import { Router } from "express";
import { protectedRouterInServer } from "../controller/authController.js";
import {
  createComment,
  deletePost,
  fetchHomePage,
  getAllFriendPosts,
  getAllUserPosts,
  handleFriendRequest,
  handleSendingFriendRequest,
  receiveFriendRequest,
  searchforfriends,
  uploadPost,
  uploadProfilePicture,
} from "../controller/userController.js";
const router = Router();
router.use(protectedRouterInServer);
router.post("/uploadProfilePIcture", uploadProfilePicture);
// body must contain title,image
router.post("/createPost", uploadPost);
router.post("/sendfriendrequest", handleSendingFriendRequest);
router.get("/recievefriendrequest", receiveFriendRequest);
router.post("/answerfriendrequest", handleFriendRequest);
router.post("/createcomment", createComment);
router.get("/getAllUserPosts", getAllUserPosts);
router.post("/getAllFriendPosts", getAllFriendPosts);
router.get("/homepage", fetchHomePage);
router.delete("/deletepost/:id", deletePost);
router.get("/searchforfriends/:userName", searchforfriends);
export default router;
