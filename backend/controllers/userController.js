const getAllUsers = (req, res) => {

    res.json({
        success: true,
        message: "API Working Successfully"
    });

};

module.exports = {
    getAllUsers
};