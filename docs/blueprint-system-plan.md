# Blueprint System Plan

## Audit Notes

- The current app already has a working Next.js App Router shell, premium UI components, a builder/workspace flow, and an existing mock blueprint matcher under `src/core`.
- Existing preview schemas use `src/core/types.ts` and should remain compatible with the current builder. The new 100-blueprint catalog will be introduced as a stricter config layer rather than replacing the existing runtime schema.
- Existing industry-specific renderers under `src/blueprints/*Site.tsx` prove the direction: blueprints need their own layout DNA instead of shared hero/features/pricing stacks.
- No database or real backend exists. Interactive flows should use a local demo backend adapter with localStorage and in-memory fallback.

## Implementation Path

1. Add strict blueprint contracts in `src/core/blueprint-types.ts`.
2. Add controlled registries in `src/core/blueprint-registries.ts` for industries, archetypes, pages, features, roles, data models, workflows, visual DNA, and interactions.
3. Generate exactly 100 deterministic blueprint definitions in `src/core/generated-blueprints.ts` using factories and variant plans.
4. Add validation in `src/core/blueprint-validator.ts` for count, uniqueness, registry compliance, minimum quality, data models, workflows, interactions, and similarity.
5. Extend `src/core/blueprint-catalog.ts` with a new 100-blueprint API while preserving the existing `blueprintCatalog` export for the older matcher.
6. Add `src/core/blueprint-assembler.ts` to convert definitions into stable preview/page schemas.
7. Add `src/lib/demo-backend.ts` for local mock actions used by preview buttons and forms.
8. Add `/blueprints` and `/blueprints/[key]` routes with gallery, filters, preview, validation report, workflows, roles, seed data, and demo actions.
9. Add a validation script and package script so the catalog can fail fast in CI or local development.
10. Run typecheck, lint, blueprint validation, and build.

## Safety Constraints

- Keep old builder and workspace imports intact.
- Do not duplicate existing preview schema contracts.
- Keep generator deterministic and pure.
- Keep every preview button wired to the demo backend or a visible local state transition.
