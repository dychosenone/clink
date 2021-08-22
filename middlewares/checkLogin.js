const checkLogin = () => {
    return (req, res, next) => {
        if (req.session.userId == null) {
            res.status(400).json({message: "User is not logged in."});
        }
        else {
            next();
        }
    }
}

module.exports = checkLogin;