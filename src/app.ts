import * as express from "express";
import { Request, Response } from "express";
import { jwt } from "jsonwebtoken";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/user.entity";

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

// create typeorm connection
AppDataSource.initialize().then(async () => {
  // create and setup express app
  const app = express();
  app.use(express.json());

  // console.log("Inserting a new user into the database...");
  // const user = new User();
  // user.username = "Timber";
  // user.password = "Saw";
  // await AppDataSource.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);

  // register routes
  app.post("/login", createToken, async function (req: Request, res: Response) {
    const body = req.body;
    const signBody = createToken(body);
    res.status(200).send(signBody);
  });

  app.all("*", async function (req: Request, res: Response) {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    return res.status(404).send(fullUrl);
  });

  // start express server
  app.listen(3000);
});
