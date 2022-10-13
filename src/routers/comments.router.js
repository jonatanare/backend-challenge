import express from "express";
import * as commentUseCase from "../useCases/comments.use.js";
const router = express.Router();



router.post("/", async (request, response, next) => {
    try {
      const { body: comment } = request;
      const newComment = await commentUseCase.addComment(comment);
     

      console.log(newComment);
      response.json({
        succes: true,
        msg: "Tu comentario ha sido publicado",
        data: newComment
      });
    } catch (error) {
        console.log(error);
     next(error)
    }
  });
  
  export default router