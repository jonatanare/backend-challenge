import express from "express";
import jwt_decode from "jwt-decode";
import * as postsUsesCases from "../useCases/posts.use.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

//GET /posts
router.get("/", async (request, response, next) => {
  try {
    const {page, limit} = request.query
    const skip = (page-1)*10;
    const allPosts = await postsUsesCases.getAll().populate({path:'author', select:['name']}).skip(skip).limit(limit)

    response.json({
      succes: true,
      message: "All posts",
      data: {
        posts: allPosts
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 

//get post with comments
router.get("/comments", async (request, response, next) => {
  try {
    const allPosts = await postsUsesCases.getAll().populate({path:'comments', select:['comment']})
    response.json({
      succes: true,
      message: "All posts",
      data: {
        posts: allPosts
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 


//GET /posts /:id
router.get("/:idPost", async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const getPost = await postsUsesCases.getById(idPost);
    response.json({
      succes: true,
      message: "Post found",
      data: {
        post: getPost,
      },
    });
  } catch (error) {
    next(error);
  }
});



//CREATE /Posts
router.post("/", auth, async (request, response, next) => {
  try {
    const token = request.headers.authorization;
    const post = request.body; 
    const { id } = jwt_decode(token);
    const postCreated = await postsUsesCases.create(post, id)
    response.json({
      success: true,
      message: "New post created",
      data: {
        posts: postCreated,
      },
    });
  } catch (error) {
    next(error);
  }
});


//DELETE /posts
router.delete("/:idPost", auth, async (request, response, next) => {
  try {
    let { idPost } = request.params;
    const postDeleted = await postsUsesCases.deleteById(idPost);
    console.log(postDeleted);
    response.json({
      succes: true,
      data: {
        post: postDeleted,
        message: "Post deleted",
      },
    });
  } catch (error) {
    next(error);
  }
});


//EDIT /posts
router.patch("/:idPost", auth, async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const unUpdatePost = request.body;
    const postUpdated = await postsUsesCases.update(idPost, unUpdatePost)
    response.json({
      succes: true,
      message: 'Post updated',
      data: {
        post: postUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router
