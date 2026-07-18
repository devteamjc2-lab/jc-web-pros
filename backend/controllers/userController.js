const getDbPool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
     try {

        console.log("Login API called");
        const { email, password } = req.body;
        const pool = await getDbPool();
        
        const [rows] = await pool.execute("SELECT * FROM jc_web_pros_users WHERE email = ?",[email]);
        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            });
            }
            const user = rows[0];
           const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Email or Password",
                });
                } 
                const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }
                );
                return res.status(200).json({
                success: true,
                message: "Login Successful",
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                });
            }
            catch (error) {
                console.error(error);

                return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                });
            }
        };

   const getAllUsers = async (req, res) => {
            try {
                const pool = await getDbPool();
                const [rows] = await pool.execute("SELECT id, name, email, role FROM jc_web_pros_users");
                return res.status(200).json({
                    success: true,
                    message: "Users retrieved successfully",
                    users: rows,
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                });
            }
        };

module.exports = {
    login,
    getAllUsers,
};