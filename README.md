# Dev Admin

I've built this tool as a way to store and use development, test and production websites, useful for keeping track of a lot of different website. Used the Nuxt.js framework to build this as I had experience of working with Vue.js. 

## Install software
### NodeJS
- Install in ubuntu
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```
- Install in MacOS via brew 
```
brew install node
```
### Nuxt
- Install via NPM
```
sudo npm install -g nuxt
```
### Dev Admin API
Go to https://github.com/meshu-dev/devadmin-api then follow install and setup instructions

## Setup 
- Install npm packages
```
npm install
```
- Copy the .env.example file to a new file named .env
```
cp .env.example .env.development
```
- Fill in .env variables in new file
    - API_URL change to URL used for Dev Admin API
```
URL=localhost
PORT=3000
API_URL=https://localhost:8000
ITEMS_PER_PAGE=10
```
## Commands
- Run app in development
```
npm run nodemon
```
- Build files
```
nuxt build
```
- Run app using built files
```
nuxt start
```
