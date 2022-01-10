import express from 'express';
import userRouter from './userRoute';

const globalRouter = express.Router();
globalRouter.get('/', userRouter);

export default globalRouter;
