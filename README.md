# CougarCS Admin Portal 💼

CougarCS is the largest student-run Computer Science organization at the University of Houston.
At CougarCS, our mission is to smoothly transition our inexperienced members into young professionals by the end of their degree and to provide support and assistance to members who struggle academically or who need career guidance.

<hr/>

![GitHub](https://img.shields.io/github/license/CougarCS/CougarCS-AdminPortal?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/CougarCS/CougarCS-AdminPortal?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/CougarCS/CougarCS-AdminPortal?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/CougarCS/CougarCS-AdminPortal/next?style=flat-square)

# Introduction 📖

Our open source project for **CougarCS** is an application that assists officers in efficiently managing member and event data. We aim to streamline the process of member management and event organization, reducing the manual work required and allowing officers to focus on more strategic tasks. This application is designed to be user-friendly, efficient, and effective, making the management of members and events a breeze.

# Technology Stack 💻

The CougarCS Admin Portal is built using a variety of technologies:

- **Frontend**: The portal is built with Next.js and TypeScript.

- **Backend**: The backend is built with Next.js and TypeScript.

- **Database**: The database used is PostgreSQL, provided by Supabase. Supabase not only serves as our database provider but also handles authentication for the portal.

- **Cloud Provider**: AWS (Amazon Web Services) is our cloud provider, hosting our database.

# Development 🔨

- #### Requirements

  - [NodeJS](https://nodejs.org/en/) Version 16+
  - [npm](https://www.npmjs.com/)

- #### Installation

  1. `npm i` to install packages
  2. Create an `.env` in the root (./) directory with the following variables:
     You can obtain the values for these variables from the Supabase project dashboard.

  ```
    NEXT_PUBLIC_SUPABASE_URL="Supabase public url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="Supabase anonymous key"
  ```

  3. You're good to go!

- #### Scripts

  - `npm start` : Runs the code normally using next start
  - `npm run dev` : Starts the development server.
  - `npm run build` : Builds the application for production usage.

- #### Linting/Styling

  - This repo uses ESLint and Prettier to enforce linting and styling rules.
  - `npm run lint` : Runs ESLint on the codebase.
  - `npm run prettier` : Runs Prettier on the codebase.
  - `npm run prettier:fix` : Runs Prettier on the codebase and fixes any issues.
  - We highly suggest using an ESLint and Prettier plugin for your respective editor to aid with development.
  - Enable prettier: require config in settings so you use the .prettierrc file.

- #### Structure
  - `_app.tsx` : This is the root component of the application.
  - `./components` : This folder contains all the components used in the application.
  - `./pages` : This folder contains all the pages used in the application.
  - `./public` : This folder contains all the static files used in the application.
  - `./styles` : This folder contains all the styles used in the application.
  - `./types` : This folder contains all the types used in the application.
  - `./utils` : This folder contains all the utility functions used in the application.
  - `./__tests__`: This folder contains all the tests used in the application.

# Contributing 🤝

We welcome contributions from everyone. If you're interested in contributing to our project, you can do so by making a pull request. Here's how:

1. Fork the repository to your own GitHub account.
2. Clone the forked repository to your local machine.
3. Make your changes and commit them to your local repository.
4. Push the changes to your forked repository.
5. From your forked repository, create a new pull request.

Once your pull request is reviewed and approved, it will be merged into the main repository. Thank you for your contribution!

## Tips for Forks

#### Forking the Repository

1. Navigate to the [CougarCS Admin Portal GitHub repository](https://github.com/CougarCS/CougarCS-AdminPortal).
2. In the top-right corner of the page, click the "Fork" button. This will create a copy of the repository in your GitHub account.
3. Now, you have your own copy of the original repository. You can clone it to your local machine to make changes.

#### Syncing a Fork

- [Configuring a remote for a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-repository-for-a-fork)
- [Syncing a Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)

1. Go to your forked repository on GitHub
2. Select the Sync fork drop down menu and then click Update branch.
3. Run the following commands in your terminal

```
git remote add upstream https://github.com/CougarCS/CougarCS-AdminPortal.git
git fetch upstream
git checkout main
git merge upstream/main
```

# Need Help? 🆘

If you encounter any problems or have any questions about this project, please feel free to contact us. You can get in touch with the CougarCS Webmaster at webmaster@cougarcs.com.
