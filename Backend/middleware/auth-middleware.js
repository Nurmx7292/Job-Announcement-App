const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userInfo = decodedToken;
        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({ success: false, message: "Invalid token." });
    }
};

module.exports = authMiddleware;
