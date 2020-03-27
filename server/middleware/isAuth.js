 const isAuth = (req, res) => {
    if (req.cookies) console.log(`Cookies: ${req.cookies}`)
}
module.exports = isAuth