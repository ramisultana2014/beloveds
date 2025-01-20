import User from "../models/UserModel.js";

import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";
import sharp from "sharp";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/customErrors.js";
import PostModel from "../models/PostModel.js";
import FriendRequest from "../models/FriendRequest.js";
import CommentModel from "../models/CommentModel.js";
import multer from "multer";
const upload = multer({
  limits: { fileSize: 15000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error("please upload a valid image"));
    }
    cb(undefined, true);
  },
});
export const uploadimage = upload.single("image");
export const uploadProfilePicture = async (req, res) => {
  //console.log(req.user);
  const buffer = req.file.buffer;
  const processedImage = await sharp(buffer)
    .rotate()
    .resize({ width: 250 })
    .toBuffer();

  //Upload the processed image to Cloudinary
  // Upload the processed image to Cloudinary
  const uploadPromise = new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(
            new InternalServerError("Upload failed. Please try again.")
          );
        }
        resolve(result);
      }
    );
    uploadStream.end(processedImage); // Pass the processed image to the stream
  });

  const response = await uploadPromise; // Wait for Cloudinary response
  //console.log(response.secure_url);
  if (req.body.image && req.user.profilePictureID) {
    await cloudinary.v2.uploader.destroy(req.user.profilePictureID);
  }
  req.user.profilePicture = response.secure_url;
  req.user.profilePictureID = response.public_id;
  // await req.user.save({ validateBeforeSave: false });
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.user, {
    new: true,
  });
  //console.log(updatedUser);
  res.status(StatusCodes.OK).json({
    msg: "profile picture updated successfully",
    data: { updatedUser },
  });
};

export const uploadPost = async (req, res) => {
  // body must contain userid,title,image
  // must be with protect route middleware
  //const buffer = Buffer.from(req.body.image, "base64");
  const buffer = req.file.buffer;
  const processedImage = await sharp(buffer)
    .rotate()
    .resize({ width: 250 })
    .toBuffer();

  // Upload the processed image to Cloudinary
  const uploadPromise = new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(
            new InternalServerError("Upload failed. Please try again.")
          );
        }
        resolve(result);
      }
    );
    uploadStream.end(processedImage); // Pass the processed image to the stream
  });

  const response = await uploadPromise; // Wait for Cloudinary response
  //console.log(response.secure_url);

  const postObj = {
    postOwnerID: req.user._id,
    title: req.body.title,
    postOwnerName: req.user.name,
    postImageId: response.public_id,
    postImageUrl: response.secure_url,
  };
  await PostModel.create(postObj);

  res.status(StatusCodes.OK).json({
    msg: "post created successfully",
  });
};
export const getAllUserPosts = async (req, res) => {
  const posts = await PostModel.find({ postOwnerID: req.user._id })
    .populate({ path: "postComments" })
    .sort({
      createdAt: -1,
    });
  // NotFoundError for 404
  //console.log(posts);
  if (posts.length === 0)
    throw new NotFoundError("there is no post to display");
  //posts=posts.sort({createdAt:-1})
  res.status(StatusCodes.OK).json({
    data: { posts },
  });
};
export const deletePost = async (req, res) => {
  //console.log(req.user, req.params.id);
  const deletedPost = await PostModel.findOneAndDelete({
    _id: req.params.id,
    postOwnerID: req.user._id,
  });
  //console.log(deletedPost);
  if (!deletedPost) throw new NotFoundError("no post to delete");
  if (deletedPost.postImageId) {
    await cloudinary.v2.uploader.destroy(deletedPost.postImageId);
  }
  res.status(StatusCodes.OK).json({
    msg: "post deleted successfully",
  });
};
export const searchforfriends = async (req, res) => {
  //console.log(req.user.id);
  const usersList = await User.find({
    name: { $regex: req.params.userName, $options: "i" },
  }).select("_id name profilePicture  ");

  if (!usersList) throw new NotFoundError("no user was found");
  const friends = [];
  const others = [];
  //console.log(usersList);
  const filterUserList = usersList.filter((user) => user.id !== req.user.id);
  //console.log(filterUserList);
  filterUserList.forEach((user) => {
    if (req.user.friendsList.includes(user._id.toString())) {
      friends.push(user);
    } else {
      others.push(user);
    }
  });
  res.status(StatusCodes.OK).json({
    data: { friends, others },
  });
};
export const handleSendingFriendRequest = async (req, res) => {
  await FriendRequest.create({
    friendRequestFromID: req.user._id,
    friendRequestToID: req.body.friendRequestToID,
  });
  res.status(StatusCodes.OK).json({
    msg: "request send successfully",
  });
};
export const receiveFriendRequest = async (req, res) => {
  const friendsRequests = await FriendRequest.find({
    friendRequestToID: req.user._id,
  });
  // NotFoundError for 404

  if (friendsRequests.length === 0)
    throw new NotFoundError("there is no friend request");
  //posts=posts.sort({createdAt:-1})
  res.status(StatusCodes.OK).json({
    data: { friendsRequests },
  });
};
export const handleFriendRequest = async (req, res) => {
  if (!req.body.requestId) throw new BadRequestError("Invalid request data");
  const request = await FriendRequest.findOne({ _id: req.body.requestId });
  if (!request) throw new BadRequestError("invalid credential");
  const requestFriendFrom = await User.findById(req.body.RequestFromID);
  //console.log(req.body.RequestFromID);
  if (req.body.RequestFromID) {
    req.user.friendsList.push(req.body.RequestFromID);
    requestFriendFrom.friendsList.push(req.user._id);
    // await req.user.save({ validateBeforeSave: false });
    // await requestFriendFrom.save({ validateBeforeSave: false });
    await Promise.all([
      req.user.save({ validateBeforeSave: false }),
      requestFriendFrom.save({ validateBeforeSave: false }),
    ]);
  }
  await FriendRequest.deleteOne({
    _id: req.body.requestId,
    friendRequestToID: req.user._id,
  });
  return res.status(StatusCodes.OK).json({ msg: `success` });
};
// if (!requestFriendFrom) throw new BadRequestError("invalid credential");
export const getAllFriendPosts = async (req, res) => {
  //console.log(req.body.postOwnerID);
  const posts = await PostModel.find({
    postOwnerID: req.body.postOwnerID,
  })
    .populate({ path: "postComments" })
    .sort({
      createdAt: -1,
    });
  // NotFoundError for 404
  //console.log(posts);
  if (posts.length === 0)
    throw new NotFoundError("there is no post to display");
  //posts=posts.sort({createdAt:-1})
  res.status(StatusCodes.OK).json({
    data: { posts },
  });
};
export const createComment = async (req, res) => {
  await CommentModel.create({
    comment: req.body.comment,
    commentOwnerID: req.user._id,
    postID: req.body.postID,
  });
  res.status(StatusCodes.CREATED).json({
    msg: "success",
  });
};
export const fetchHomePage = async (req, res) => {
  if (req.user.friendsList.length === 0)
    throw new NotFoundError("No posts to display start add friends");
  //console.log(req.user.friendsList);
  // Fetch posts for all friends in a single query
  const homePagePosts = await PostModel.find({
    //here we search documents in PostModel collection  by field postOwnerId , to find document with field postOwnerId  that match any value   in req.user.friendList ,
    postOwnerID: { $in: req.user.friendsList },
  })
    .populate({ path: "postComments" })
    .sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({
    data: { homePagePosts },
  });
};
