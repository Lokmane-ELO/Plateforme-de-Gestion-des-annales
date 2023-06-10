const jwt = require('jsonwebtoken');

function authorize(role) {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, 'your_secret_key', (err, user) => {
                if (err) {
                    console.log('JWT verification error:', err);
                    return res.sendStatus(403);
                }

                console.log('Decoded JWT:', user); // Ajouter ceci pour le débogage

                req.user = user;

                // Vérifiez si le rôle de l'utilisateur correspond au rôle attendu
                if (user.role !== role) {
                    console.log('User role does not match expected role:', user.role); // Ajouter ceci pour le débogage
                    return res.sendStatus(403);
                }

                next();
            });
        } else {
            console.log('No authorization header'); // Ajouter ceci pour le débogage
            res.sendStatus(401);
        }
    }
}

module.exports = authorize;
