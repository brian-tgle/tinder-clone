# Simple Tinder web app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
![Screenshot](https://user-images.githubusercontent.com/84697800/120880548-9c027c00-c5f5-11eb-9dc7-a303579c501f.png)
![Screenshot](https://user-images.githubusercontent.com/84697800/121123239-1547dc00-c84d-11eb-84fa-0a44ad4a0fcd.png)

## Demo

<figure class="video_container">
  <iframe src="https://youtu.be/P_ljfKB3U8Q" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Feature
- Like
- Pass
- View history

## Built with:
- **NodeJS/MongoDB**: For server side. (Node 10+)
- **ReactJS**: For client side. (React 17.x)
- 💡 **TypeScript**: A language for application-scale JavaScript
- 💎 **Hooks**: Use react hooks API instead of traditional class API
- 🚀 **State of The Art Development**: Newest development stack of NodeJS/React/Hooks/React Sweet State/Typescript
- **react-sweet-state** for state management
- **husky/lint-staged** for checking before commiting and pushing (check it out in ```husky``` and ```lint-staged``` section in ```package.json```)
- **stylelint** for checking style convention
- **jest** framework and runner, **react-test-renderer**, **enzyme** are test utilities
- **localForage** for improving the offline experience by using asynchronous storage

## 📦 Install

```bash
$ git clone https://github.com/brian-tgle/tinder-clone.git
$ cd tinder-clone
```
### Start server
```bash
$ cd server
$ npm install
$ node server
```
Server live on: http://localhost:4000/
Exposed API:
```bash
GET: /user                  Get users list
```
```bash
GET: /user/{userId}         Get Full profile
```
```bash
POST: /user/like            Mark a user as liked
```
```bash
POST: /user/pass            Mark a user as not liked
```
```bash
POST: /history              Get the list of people have liked or passed so far 
```
### Start client
```bash
$ npm install
$ npm start
```
Client live on: http://localhost:3000/

## 🔨 Build

```bash
npm install
npm run build
```

## 🖥 Browsers support

Modern browsers and Internet Explorer 10+.

## IDE Settings
Current setting available: auto fixing and linting code on save.
Check it out in ```.vscode/settings.json```.
