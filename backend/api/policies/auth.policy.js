// JWT token checks
const JWTService = require('../services/auth.service');

// Following should be found in the request header:
// "Authorization: Bearer [token]" or "token: [token]"
module.exports = (req, res, next) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({ message: 'Format pour l\'entête de requête : Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ message: 'Format pour l\'entête de requête : Authorization: Bearer [token]' });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ message: 'Pas de jeton présent dans l\'entête de requête' });
  }

  return JWTService().verify(tokenToVerify, '', (err, thisToken) => {
    if (err) {
      if (err.message === 'invalid token') {
        const messageToken = 'Token invalide - authentification rejetée';
        return res.status(401).json({ message: messageToken });
      }
      return res.status(401).json({ message: err.message });
    }
    req.token = thisToken;
    return next();
  });
};
