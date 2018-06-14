// Core
const schemaUser = require('../../models/schemaUser.js')

module.exports = class Destroy {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.delete('/user/destroy/:id', (req, res) => {

        schemaUser.deleteOne({_id: req.params.id}).exec().then(resp => {
        if (resp.n === 0) {
          res.status(400).json({
            'code': 400,
            'message': 'Bad request'
          })
        } else {
          res.status(200).json({
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
