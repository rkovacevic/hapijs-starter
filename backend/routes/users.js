module.exports = [{
    method: 'GET',
    path: '/api/users/me',
    handler: function(request, reply) {
        reply({
            username: 'Joe User'
        })
    }
}, {
    method: 'GET',
    path: '/api/users/{id}',
    handler: function(request, reply) {
        reply({
            username: 'Joe User'
        })
    }
}]