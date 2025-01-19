import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    postOwnerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    // likes: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //   default: [],
    // },
    postImageUrl: { type: String }, //use cloudinary
    postImageId: { type: String },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virtual below works
    toObject: { virtuals: true },
  }
);
// PostSchema.pre(/^find/, function (next) {
//   this.populate({ path: "likes", select: "name profilePicture" });
//   next();
// });
PostSchema.virtual("postComments", {
  ref: "CommentModel", //  model name
  localField: "_id",
  foreignField: "postID", //the name of field in model // each document in  CommentModel have the id of the post
  //so we go to commentModel and gather all the comment that have the same postId, localField let us compare the localField _id in PostModel with the id stored in commentModel as postID
  //then in controller when we PostModel.find().populate({path:"postComments"})
  justOne: false,
});
export default mongoose.model("PostModel", PostSchema);
