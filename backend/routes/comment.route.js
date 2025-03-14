import express from "express";
import {
  getPostComments,
  addComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/", verifyToken, addComment);

export default router;


// import express from "express";
// import {
//   getPostComments,
//   addComment,
//   deleteComment, // Import delete function
// } from "../controllers/comment.controller.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

// const router = express.Router();

// router.get("/:postId", getPostComments);
// router.post("/", verifyToken, addComment);
// router.delete("/:commentId", verifyToken, deleteComment); // Add delete route

// export default router;
