

function logger(req, res, next) {
    req ?  console.log('Express Logger req', req.method, req.path ) : console.log('Express Logger res', res.body )
    next()
 }

 module.exports =   logger
 