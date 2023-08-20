# Ecommerce  Website
Ecommerce is web application that allows users to buy any product and adding their favorite product to wishlist. 
users can gave us their opinion about product (review). 

you can visit the website from here: https://ecommerce-client-rho.vercel.app/ .

### Features
User can :
- visit the websites, sign up and login to the website. 
- forgot password and reset password via his/her email. 
- he/she can check all the products available for shopping.
- filter and search item.
- doing review about the product.
- adding their favorite product to wishlist.
- doing shopping operation.

a admin can:
- adding any product to the store, updating the items, removing the item from the store.
- delete user, get all users. 
- search for users by any key.
- control of the role (admin or user).  

### Configuration

1. Create a .env file 
2. add configuration variables:

```markdown file
NODE_ENV =development
PORT = 8080
MONGO_URI  = your_database_uri
JWT_SECRET = jesonwebtoken_secret_key
CLOUD_NAME = your_cloud_name
CLOUD_KEY  = your_cloud_key_
CLOUD_KEY_SECRET= your_cloud_secret_key
SENDGRID_API_KEY = your_sendgrid_api_key
```

# Usage
- Run npm install to install dependencies
- Run npm start to start the local server
- Load http://localhost:8080 to test the endpoint
- postman url for testing https://www.postman.com/telecoms-specialist-16112359/workspace/online-store-site/

# Languages & tools
- Node.js
- express
- mongoose
