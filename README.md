# MERN Stack Project - STONKS
> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

- [Link to PROJECT](https://stonks56.herokuapp.com/signin)

## clone or download
```terminal
$ git@github.com:Kyouma-san/Stonk2.0.git
```

## project structure
```terminal
server/
   package.json
   config/
      prod.js (to store production keys)
      keys.js (to get the final keys from dev.js or prod.js)
      dev.js  (needs to be created if going to run the app on your machine)
   client/
      package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [Node](https://nodejs.org/en/download/) ^16.13.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd server/client   // go to client folder
$ npm i              // npm install packages
$ npm start          // run it locally
```

## Server-side usage(PORT: 5000)

### And the env variables



(You need to add a MONGOURI to connect to MongoDB)

Create a dev.js file inside server/config folder add the following

```terminal
// inside server/config/dev.js
module.exports = {
    MONGOURI: <your MONGOURI>,
    JWT_SECRET: <a random string used to encrypt your passwords>
}
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start   // run it locally
```

## Deploy Server to [Heroku](https://dashboard.heroku.com/)

```
// Create Client prod build
// cd to server/client directory and run following commands
$ npm build     // this will compile the react code and generate a folder called build inside client folder
$ npm run build // this will run the files in build folder
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

Before running the following commands, go to [Heroku](https://dashboard.heroku.com/) and signup if you don't have an account.


Login to your account and create a new app with name  "your-heroku-project-name"

Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) if already not installed
```terminal
// remember to run these command from /server directory
$ pwd  //verify that you are inside server directory
/Users/<your-name>/server 
$ heroku login
$ heroku git:clone -a <your-heroku-project-name>$ cd <your-heroku-project-name>
...
$ git add .
$ git commit -am "<commit message of your choice>"          
$ git push heroku master
```
It'll give you the link where your project is deployed.

### After creating heroku

Remember to add the production env variable in Heroku.
```terminal
 Go to your app settings in Heroku
 Click on "Reveal Config Vars"
 Then add your production JWT_SEC and MONGOURI there
```

# Screenshots of this project

User visit Login, Signup and Home page

![Alt text](signin.png?raw=true "Title")

![Alt text](signup.png?raw=true "Title")



After signing in user can access profile, protfolio and transaction routes.

Profile Route shows the investment overview =>total no. of stocks, invested amount, current ammount and Profit/Loss
![Alt text](profile.png?raw=true "Title")



Portfolio Route shows the stocks that user have in his/her portfolio. User can remove any stock from portfolio.
![Alt text](portfolio.png?raw=true "Title")



Transaction Route shows option to BUY/SELL stocks and also displays last 5 user transactions.

![Alt text](transaction.png?raw=true "Title")
![Alt text](last_5_transactions.png?raw=true "Title")


