# CougarCS Admin Portal 💼

CougarCS is the largest student-run Computer Science organization at the University of Houston.
At CougarCS, our mission is to smoothly transition our inexperienced members into young professionals by the end of their degree and to provide support and assistance to members who struggle academically or who need career guidance.

This is the admin portal for **CougarCS**. The portal is designed for officers to manage data of the organization.

The portal is built with NextJS and TypeScript.
The backend is built using NextJS and Typescript which is connected to Supabase. Supabase acts as a authentication and database provider for the portal. The database used is PostgreSQL and hosted on AWS.

<hr/>

![GitHub](https://img.shields.io/github/license/CougarCS/CougarCS-AdminPortal?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/CougarCS/CougarCS-AdminPortal?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/CougarCS/CougarCS-AdminPortal?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/CougarCS/CougarCS-AdminPortal/next?style=flat-square)

# Development 🔨

- #### Requirements

  - [NodeJS](https://nodejs.org/en/) Version 16+
  - [Yarn](https://yarnpkg.com/)

- #### Installation
  1. `yarn` to install packages
  2. Create an `.env` in the root (./) directory with the following variables:
     You can obtain the values for these variables from the Supabase project dashboard.
  ```
    NEXT_PUBLIC_SUPABASE_URL="Supabase public url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="Supabase anonymous key"
  ```
  3. You're good to go!
- #### Scripts
  - `yarn start` : Runs the code normally using next start
  - `yarn dev` : Starts the development server.
  - `yarn build` : Builds the application for production usage.
- #### Linting/Styling
  - This repo uses ESLint and Prettier to enforce linting and styling rules.
  - `yarn lint` : Runs ESLint on the codebase.
  - `yarn prettier` : Runs Prettier on the codebase.
  - `yarn prettier:fix` : Runs Prettier on the codebase and fixes any issues.
  - We highly suggest using an ESLint and Prettier plugin for your respective editor to aid with development.
- #### Structure
  - `_app.tsx` : This is the root component of the application.
  - `./components` : This folder contains all the components used in the application.
  - `./pages` : This folder contains all the pages used in the application.
  - `./public` : This folder contains all the static files used in the application.
  - `./styles` : This folder contains all the styles used in the application.
  - `./types` : This folder contains all the types used in the application.
  - `./utils` : This folder contains all the utility functions used in the application.

<hr/>

# Contributing 🤝

Want to get involved?
Get in contact with the CougarCS Webmaster(webmaster@cougarcs.com) to get involved.
