const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }else if(error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authtoken = req.get('authorization')
    if(authtoken && authtoken.toLowerCase().startsWith('bearer ')) {
      req.token = authtoken.substring(7)
    }
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}