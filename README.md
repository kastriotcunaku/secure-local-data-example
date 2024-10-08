# Secure local data (example) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/ae396768-e658-4f90-b2b5-12d817446d19/deploy-status)](https://app.netlify.com/sites/secure-local-data/deploys)


This application is an example of securing local data using the [CryptoJS](https://www.npmjs.com/package/crypto-js)  library.

In this example, private notes are protected with an encryption key and encryption IV with a local password one-way AES encrypted using password + name combination as encryption. Everything regarding the encryption mechanism is placed into a single service at `/src/lib/services/LocalStorageService.ts`.

## Features
- Everything is offline
- User can setup private notes app using name and password
- After setup, the user can add private notes - all notes are encrypted
- Closing the page, or changing tabs will auto-lock the app
- User can unlock the app **ONLY** using its password, otherwise, app reset can be done, by deleting the existing setup

## How to run project locally
- Clone repository
- Install node modules using `npm install` command
- Run the app using `npm run dev`