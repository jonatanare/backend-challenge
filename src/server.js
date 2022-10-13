import express from "express";

const server = express();

//middlewares
server.use(express.json());

// Routers
import autorsRouter from "../src/routers/autors.router.js";
import postsRouter from "../src/routers/posts.router.js";
import postCommentRouter  from "../src/routers/postComments.router.js";
import handleErrors from "./middlewares/handleError.js";

//aqui encuentro a la ruta /autors
server.use("/autors", autorsRouter); //diciendole al server que conozca este router , ánclate a la ruta kdkoders
server.use("/posts", postsRouter);
server.use("/comment", postCommentRouter)

// middleware - handleErrors
server.use(handleErrors);

export { server }; //asi con ste nombre la tengo q importat cuando esta dentro de llaves
