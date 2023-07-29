const Ajv = require('ajv')
const ajv = new Ajv()

const order_schema = {
    "type": "object",
    "properties":{
        "userId": {'type': 'string' },
        "products": {'type': 'array' } ,
        //[
    //         {'type': 'string' },
    //         {'type': 'number' },
    //     ],
    "amount": { "type":"string"},
    "address":{"type": "string"},
    "stats":{"type": "string"},
    },
}

module.exports = ajv.compile(order_schema)