//endpoints

import express from "express";

import * as postsUsesCases from "../useCases/posts.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; //DÒNDE SE UTILIZA?
import {Post} from '../models/posts.model.js'
import {Autor} from '../models/autors.model.js'

const router = express.Router();

//Routers o endpoints
router.get("/", async (request, response, next) => {
  try {
    const allPosts = await postsUsesCases.getAll();
 
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
        posts: allPosts,
      },
    });
  } catch (error) {
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
      next(error)
    }
  });
  

//POST /Posts
router.post("/", async (request, response, next) => {

    const {description, important = false, idAutor} = request.body
    if (!description) {
        throw new StatusHttp("post no encontrado");
      }
/*     const postCreated = await postsUsesCases.create(newPost);
 */   
      const autor = await Autor.findById(idAutor)

      const newPost = new Post ({
        description, 
        date: new Date(),
        important, 
        autor: autor._id
      })

      try{
        const savedPost = await newPost.save()
        autor.posts = autor.posts.concat(savedPost._id)
        await autor.save
        response.json({
            succes: true,
            msg: "post creado",
            data: savedPost,
          });
      }catch{
        next(error)
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
        message:'Este post ha sido eliminado'
      },
    });
  } catch (error) {
   next(error)
  }
});

router.patch("/:idPost", async (request, response) => {
  try {
    const { idPost } = request.params;
    const unUpdatePost = request.body;
    let postUpdated = await postsUsesCases.update(idPost, unUpdatePost)
    console.log(postUpdated);

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
    next(error)
  }
});

export default router;
