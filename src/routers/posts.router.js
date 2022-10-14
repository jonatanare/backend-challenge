import express from "express";
import jwt_decode from "jwt-decode";
import * as postsUsesCases from "../useCases/posts.use.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

//Routers o endpoints
 router.get("/", async (request, response, next) => {
  try {
    const {page, limit} = request.query
    const skip = (page-1)*10;
    const allPosts = await postsUsesCases.getAll().populate({path:'author', select:['name']}).populate({path:'comments', select:['comment']}).skip(skip).limit(limit);
    response.json({
      succes: true,
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
      data: {
        post: getPost,
      },
    });
  } catch (error) {
    next(error);
  }
});


router.get("/:idPost", async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const getPost = await postsUsesCases.getById(idPost);
    response.json({
      succes: true,
      data: {
        post: getPost,
      },
    });
  } catch (error) {
    next(error);
  }
});

//POST /Posts
router.post("/", auth, async (request, response, next) => {
  try {
    const token = request.headers.authorization;
    const post = request.body; //abstrayendo la data del body(en este caso de insomnia) same -> const newPost = request.body
    const { id } = jwt_decode(token);
    const postCreated = await postsUsesCases.create(post, id)
    response.json({
      success: true,
      message: "new post created",
      data: {
        posts: postCreated,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idPost", auth, async (request, response, next) => {
  try {
    let { idPost } = request.params;
    const postDeleted = await postsUsesCases.deleteById(idPost);
    console.log(postDeleted);
    response.json({
      succes: true,
      data: {
        post: postDeleted,
        message: "Este post ha sido eliminado",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idPost", auth, async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const unUpdatePost = request.body;
    const postUpdated = await postsUsesCases.update(idPost, unUpdatePost)
    response.json({
      succes: true,
      message: 'post updated',
      data: {
        post: postUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

//PLUS
/* router.get("/", async (request, response) => {
  try {
    const {page, limit} = request.query
    const skip = (page-1)*10;

    const post = await Post.find().skip(skip).limit(limit)
console.log(page);
    
    
    response.json({
      succes: true,
      data: {
        posts: post
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}); */
export default router
