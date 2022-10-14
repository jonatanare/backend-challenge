import express from "express";
import * as authorsUsesCases from "../useCases/authors.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; 
import { auth } from "../middlewares/auth.js";

const router = express.Router();


//GET /Authors 
router.get("/", async (request, response, next) => {
  try {
    const { page, limit } = request.query;
    const skip = (page - 1) * 10;

    const allAuthors = await authorsUsesCases
      .getAll()
      .populate({ path: "posts", select: ["title"] })
      .skip(skip)
      .limit(limit);
    response.json({
      succes: true,
      message:'All authors',
      data: {
        authors: allAuthors,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/posts", async (request, response, next) => {
  try {
    const { page, limit } = request.query;
    const skip = (page - 1) * 10;

    const allAuthors = await authorsUsesCases
      .getAll()
      .populate('posts')
      .skip(skip)
      .limit(limit);
    response.json({
      succes: true,
      message:'All authors',
      data: {
        authors: allAuthors,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

  //PLUS endpoint 
  router.get("/:idAuthor", async (request, response, next) => {
    try {
      const { idAuthor } = request.params;

      const getAuthor = await authorsUsesCases
      .getById(idAuthor)
      
  
      if (!idAuthor) {
        throw new StatusHttp("author no encontrado", 401);
      }

      response.json({
        succes: true,
        message:'Author',
        data: {
          author: getAuthor,
        },
      });
    } catch (error) {
      console.log(error);
      next(error)
    }
  })


//POST /Authors
router.post("/", async (request, response, next) => {
  try {
    const { body: newAuthor } = request;
    const authorCreated = await authorsUsesCases.create(newAuthor);

    console.log(authorCreated);
    response.json({
      succes: true,
      message: "Author created",
      data: authorCreated,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:idAuthor", auth, async (request, response, next) => {
  try {
    const { idAuthor } = request.params;
    const authorDeleted = await authorsUsesCases.deleteById(idAuthor);
    console.log(authorDeleted);
    response.json({
      success: true,
      message: "Author deleted",
      data: {
        author: authorDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
});


//EDIT /AUthors
router.patch("/:idAuthor", async (request, response, next) => {
  try {
    const { idAuthor } = request.params
    const unUpdateAuthor = request.body
    console.log(unUpdateAuthor);

    const authorUpdated = await authorsUsesCases.update(idAuthor, unUpdateAuthor)
    response.json({
      succes: true,
      message:'Author updated',
      data: {
        author: authorUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router
