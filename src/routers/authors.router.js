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
  
      if (!idAuthor) {
        throw new StatusHttp("author no encontrado", 401);
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
    console.log(newAuthor.email);
    if (newAuthor.email) {
      throw new StatusHttp("This author already exist!");
    }
    const authorCreated = await authorsUsesCases.create(newAuthor);
    
    console.log(authorCreated);
    response.json({
      succes: true,
      message: "author created",
      data: authorCreated,
    });
  } catch (error) {
    console.log(error);
   next(error)
  }
});


router.delete("/:idAuthor", auth,  async (request, response, next) => {
  try {
    const { idAuthor } = request.params;
    const authorDeleted = await authorsUsesCases.deleteById(idAuthor);
    console.log(authorDeleted);
    if (!authorDeleted) {
      throw new StatusHttp("author no encontrado");
    }
    response.json({
      success: true,
      message:'author deleted',
      data: {
        author: authorDeleted,
      },
    });
  } catch (error) {
   next(error)
  }
});

router.patch('/:idAuthor',  async (request, response, next) => {
  try {
    const { idAuthor } = request.params
    const unUpdateAuthor = request.body

    const authorUpdated = await authorsUsesCases.update(idAuthor, unUpdateAuthor)

    if (!unUpdateAuthor) {
      throw new StatusHttp("author not found");
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
