import express from "express";
import * as postCommentUseCase from "../useCases/comments.use.js";
const router = express.Router();



router.post("/", async (request, response, next) => {
    try {
      const { body: comment } = request;
      const newPostComment = await postCommentUseCase.addComment(comment);
     

      console.log(newPostComment);
      response.json({
        succes: true,
        msg: "Tu comentario ha sido publicado",
        data: newPostComment
      });
    } catch (error) {
        console.log(error);
     next(error)
    }
  });
  
  export default router