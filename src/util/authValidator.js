const AJV = require("ajv")
const ajv = new AJV()

const authSchema = {
    "type": "object",
    "properties":{
        "email": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": ["email", "password"]
}

module.exports = ajv.compile(authSchema)