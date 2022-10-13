//endpoints

import express from "express";
import * as authorsUsesCases from "../useCases/authors.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; //DÒNDE SE UTILIZA?
import { auth } from "../middlewares/auth.js";



const router = express.Router();

//Routers o endpoints
router.get("/", async (request, response, next) => {
  try {
    const allAuthors = await authorsUsesCases.getAll();
 /* 
    const { name, nacionality } = request.query;

    const filters = {};

    if (name) {
      filters.name = name;
    }
    if (nacionality) {
      filters.nacionality = nacionality;
    }

    console.log(filters);  */

    response.json({
      succes: true,
      data: {
        authors: allAuthors,
      },
    });
  } catch (error) {
    next(error);
  }
});

//GET /Authors /:id

router.get("/:idAuthor", async (request, response, next) => {
    try {
      const { idAuthor } = request.params;
      const getAuthor = await authorsUsesCases.getById(idAuthor);
  
      if (!getAuthor) {
        throw new StatusHttp("author no encontrado");
      }
      response.json({
        succes: true,
        data: {
          author: getAuthor,
        },
      });
    } catch (error) {
      next(error)
    }
  });
  

//POST /Authors
router.post("/",  async (request, response, next) => {
  try {
    const { body: newAuthor } = request;

    const authorCreated = await authorsUsesCases.create(newAuthor);
    console.log(authorCreated);
    response.json({
      succes: true,
      msg: "author creado",
      data: authorCreated,
    });
  } catch (error) {
   next(error)
  }
});


router.delete("/:idAuthor", auth,  async (request, response, next) => {
  try {
    let { idAuthor } = request.params;
    const authorDeleted = await authorsUsesCases.deleteById(idAuthor);
    console.log(authorDeleted);
    if (!authorDeleted) {
      throw new StatusHttp("author no encontrado");
    }
    response.json({
      succes: true,
      data: {
        author: authorDeleted,
        message:'Este author ha sido eliminado'
      },
    });
  } catch (error) {
   next(error)
  }
});

router.patch("/:idAuthor", auth,  async (request, response) => {
  try {
    const { idAuthor } = request.params;
    const unUpdateAuthor = request.body;
    let authorUpdated = await authorsUsesCases.update(idAuthor, unUpdateAuthor)
    console.log(authorUpdated);

    if (!authorUpdated) {
      throw new StatusHttp("author no encontrado");
    }
    response.json({
      succes: true,
      data: {
        author: authorUpdated,
      },
    });
  } catch (error) {
    next(error)
  }
});

export default router;
