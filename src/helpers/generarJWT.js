const jwt = require('jsonwebtoken');

const generarJWT = (id = '') => {
	return new Promise((resolve, reject) => {
		const payload = { userId: id };

		jwt.sign(
			payload,
			process.env.SECRET_KEY,
			{
				expiresIn: '1d',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject(new Error('No se puedo generar el token'));
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generarJWT,
};
