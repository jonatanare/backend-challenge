import express from "express";
import jwt_decode from "jwt-decode";
import * as commentUseCase from "../useCases/comments.use.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();



router.post("/", auth, async (request, response, next) => {
    try {
      const { body: comment } = request;
      const token = request.headers.authorization
      const {id} = jwt_decode(token);
      console.log(id);
      const newComment = await commentUseCase.addComment(comment, id);
     

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