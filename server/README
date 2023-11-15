# Elevators App (Backend)

this is a Node app for a smart elevator maintenance company

## running code

- Pre-requirements :building_construction: :
  - make sure you have [**nodejs**](https://nodejs.org/en/download) installed in your machine (ideally Long Time Support version)
  - make sure you also have [npm](https://learnubuntu.com/install-npm/)
- create a new `.env` file to manage [ENV variables](https://dev.to/henriqueinonhe/frontend-environment-variables-what-why-and-how-1c1) and add:
  - **MONGODB_URI** which represents your mongo atlas UI
  - **PORT** presents port on which the app will run
  - **JWT_SECRET** secret to be used to hash credentials (passwords)
- Install dependencies:
  - make sure you are under "frontend" folder
  - run `npm install` which will install all app deps
  - run `npm start` to start the frontend server (by default it will start on port 3000)

## app routes:

- **/auth:** authentication endpoint (signup & login)
- **/elevators:** endpoint managing elevators resources (create and read operations for now)

### state management:

since this was a small and quick app, I did not use neither Redux or Context API for state managment. <br>
App state management is done via [Redux](https://redux-toolkit.js.org/)

## File structure

- #### `src`
  - #### `__mocks__` - This folder holds mock utilities used by tests
  - #### `__tests__` - includes main testing logic
  - #### `api` - This folder holds main logic for the different resources (elevators & users)
    - ##### `elevators` - folder including all logic for elevators resource (model, controller/service, route)
    - ##### `users` - folder including all logic for users resource (model, controller/service, route)
  - #### `middleware` - This folder contains main auth middleware logic (which will decide on elevators resource access)
  - #### `index.ts` - app index fil
- #### `package.json` - Defines npm behaviors and packages for the client
- #### `README` - This file :grinning:

**Note:**

> This app can surely be improved, specially in terms of testing :smiling_face_with_tear: <br>
> Also typing can be improved
