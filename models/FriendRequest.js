import mongoose from "mongoose";
const FriendRequestSchema = new mongoose.Schema(
  {
    friendRequestToID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    friendRequestFromID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virtual below works
    toObject: { virtuals: true },
  }
);
// Enforce unique friend requests between two users
FriendRequestSchema.index(
  { friendRequestToID: 1, friendRequestFromID: 1 },
  { unique: true }
);
FriendRequestSchema.pre(/^find/, function (next) {
  this.populate({
    path: "friendRequestFromID",
    select: "_id name profilePicture",
  });
  next();
});
export default mongoose.model("FriendRequest", FriendRequestSchema);
