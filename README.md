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
    npx swagger-typescript-api@13.0.2 -p http://localhost:5033/swagger/v1/swagger.json -o ./src/lib/api -n apiUser.ts --module-name-index 3 -t src/swagger-templates/
```
