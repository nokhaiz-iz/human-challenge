import * as express from "express";
import { Router } from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { jwt } from "jsonwebtoken";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/user.entity";
import { LessThan } from "typeorm";
import { Article } from "./entity/article.entity";

// create typeorm connection
AppDataSource.initialize().then(async () => {
  // create and setup express app
  const app = express();

  //create jwt authentication
  const createToken = async (body) => {
    const token = await jwt.sign(body, "secrethaiufhbaywegfbwefgwebbcwuicbce", {
      expiresIn: "1h",
    });
    const userVerify = await jwt.verify(
      token,
      "secrethaiufhbaywegfbwefgwebbcwuicbce"
    );
    return token;
  };
  app.use(express.json());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //ARTICLE Routes

  //Create Article Endpoint
  app.post("/api/article", async (req, res) => {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Article)
      .values([
        { title: req.body.title, slug: req.body.slug, published_at: null },
      ])
      .execute();
    res.json({
      message: req.body,
    });
  });

  //Find Article Endpoint
  app.get("/api/getArticle/:id", async (req, res) => {
    const article = await AppDataSource.getRepository(User)
      .createQueryBuilder("article")
      .where("article.id = :id", { id: 1 })
      .getOne();

    res.json({
      message: "success",
      payload: article,
    });
  });

  //Remove Article Endpoint
  app.delete("/api/article/:id", async (req, res) => {
    await await AppDataSource.createQueryBuilder()
      .delete()
      .from("article")
      .where("id = :id", { id: 1 })
      .execute();

    res.json({
      message: "success",
    });
  });

  // UNHANDLED 404 ROUTE
  app.all("*", async function (req: Request, res: Response) {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    return res.status(404).send(`Route ${fullUrl} not found`);
  });

  //Find Published Article Endpoint
  app.get("/api/articles/published", async (req, res) => {
    const article = await AppDataSource.getRepository(User)
      .createQueryBuilder("article")
      .where("pubished_at", LessThan(new Date().toLocaleString()))
      .getOne();

    res.json({
      message: "success",
      payload: article,
    });
  });

  //USER Routes
  //Create User
  app.post("/api/user", async (req, res) => {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([{ username: req.body.username, password: req.body.password }])
      .execute();
    res.json({
      message: req.body,
    });
  });

  // Login API
  app.post(
    "/api/login",
    createToken,
    async function (req: Request, res: Response) {
      const body = req.body;
      const signBody = createToken(body);
      res.status(200).send(signBody);
    }
  );

  // start express server
  app.listen(3000);
});
