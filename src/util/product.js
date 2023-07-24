const Ajv = require('ajv')
const ajv = new Ajv()

const product_schema = {
    "type": "object",
    "properties":{
        //"brand":{"type":"string"},
        "name": {'type': 'string' },
        "category": {'type': 'string' },
        "description": { "type":"string"},
       // "avatar": {'type': 'buffer'},
       "price":{"type": "string"}
    },
    // "required": ['name',
    //     'category',
    //     'description',
    //     'price'] 
}

module.exports = ajv.compile(product_schema)