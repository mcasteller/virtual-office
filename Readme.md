

## Introduction
This is just a boilerplate project to feature some Node and React related technologies.

## Tech Stack
- Docker
- Node/Express
- Mongoose
- Logging (winston/morgan)
- JWT authentication using Passport.JS
- Sentry
- React (React Context to deal with state management)
- Material UI
- Jest + Enzyme

## Screen capture
![application main view screenshot](https://user-images.githubusercontent.com/5411855/81440346-86422f00-9135-11ea-8f15-474f80891db0.png)


## Summary

- [Run](#run)
- [Project Structure](#Project-Structure)
- [Useful links](#Useful-links)
  - [Set up Express and React](#Set-up-Express-and-React)
  - [Dockerize client and server](#Dockerize-client-and-server)
  - [Logging](#Logging)

## Run
Project is executed using this command over /app folder:

$ docker-compose up --build
or
$ docker-compose -f ./docker-compose.yml up --build

You'll have a backend server listening on localhost:3001 and frontend server listening on localhost:3000. Every code update will generate a page reload.

## Project Structure

### Express Server

Structure is based on express-generator project, on top of that we are trying to:
1. Provide a separate section for server initialization stage (db, routes, logger, etc)
2. Have our business logic divided into components/modules

```
.
└── app
    ├── bin                    
    |   ├── www                   // Node js entry point file
    ├── config                    // configuration files for specific environments
    |   ├── env
    |   |   ├── default.js        
    |   |   ├── development.js
    |   |   ├── local.example.js
    |   |   ├── production.js
    |   |   ├── test.js
    |   ├── config.js             // initialize configuration files
    ├── lib
    |   ├── auth-strategies       // passport.JS strategies
    |   |   ├── google.js
    |   |   ├── jwt.js
    |   ├── error-routes.js       
    |   ├── index.js              // initialize files to deal with server startup
    |   ├── logger.js
    |   ├── middleware.js
    |   ├── mongoose.js
    |   ├── routes.js
    |   ├── security.js
    |   ├── session.js
    ├── modules
    |   ├── users
    |   |   └── users.controller.js
    |   |   └── users.model.js
    |   |   └── users.routes.js
    |   |   └── users.tests.js
    |   ├── models.js             // initialize all models db schemas
    ├── public                    // Hold front end build files
    |   ├── index.html
    |   ├── ...
    |   ├── ...
    |   └── ...
```

Here are some guides I based project structure on:

- https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md
- https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/

### React Client
Client project structure was based on create-react-app project, what is interesting to show is how we deal with React asynchronous operations, using React Context tool. The idea is to have multiple providers to deal with state management.

```
.
└── client
    ├── src                    
    |   ├── components   
    |   |   ├── Header       
    |   |   |   ├── index.js       
    |   |   |   ├── header.test.js       
    |   |   ...       
    |   |   ...       
    |   ├── context   
    |   |   ├── AppProvider       
    |   |   |   ├── actions.js       
    |   |   |   ├── api.js       
    |   |   |   ├── reducer.js       
    |   |   |   └── store.js
    |   |   ...       
    |   |   ...       
    |   ├── layouts           
    |   ├── views   
    ├── App.js
    |   ... 
    |   ...       
```

## Useful links

### Set up Express and React
https://medium.com/@ABiasedHypocrite/simplest-and-fastest-react-express-app-setup-8497ed8db0d1

### Dockerize client and server
https://medium.com/@xiaolishen/develop-in-docker-a-node-backend-and-a-react-front-end-talking-to-each-other-5c522156f634

### Logging
https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications

### VSC Debug configuration
You may want to add this configuration into VSC to debug server code:

```` javascript
  {
    "name": "Docker: My Project",
    "type": "node",
    "request": "attach",
    "port": 9229,
    "address": "localhost",
    "protocol": "inspector",
    "restart": false,
    "sourceMaps": false,
    "outFiles": [],
    "localRoot": "${workspaceFolder}/app",
    "remoteRoot": "/opt/app/myproject-app"
  }
````
