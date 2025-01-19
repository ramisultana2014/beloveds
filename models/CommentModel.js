import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    commentOwnerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postID: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
  }
);

CommentSchema.pre(/^find/, function (next) {
  this.populate({ path: "commentOwnerID", select: "name profilePicture" });
  next();
});
export default mongoose.model("CommentModel", CommentSchema);
