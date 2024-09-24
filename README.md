# Secure local data (example)

This application is an example of securing local data using the [CryptoJS](https://www.npmjs.com/package/crypto-js)  library.

In this example, private notes are protected with an encryption key and encryption IV with a local password one-way AES encrypted using password + name combination as encryption. Everything regarding the encryption mechanism is placed into a single service at `/src/lib/services/LocalStorageService.ts`.

## How to run project locally
- Clone repository
- Install node modules using `npm install` command
- Create one `.env.local` file with keys as in `.env.example`
- Run the app using `npm run dev`