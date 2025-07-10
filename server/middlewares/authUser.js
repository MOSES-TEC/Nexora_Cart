import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    // const {token} = req.cookies;

    let token = req.cookies.token;
    
    if (!token) {
        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1];
    }

    if(!token){
        return res.json({ success: false, message: 'Not Authorized'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id) {
            // req.body.userId = tokenDecode.id;
            req.user = { id: tokenDecode.id }; 
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized'});
        }
        // next();

    } catch (error) {
        res.json({ success: false, message: error.message });   
    }
};

export default authUser;



