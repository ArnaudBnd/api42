// Core
const schemaUser = require('../../models/schemaUser.js')
const validator = require('node-validator')

const check = validator.isObject()
  //.withRequired('ids', validator.isArray())

module.exports = class Search {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.get('/user/search/:word', validator.express(check), (req, res) => {
        const { word } = req.params

        schemaUser.find({
          $and: [
            {
              $or: [
                {
                  'name': { $regex: word }
                },
                {
                  'gender': { $regex: word }
                }
              ]
            }
          ]
        }).exec().then(data => {
          res.status(200).json({
            'data': data,
            'code': 200,
            'message': 'Good request'
          })
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
