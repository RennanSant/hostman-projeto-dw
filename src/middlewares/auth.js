import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');

    const { userId } = jwt.verify(token, process.env.SECRET);

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).send({ auth: false, message: 'Token invalid.' });
  }
}

export default { isAuthenticated };