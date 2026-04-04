# World-Class i18n Quality Standard

## Objective
Make multilingual quality complete, testable, and easy to scale.

## Language Onboarding Standard

1. Add locale in i18n registry.
2. Add locale message file.
3. Provide required message keys and metadata strings.
4. Validate no fallback leakage in critical journeys.

## Quality Gates

1. No hardcoded locale-specific conditionals in UI logic.
2. Metadata localized for each supported locale.
3. Navigation/footer/core pages localize consistently.
4. Structured data content localizes where required.

## Test Expectations

1. Snapshot and render checks for each supported locale.
2. Route query-based locale switching checks.
3. Missing-key detection in CI.

## Operational Rule

Adding a new language must require only:
1. One locale file.
2. One locale registration update.
3. No component-level branching edits.
