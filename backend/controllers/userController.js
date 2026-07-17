const login = async (req, res) => {
    console.log("Login API called");

    const { email, password } = req.body;

    res.json({
        success: true,
        message: "Login Successful",
        email,
        password
    });
};

const register = async (req, res) => {
    res.json({
        success: true,
        message: "Register Successful"
    });
};

module.exports = {
    login,
    register
};