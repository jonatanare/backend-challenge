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
    const allPosts = await postsUsesCases.getAll().populate({path:'author', select:['name']});
    console.log(allPosts);
    const { name, nacionality } = request.query;

    const filters = {};

    if (name) {
      filters.name = name;
    }
    if (nacionality) {
      filters.nacionality = nacionality;
    }

    console.log(filters);

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
      throw new StatusHttp("Post no encontrado");
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
    const {body: newPost} = request; //abstrayendo la data del body(en este caso de insomnia) same -> const newPost = request.body
    const { id } = jwt_decode(token);
    console.log('ID: ',id);
    console.log('Body Post: ',newPost);
    const postCreated = await postsUsesCases.create(newPost, id);
    console.log(postCreated);
    /*         const { body: newPost } = request; //abstrayendo la data del body(en este caso de insomnia) same -> const newpost = request.body
     */

    try {

      const token = request.headers.authorization
      const {id} = jwt_decode(token);
      console.log(id);
      
      const newPost = request.body; //abstrayendo la data del body(en este caso de insomnia) same -> const newPost = request.body
      const postCreated = await postsUsesCases.create(newPost, id);
      console.log(postCreated);
/*         const { body: newPost } = request; //abstrayendo la data del body(en este caso de insomnia) same -> const newpost = request.body
 */        
    
        response.json({
          success: true,
          message: "post creado",
          data: {
            posts: postCreated,
          },
        });
      } catch (error) {
        next(error);
      }
    response.json({
      success: true,
      message: "post creado",
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
      throw new StatusHttp("post no encontrado");
    }
    response.json({
      succes: true,
      data: {
        post: postUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
