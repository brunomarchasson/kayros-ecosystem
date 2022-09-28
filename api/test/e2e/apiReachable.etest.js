const frisby = require('frisby');
const { default: env } = require('../../env');
it('should reject /', function () {
  return frisby.get(env.API_ORIGIN+'/')
    .expect('status', 404);
});
it('should respond to /hello', function () {
  return frisby.get(env.API_ORIGIN+'/hello')
    .expect('status', 200);

});
