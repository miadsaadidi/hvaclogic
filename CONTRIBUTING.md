# Contributing to HVACLogic

Thank you for your interest in contributing to **HVACLogic**! We welcome contributions from building scientists, mechanical engineers, software developers, and HVAC/R technicians.

## How to Contribute

1. **Reporting Bugs & Suggesting Calculations**:
   * Open an issue in the [GitHub Issues](https://github.com/miadsaadidi/hvaclogic/issues) tracker.
   * Provide the physical formula, standard reference (e.g., ASHRAE, ACCA, SMACNA, NIST), and numerical test vectors.

2. **Submitting Pull Requests**:
   * Fork the repository and create a feature branch (`git checkout -b feature/new-calculation`).
   * Add pure mathematical functions under `src/lib/math/<name>.ts`.
   * Add automated unit tests under `src/lib/math/<name>.test.ts`.
   * Verify all tests pass: `npm test` and `npm run typecheck`.
   * Submit a PR describing your mathematical formulation and test benchmarks.

## Code of Conduct

We are committed to providing a welcoming, constructive, and harassment-free environment for all contributors. Please treat fellow community members with respect and professionalism.
