// Core
const mock = require('../../models/get-user.js')
const validator = require('node-validator')
const schemaUser = require('../../models/schemaUser.js')


const check = validator.isObject()
  .withRequired('name', validator.isString())
  .withOptional('gender', validator.isString({ regex: /^male|femal$/ }))

module.exports = class Update {
  constructor (app) {
    this.app = app


    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.put('/user/update/:id', validator.express(check), (req, res) => {

        schemaUser.update({
          _id: req.params.id
        }, {
          $set: {
            name: req.body.name,
            gender: req.body.gender
          }
        }).exec().then(resp => {
        if (resp.n === 0) {
          res.status(400).json({
            'code': 400,
            'message': 'Bad request'
          })
        } else {
          res.status(200).json({
            'code': 200,
            'message': 'Good request'
          })
        }
        })
        .catch(err => {
          res.status(400).json({
            'code': 400,
            'message': 'Bad request'
          })
        })
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}
