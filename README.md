# La Derive Travel - Reservation Email API

This is a Node.js backend for sending reservation details to `sales@laderivetravel.com` via email using Nodemailer.

## How to Use

- POST to `/send-reservation` with:
  - name
  - email
  - phone
  - guests
  - date
  - destination

## Deploy via Render

1. Push this repo to GitHub.
2. Connect it on https://render.com.
3. Use `npm install` as build command.
4. Use `node server.js` as start command.
