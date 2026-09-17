# Admin Dashboard Architecture

The Admin Dashboard is a frontend-only administrative client. It communicates
with the Marketplace API Gateway through the configured gateway URL and never
connects directly to PostgreSQL, Redis, payment providers, communication
providers, private service databases, or infrastructure APIs.

## Responsibility boundary

The dashboard owns:

- authorized administrator views and operational controls
- loading, error, empty, and responsive UI states
- client-side request validation and response parsing
- API Gateway request orchestration
- local navigation and presentation-neutral UI state

The dashboard does not own:

- authentication or administrator provisioning
- server-side authorization or business rules
- payment processing, escrow, refunds, or withdrawals
- notifications, calls, messaging, or WebSocket infrastructure
- audit persistence, monitoring, security controls, or databases

Administrative actions are sent to the API Gateway. The backend services behind
the gateway record audit events and enforce authorization.

## Runtime configuration

`VITE_API_GATEWAY_URL` is optional for same-origin deployments and should point
to the approved API Gateway for cross-origin deployments. The browser sends
session credentials with requests; this repository does not implement login,
registration, token storage, or role decisions.

`VITE_API_GATEWAY_PREFIX` defaults to `/admin`.
