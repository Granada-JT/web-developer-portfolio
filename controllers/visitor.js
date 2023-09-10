const Visitor = require ("../models/Visitor");
const moment = require('moment-timezone');
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.saveVisitorDetails = (req, res) => {

    const details = {
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        contactNo: req.body.contactNo,
        message: req.body.message,
        sentOn: moment().tz('Asia/Manila').toDate()
    }

    const form = new Visitor(details);
    form.save()
        .then(() => res.send(true))
        .catch((err) => res.status(500).send(false));
};

module.exports.loginKey = (req, res) => {

    const loginKey2 = bcrypt.hashSync("104985LKMLoriioyDSJoiaudskfmei1234@#$@#$", 10);
    const isLoginKeyCorrect = bcrypt.compareSync(req.body.loginKey, loginKey2);

    if (isLoginKeyCorrect === true) {
        const accessToken = auth.createAccessToken(req.user);
        return res.send({ access: accessToken});
    } else {
        return res.send(false);
    }
    
}