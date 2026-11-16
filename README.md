# Task Management Dashboard

An Angular frontend for creating and tracking tasks, with a dashboard showing
completion statistics. It connects to the sibling
[Spring Boot API](../task-management-api) for authentication and task data.

## Features

- Login form with required username and password fields.
- JWT storage after login and automatic bearer-token headers on HTTP requests.
- Dashboard showing total, completed, and pending tasks, plus completion percentage.
- Task creation with required title and description fields.
- Task list with completion toggling and deletion.
- An edit route that loads an existing task into the form. Saving edits is not
  implemented correctly yet; see [Current limitations](#current-limitations).

## Tech stack

| Technology | Purpose |
| --- | --- |
| Angular 22 | Standalone components, routing, and HTTP requests |
| TypeScript 6 | Application logic and types |
| Angular signals | Task state and computed dashboard statistics |
| Reactive Forms | Login and task forms |
| RxJS | Asynchronous HTTP responses |
| SCSS | Component and application styling |
| Vitest | Unit test runner |

## Prerequisites

- Node.js compatible with the project's Angular dependencies:
  `^22.22.3`, `^24.15.0`, or `>=26.0.0`.
- npm; the project declares `npm@12.2.0`.
- The backend running at `http://localhost:8080`, with its database and
  authentication configuration set up.

The backend must allow browser requests from `http://localhost:4200`, including
the `Authorization` header and the HTTP methods used below.

## Getting started

Open a terminal in this dashboard directory. If you are in the parent
`Task-Management-app` directory, first run:

```powershell
cd .\Task-management-dashboard
```

Install the frontend dependencies:

```powershell
npm ci
```

Start the backend separately, then start the Angular development server:

```powershell
npm start
```

Open <http://localhost:4200>. The root route redirects to `/login`.
Use an account configured in your backend. After a successful login, the app
stores the returned token and opens `/dashboard`.

The development server automatically reloads when source files change.

## Routes

| Route | Screen |
| --- | --- |
| `/` | Redirects to `/login` |
| `/login` | Login form |
| `/dashboard` | Task statistics and an Add Task button |
| `/tasks` | Task list with completion, deletion, and edit controls |
| `/task-form` | New task form |
| `/task-form/:id` | Existing task loaded into the form |

## Backend integration

The frontend currently uses these hard-coded URLs:

| Service | URL | Source |
| --- | --- | --- |
| Authentication | `http://localhost:8080/api/auth/login` | [auth.ts](src/app/services/auth.ts) |
| Tasks | `http://localhost:8080/api/tasks` | [task.ts](src/app/services/task.ts) |

Update those service files if your backend runs at a different address.

### API requests used by the frontend

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Submit username and password; expects a response containing `token` |
| `GET` | `/api/tasks` | Load tasks |
| `GET` | `/api/tasks/{id}` | Load one task |
| `POST` | `/api/tasks` | Create a task |
| `PATCH` | `/api/tasks/{id}` | Update task fields, including completion status |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

Task data follows this interface:

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
```

### Authentication flow

1. The login form sends credentials to the backend.
2. The backend returns a JWT in the `token` response field.
3. The frontend stores it in `localStorage` under the key `token`.
4. The registered [auth interceptor](src/app/interceptors/auth.interceptor.ts)
   adds `Authorization: Bearer <token>` to outgoing Angular HTTP requests
   whenever a token exists.
5. The backend is responsible for validating the token and enforcing access rules.

Do not commit real credentials or tokens. The frontend does not need the backend's
JWT signing secret.

## Project structure

```text
src/
  app/
    features/
      dashboard/       Task counts and completion percentage
      login/           Login form and token storage
      task-form/       Task creation and existing-task loading
      task-list/       Task list and actions
    interceptors/      Authorization header handling
    models/            Task and login interfaces
    services/          Authentication and task API calls
    app.config.ts      Router and HTTP interceptor registration
    app.routes.ts      Route definitions
  styles.scss          Global styles
```

## Development commands

Run these commands from the dashboard directory:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run watch` | Rebuild on changes using the development configuration |
| `npm test` | Run unit tests with the configured Angular/Vitest runner |
| `npm test -- --watch=false` | Run unit tests once without watch mode |

For production hosting, configure the web server to serve `index.html` for
client-side routes such as `/dashboard`.

## Current limitations

- The edit form loads an existing task, but submission still calls the create
  method instead of updating that task.
- Routes do not currently use authentication guards. Backend authorization is
  still required even if guards are added later.
- Logout and automatic token-expiration handling are not implemented.
- The interceptor attaches the token to all Angular HTTP requests, not only
  requests to this API. Restrict its destination before adding external services.
- API addresses are hard-coded rather than environment-specific.
- `json-server` and a local `db.json` are present, but the current services target
  the Spring Boot API, not a local mock server.

## Troubleshooting

- **Cannot connect or HTTP status 0:** check that the backend is running on port
  `8080`, and inspect the browser Network panel for connection or CORS errors.
- **401 Unauthorized:** confirm the login credentials or sign in again if the
  stored token has expired. Verify that the backend accepts bearer tokens.
- **403 Forbidden on task changes:** inspect backend authorization and CSRF
  requirements; sending a JWT alone does not satisfy a separate CSRF check.
- **Dashboard or task list does not load:** inspect requests to `/api/tasks`
  and check the backend logs.
- **Angular CLI reports an unsupported Node.js version:** check `node --version`
  against the versions listed in [Prerequisites](#prerequisites).
