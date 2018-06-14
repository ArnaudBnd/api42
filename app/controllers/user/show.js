// Core
const mock = require('../../models/get-user.js')
const schemaUser = require('../../models/schemaUser.js')

module.exports = class Show {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.get('/user/show/:id', (req, res) => {

      schemaUser.find({_id: req.params.id}).exec().then(resp => {
        if (resp.n === 0) {
          res.status(400).json({
            'code': 400,
            'message': 'Bad request'
          })
        } else {
          res.status(200).json({
            resp,
            'code': 200,
            'message': 'Good request'
          }).catch(err => {
          res.status(400).json({
            'code': 400,
            'message': 'Bad request'
          })
        })
        }
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
