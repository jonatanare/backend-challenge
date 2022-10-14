import express from "express";
import jwt_decode from "jwt-decode";
import * as commentUseCase from "../useCases/comments.use.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

//GET /comments
router.get('/', async(request, response, next) => {
  try {
    const allComments = await commentUseCase.getAll()

    response.json({
      success: true,
      message: "All comments",
      data: {
        comments: allComments
      }
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})


//POST /comments
router.post("/", auth, async (request, response, next) => {
  try {
    const { body: comment } = request;
    const token = request.headers.authorization;
    const { id } = jwt_decode(token);
    console.log(id);
    const newComment = await commentUseCase.addComment(comment, id);

    console.log(newComment);
    response.json({
      succes: true,
      message: "Comment published",
      data: newComment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


//DELETE /comments
router.delete("/:idComment", auth, async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const commentDeleted = await commentUseCase.deleteById(idComment);
    response.json({
      succes: true,
      message: "Comment deleted",
      data: commentDeleted,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


//EDIT /comments
router.patch('/:idComment', auth, async (request, response, next) => {
  try {
    const { idComment } = request.params
    const unupdateComment = request.body
    const commentUpdated = await commentUseCase.update(idComment, unupdateComment)

    response.json({
      success: true,
      message: 'comment updated',
      data: {
        comment: commentUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})
export default router;
