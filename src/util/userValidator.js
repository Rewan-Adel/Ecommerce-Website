const Ajv = require('ajv')
const ajv = new Ajv()

const user_schema = {
    "type": "object",
    "properties":{
        "fristName": {'type': 'string' },
        "lastName": {'type': 'string' },
        "email": {'type': 'string' },
        "password": {'type': 'string'},
        "street": {'type': 'string'},
        "city":  {'type': 'string'},
    },
}

module.exports = ajv.compile(user_schema)