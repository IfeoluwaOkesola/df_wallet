import { Container } from 'typedi';
import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
const authRouter = Router();
const authController = Container.get(AuthController)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration endpoint
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: Registration successful.
 *       400:
 *         description: Invalid request data.
 */

authRouter.post("/register", async (req: Request, res: Response) => {
    authController.register(req,res)
});

authRouter.put("/email/verification", async (req: Request, res: Response) => {
    authController.verifyEmail(req, res)
});

authRouter.post("/login", async (req: Request, res: Response) => {
    authController.login(req, res)
});

export default authRouter;