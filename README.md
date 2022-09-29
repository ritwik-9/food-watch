# FoodWatch

FoodWatch is a simple app for helping households cut down on food waste, helping the planet and also their pockets!

## Setup

You will need the following to build and test the project:

* [Node.JS v16](https://nodejs.org/en/)
* [Yarn Package Manager](https://yarnpkg.com/getting-started/install)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)

Once installed, simply run `yarn install` and `yarn start` to begin the development server for testing and debugging. Any changes to the project you make will be automatically compiled and pushed to your test device.

## Project Structure

* `assets/` - Static assets, such as images and fonts, which are used in the app or by Expo when packaging the app.
* `components/` - This folder is for reusable components which may be useful on multiple different screens, so have been separated out from their original views.
* `features/` - This folder is for Redux 'slices', which manage Redux state information for use across multiple different screens.
* `model/` - This folder is for data model objects which describe the data we use in the app and have no UI logic.
* `screens/` - This folder is for each of the navigable screens in our app. Each screen should have it's own file. Screens may have their own internal routers, such as in `AddFood.tsx` which presents as a modal.
* `App.tsx` - The entrypoint of the app, holding the root stack navigator for the other screens.
* `hooks.ts` - App-specific versions of standard React hooks, provided for easier typing with TypeScript.
* `store.ts` - The Redux store definition which is comprised of the slices defined in `features/`. Not used in other components directly, but via the hooks in `hooks.ts`.
