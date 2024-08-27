# client

Represents Svelte-based frontend service

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

> To generate Dto's from API Swagger

1. User

```bash
    npx swagger-typescript-api@12.0.4 -p https://localhost:7008/swagger/v1/swagger.json -o ./src/lib/api -n apiUser.ts --module-name-index 1 -t src/swagger-templates/
    npx swagger-typescript-api@12.0.4 -p https://localhost:7238/swagger/v1/swagger.json -o ./src/lib/api -n apiNotification.ts --module-name-index 1 -t src/swagger-templates/
    npx swagger-typescript-api@12.0.4 -p https://localhost:7185/swagger/v1/swagger.json -o ./src/lib/api -n apiAccommodation.ts --module-name-index 1 -t src/swagger-templates/
    npx swagger-typescript-api@12.0.4 -p https://localhost:7119/swagger/v1/swagger.json -o ./src/lib/api -n apiReview.ts --module-name-index 1 -t src/swagger-templates/
```
