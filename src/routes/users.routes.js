import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/',(req, res) => {
  res.send('Hi user!');
})

export default usersRouter;