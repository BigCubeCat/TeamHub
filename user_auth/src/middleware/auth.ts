import jwt from 'jsonwebtoken';
import { config } from '../config';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')

  try {
    const data = jwt.verify(token, config.JWT_SECRET)

    if (!user) {
      throw new Error()
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}

module.exports = auth
