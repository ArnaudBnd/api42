const validator = require('node-validator')
const schemaUser = require('../../models/schemaUser.js')

const check = validator.isObject()
  .withRequired('name', validator.isString())
  //.withOptional('age', validator.isNumber())
  .withOptional('gender', validator.isString({ regex: /^male|femal$/ }))

module.exports = class Create {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/user/create', validator.express(check), (req, res) => {
      try {

        var user = new schemaUser({ name: req.body.name, gender: req.body.gender });

        user.save();

        res.status(200).json(user || {
          'code': 200,
          'message': 'Good request'
        })
      } catch (e) {
        console.error(`[ERROR] user/create -> ${e}`)
        res.status(400).json({
          'code': 400,
          'message': 'Bad request'
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}
