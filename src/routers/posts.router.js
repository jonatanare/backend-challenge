//endpoints

import express from "express";
import jwt_decode from "jwt-decode";
import * as postsUsesCases from "../useCases/posts.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; //DÒNDE SE UTILIZA? Sepa dios
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

    if (!idPost) {
      throw new StatusHttp("Post no encontrado", 401);
    }
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

    if (!idPost) {
      throw new StatusHttp("Post no encontrado", 401);
    }
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
    console.log('ID: ',id);
    console.log('Body Post: ',post);
    const postCreated = await postsUsesCases.create(post, id)
    console.log(postCreated);
    //         const { body: newPost } = request; //abstrayendo la data del body(en este caso de insomnia) same -> const newpost = request.body
     
      
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

router.delete("/:idPost", async (request, response, next) => {
  try {
    let { idPost } = request.params;
    const postDeleted = await postsUsesCases.deleteById(idPost);
    console.log(postDeleted);
    if (!postDeleted) {
      throw new StatusHttp("post no encontrado");
    }
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

router.patch("/:idPost", async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const unUpdatePost = request.body;
    console.log('unupadetspost', unUpdatePost);
    const postUpdated = await postsUsesCases.update(idPost, unUpdatePost)
    console.log('postupdted', postUpdated);
    
    if (!postUpdated) {
      throw new StatusHttp("post not found");
    }
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
