import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    birthday: Date,
    email: {
      type: String,
      unique: true,
    },
    gender: String,
    password: {
      type: String,
      select: false,
    },
    profilePicture: String, //use cloudinary
    profilePictureID: String,
    passwordConfirm: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    friendsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  }
);
UserSchema.pre("save", async function (next) {
  const user = this;
  //this point to current document = user , pre"save"" run when use user.save() in routers  patch or post, it work befor saving document to database and befor res.send
  user.passwordConfirm = undefined;

  next();
});
// UserSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "friendsList",
//     select: "_id name profilePicture",
//   });
//   next();
// });
export default mongoose.model("User", UserSchema);

// E11000 duplicate key error collection: beloveds.users index: friendsList_1 dup key: { friendsList: undefined }
