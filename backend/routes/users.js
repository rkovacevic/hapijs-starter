var models = require('../models')
var Boom = require('Boom')

module.exports = [{
    method: 'GET',
    path: '/api/users/me',
    handler: function(request, reply) {
        reply({
            username: 'Joe User'
        })
    }
}, {
    method: 'POST',
    path: '/api/users',
    handler: function(request, reply) {
        models.User.create(request.payload)
        .then(user => {
        	delete user.dataValues.password
        	reply(user)
        })
        .catch(error => {
        	var response = Boom.badData('Validation failed')
        	response.output.payload.validationErrors = error.errors
  			reply(response)
  		})
    }
}]