import express from "express";

const server = express();

//middlewares
server.use(express.json());

// Routers
import authorsRouter from "./routers/authors.router.js";
import postsRouter from "../src/routers/posts.router.js";
import postCommentRouter  from "../src/routers/postComments.router.js";
import handleErrors from "./middlewares/handleError.js";

//aqui encuentro a la ruta /authors
server.use("/authors", authorsRouter); //diciendole al server que conozca este router , ánclate a la ruta kdkoders
server.use("/posts", postsRouter);
server.use("/comments", postCommentRouter)

// middleware - handleErrors
server.use(handleErrors);

export { server }; //asi con ste nombre la tengo q importat cuando esta dentro de llaves
