import { Router } from 'express';
import * as userController from "../controllers/UserController";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

export default router;