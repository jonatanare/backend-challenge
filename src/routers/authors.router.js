//endpoints

import express from "express";
import * as autorsUsesCases from "../useCases/autors.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; //DÒNDE SE UTILIZA?


const router = express.Router();

//Routers o endpoints
router.get("/", async (request, response, next) => {
  try {
    const allAutors = await autorsUsesCases.getAll();
 
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
        autors: allAutors,
      },
    });
  } catch (error) {
    next(error);
  }
});

//GET /autors /:id

router.get("/:idAutor", async (request, response, next) => {
    try {
      const { idAutor } = request.params;
      const getAutor = await autorsUsesCases.getById(idAutor);
  
      if (!idAutor) {
        throw new StatusHttp("autor no encontrado");
      }
      response.json({
        succes: true,
        data: {
          autor: getAutor,
        },
      });
    } catch (error) {
      next(error)
    }
  });
  

//POST /Autors
router.post("/", async (request, response, next) => {
  try {
    const { body: newAutor } = request;

    const autorCreated = await autorsUsesCases.create(newAutor);
    console.log(autorCreated);
    response.json({
      succes: true,
      msg: "autor creado",
      data: autorCreated,
    });
  } catch (error) {
   next(error)
  }
});


router.delete("/:idAutor", async (request, response, next) => {
  try {
    let { idAutor } = request.params;
    const autorDeleted = await autorsUsesCases.deleteById(idAutor);
    console.log(autorDeleted);
    if (!autorDeleted) {
      throw new StatusHttp("autor no encontrado");
    }
    response.json({
      succes: true,
      data: {
        autor: autorDeleted,
        message:'Este autor ha sido eliminado'
      },
    });
  } catch (error) {
   next(error)
  }
});

router.patch("/:idAutor", async (request, response) => {
  try {
    const { idAutor } = request.params;
    const unUpdateAutor = request.body;
    let autorUpdated = await autorsUsesCases.update(idAutor, unUpdateAutor)
    console.log(autorUpdated);

    if (!autorUpdated) {
      throw new StatusHttp("autor no encontrado");
    }
    response.json({
      succes: true,
      data: {
        autor: autorUpdated,
      },
    });
  } catch (error) {
    next(error)
  }
});

export default router;
