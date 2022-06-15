import * as express from "express";
import { Request, Response } from "express";
import { jwt } from 'jsonwebtoken';
import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { User } from "./entity/user.entity";
import { validate } from './middleware/validate';


// create typeorm connection
DataSource().then(connection => {
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(express.json());
 
  //create jwt authentication
  const createToken = async (body) => {
    const token = await jwt.sign(body, "secrethaiufhbaywegfbwefgwebbcwuicbce", {
        expiresIn: "1h"
    });
    const userVerify =await jwt.verify(token, "secrethaiufhbaywegfbwefgwebbcwuicbce")
    return token
}

  // register routes

  app.get("/users", async function (req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await userRepository.findOne({
      where: { id: req.params.id },
    });
    return res.send(results);
  });

  app.post("/users", validate, async function (req: Request, res: Response) {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await userRepository.findOne({
      where: { id: req.params.id },
    });
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete("/users/:id", validate, async function (req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });
  
  app.post("/login", createToken, async function (req: Request, res: Response) {
    const body = req.body;
    const signBody = createToken(body)
    res.status(200).send(signBody)
    });

  app.all("*", async function (req: Request, res: Response) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return res.status(404).send(fullUrl);
  });

  // start express server
  app.listen(3000);
});
