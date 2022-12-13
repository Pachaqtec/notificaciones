const jwt = require('jsonwebtoken');
const pool = require('../config/dbConnectMySql');

const verifyToken = async (req, res, next) => {
  let token = '';

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const query = 'SELECT * FROM usuario u WHERE u.idusuario = ?';
      const [user] = await pool.query(query, [decoded.userId]);
      req.user = user[0];

      return next();
    } catch (error) {
      console.log(error.message);
      if (error.message === 'jwt expired') {
        return res.status(403).json({
          msg: 'Sesión expirada',
        });
      }
      return res.status(401).json({ msg: 'No Autorizado' });
    }
  }

  if (!token) {
    return res.status(404).json({ msg: 'No hay token en la peticion' });
  }
};

module.exports = { verifyToken };
