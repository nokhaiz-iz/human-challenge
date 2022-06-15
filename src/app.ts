import * as express from "express";
import { Router } from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { jwt } from "jsonwebtoken";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/user.entity";

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
      .into(User)
      .values([{ username: req.body.username, password: req.body.password }])
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

  //USER Routes
  // register routes
  app.post("/login", createToken, async function (req: Request, res: Response) {
    const body = req.body;
    const signBody = createToken(body);
    res.status(200).send(signBody);
  });

  // start express server
  app.listen(3000);
});
