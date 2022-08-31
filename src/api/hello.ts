import { VercelRequest, VercelResponse } from '@vercel/node';

export default (_req: VercelRequest, res: VercelResponse) => {
  return res.send('Hello World');
};
