const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


// Used to sign and confirm if the token is recognized and authenticated by our server app.
const secret = "EROoduflkUOUK1904398509";


// Token Creation
module.exports.createAccessToken = () => {

	let hashedLoginKey = bcrypt.hashSync("104985LKMLoriioyDSJoiaudskfmei1234@##$",10);

	const data = {
	  loginKey: `${hashedLoginKey}`
	};

	return jwt.sign(data, secret, {});
};


// Token Verification
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(typeof token === "undefined") {
		return res.send({auth: "Failed. No Token received."});
	} else {
		token = token.slice(7, token.length);
	}

	// Token decryption
	jwt.verify(token, secret, function(err, decodedToken) {
		if(err) {
			return res.send({
				auth: "Failed",
				message: err.message
			});

		} else {
			console.log(decodedToken);

			req.user = decodedToken;
			next();
		}
	})
};





