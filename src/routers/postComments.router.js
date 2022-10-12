import express from "express";
import * as postCommentUseCase from "../useCases/comments.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; //DÒNDE SE UTILIZA?
const router = express.Router();
import {Post} from '../models/posts.model.js'



router.post("/:post_id/create", async (request, response, next) => {
    try {
      const { body: newComment } = request;
      const {post_id} = request.params
      if (!post_id) throw new Error('id de post inválido, intenta de nuevo')
      const newPostComment = await postCommentUseCase.create(newComment);
      let nuevocoment = new postCommentUseCase({
        comment:request.body.coment,
        post_id:post_id,
      })
      let commentData = await nuevocoment.save()

      await Post.updateOne(
        {_id: request.params.post_id},
        {$push: {comments : commentData._id}}
        )

      console.log(newPostComment);
      response.json({
        succes: true,
        msg: "Tu comentario ha sido publicado",
        data: nuevocoment,
      });
    } catch (error) {
     next(error)
    }
  });
  
  export default router