## 👋 Hey there, I am Het Desai.

### Checkout website [here](http://mycvmaker.site/)

### Table of content

| No. | Questions                                                                                                                                                                                                                        |
| --- | -----------------------------------------------------------------|
| 1   | [Current Phase](#1-current-phase)
| 2   | [Installing App](#2-installing-app)
| 3   | [Available Scripts](#3-available-scripts)
| 4   | [Learn More](#4-learn-more)
| 5   | [npm run build fails to minify](#5-npm-run-build-fails-to-minify)

### 1. Current Phase:
1. Add `E2E Testing` in pipeline
2. Convert to `Typescript`
3. Switch to `Redux` for state management
4. Improve `User Interaction`
5. Remove `bad practices`

### 2. Installing App:

##### MyCVMaker app has two components. You will need both components to perfectly run the website.

1. [FrontEnd](https://github.com/devhd9/MyCVMaker-FrontEnd)
2. [Backend](https://github.com/devhd9/MyCVMaker-Backend)

**Tip**: First setup backend then do frontend.

##### Follow the below steps to run `React App` on your local system:

##### Option 1: If you just want to run app on your local, use docker.

0. `cd` into root directory of repository
1. Create `.env` file according to `.env.example` file
2. Run: `docker build . -t <IMAGE_NAME>:<TAG>`
3. Run: `docker run --env-file .env -p 3000:3000 <IMAGE>`

##### Option 2: Running app without docker.

###### You will need Node Js with specific version mentioned in `package.json`

0. `cd` into root directory of repository
1. Create `.env` file according to `.env.example` file
2. Run: `npm ci`
3. Run: `npm start`

##### The app will be available on [http://localhost:3000](http://localhost:3000)

### 3. Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build:production`

It will require `.env.production` file having variables mentioned in `.env.example`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### 4. Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### 5. `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
