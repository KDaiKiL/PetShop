const log = (req, res, next) => {
    if(req.session.logado){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = log