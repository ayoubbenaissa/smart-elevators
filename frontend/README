# Elevators App (Frontend)

this is a React app for a smart elevator maintenance company

## running code

- Pre-requirements :building_construction: :
  - make sure you have [**nodejs**](https://nodejs.org/en/download) installed in your machine (ideally Long Time Support version)
  - make sure you also have [npm](https://learnubuntu.com/install-npm/)
- create a new `.env` file to manage [ENV variables](https://dev.to/henriqueinonhe/frontend-environment-variables-what-why-and-how-1c1)
  - in the .env file add "VITE_GOOGLE_CLIENT_ID" of your google client id [doc](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)
- Install dependencies:
  - make sure you are under "frontend" folder
  - run `npm install` which will install all app deps
  - run `npm run dev` to start the frontend server (by default it will start on port 3000)

## app routes/endpoints:

- **Home:** simple home page
- **Dashboard:** main dashboard page:
  - contains a chart illustrating different elevators states
  - listing elevators per state
- **Signup** endpoint to create an account
- **Login:** endpoint to login to existing account
  - Google Auth can be used with Signup or Login

### state management:

since this was a small and quick app, I did not use neither Redux or Context API for state managment. <br>
App state management is done via [Redux](https://redux-toolkit.js.org/)

## File structure

- #### `public` - This holds all of our static files
- #### `src`
  - #### `__mocks__` - This folder holds mock utilities used by tests
  - #### `__tests__` - includes main testing logic
  - #### `app` - This folder holds main state management login (store, slices, reducers...)
  - #### `assets` - This folder contains mainly used icon within the app
  - #### `components` - This folder holds all of the different components that will make up our FE app
  - #### `pages` - contains files presenting pages of the app
  - #### `styles` - SCSS files
  - #### `App.*` - This is what renders all of our browser routes and different views
  - #### `main.*` - This is what renders the react app by rendering App
- #### `package.json` - Defines npm behaviors and packages for the client
- #### `README` - This file :grinning:

The Frontend app is bootstrapped via [Vite](https://vitejs.dev/)

**Note:**
This app can surely be improved, specially in terms of reusability & testing :smiling_face_with_tear:

> I should add tests regarding state management logic :thumbsup:
