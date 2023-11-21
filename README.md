# AMAR IT - A Modern full-stack ISP platform

![Website HomePage](./assets/ss/Amar%20IT%20Banner.png)

## Overview

A modern full-stack web application based on `Nextjs 13.5.5` and `TypeScript` with `JWT` authentication and `Stripe` payment processing.

## Table of Contents

- [Overview](#overview)
- [Links](#links) <!-- - [How to run](#how-to-run) -->
- [Screenshot](#preview)
- [Features](#features)
- [Future Improvements](#future-improvements)
- [Built with](#built-with)

---

## Links

- Live Site Link: [Click Here](https://amar-it-frontend.vercel.app/) to see the Live website.
- Backend Live Site Link: [Click Here](https://amar-it-frontend.vercel.app/) to see the Live backend website.
- Fronted Github Repo: [Click Here](https://github.com/kamrulsaad/amar-it-frontend) to check the frontend github repo for this project.
- Backend Github Repo: [Click Here](https://github.com/kamrulsaad/amar-it-backend) to check the backend github repo for this project.

## Preview

![Homepage](./assets/ss/1.png)

---

<!-- ## How to run

- Clone the project (both client and server side) from the github repo.
- Run `yarn install` to install all the dependencies.
- Run `yarn prisma migrate dev --name init` to migrate the database. (You need to have postgres installed in your system)
- Run `yarn run dev` to run the project. -->

## Features

Users should be able to:

- See a beautiful and responsive landing page
- Login and Signup using username and password
- Choose a service and pay for it using Stripe
- See their booking status and other details in the dashboard
- Cancel or reschedule their booking from the dashboard
- See or update their profile details in the dashboard

Super Admins should be able to:

- Manage admins and admin permissions
- Manage services
- Manage bookings
- Manage customers
- Manage Contents of the landing page
- Manage their own profile

Admins should be able to:

- Manage services
- Manage bookings
- Manage customers
- Manage Contents of the landing page
- Manage their own profile

## Future Improvements

I have tried to implement the project in the best way possible. However, there are many opportunities to improve in this project. Some of them are listed below:

- Automated testing can be implemented.
- Ticketing features can be added to the dashboard.
- Service Feedback features can be added.
- Features like live notifications can be added.
- Role based permissions can be implemented.

## Built With

- [React](https://reactjs.org/) - JS library
- [Next.js 13.5.5](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - JS Superset
- [axios](https://axios-http.com/) - Promise based HTTP client
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Ant Design](https://ant.design/) - UI library
- [React-hook-form](https://react-hook-form.com/) - Forms
- [React-redux](https://react-redux.js.org/) - State Management
- [RTK-query](https://redux-toolkit.js.org/rtk-query/overview) - Data Fetching
- [Zod](https://zod.dev/) - Data Validation
- [Dayjs](https://day.js.org/) - Date Formatting
- [React-countup](https://www.npmjs.com/package/react-countup) - Countup Animation
- [Vercel](https://vercel.com/) - Hosting
- [JWT-decode](https://www.npmjs.com/package/jwt-decode) - JWT Authentication
- [React Stripe Checkout](https://www.npmjs.com/package/react-stripe-checkout) - Stripe Payment Processing
- [EsLint](https://eslint.org/) - Linter
