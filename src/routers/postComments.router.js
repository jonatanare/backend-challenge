import express from "express";
import * as postCommentUseCase from "../useCases/comments.use.js";
const router = express.Router();



router.post("/:post_id/create", async (request, response, next) => {
    try {
      const { body: comment } = request;
      const {post_id} = request.params;
      const newPostComment = await postCommentUseCase.createComment(post_id, comment);
     

      console.log(newPostComment);
      response.json({
        succes: true,
        msg: "Tu comentario ha sido publicado",
        data: newPostComment
      });
    } catch (error) {
     next(error)
    }
  });
  
  export default router