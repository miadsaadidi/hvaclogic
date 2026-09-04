# Contributing to HVACLogic

Thank you for your interest in contributing to **HVACLogic**! We welcome contributions from building scientists, mechanical engineers, software developers, and HVAC/R technicians.

## How to Contribute
 
1. **Reporting Bugs & Suggesting Calculations**:
   * Open an issue in the [GitHub Issues](https://github.com/miadsaadidi/hvaclogic/issues) tracker.
   * Provide the physical formula, standard reference (e.g., ASHRAE, ACCA, SMACNA, NIST), and numerical test vectors.

2. **Submitting Updates**:
   * **Small Tweaks**: Simple copy fixes or minor CSS adjustments can be committed directly to `main`.
   * **Medium & Large Updates (New Pages, Features, Calculators)**:
     * Create a descriptive feature branch (`git checkout -b feat/<slug>`).
     * Add pure mathematical functions under `src/lib/math/<slug>.ts` with comprehensive unit tests under `src/lib/math/<slug>.test.ts`.
     * Verify all test gates pass: `npm test` (100% passing) and `npm run typecheck` (0 errors).
     * Push the branch and immediately open a formal Pull Request on GitHub. Vercel will automatically generate a live **Preview URL** linked to the PR.
     * Leave PRs open for a realistic review window (2 to 24 hours).
     * Merging the PR on GitHub marks the PR as **Closed/Merged**, automatically deletes the feature branch, and deploys `main` to **Production (`hvaclogic.org`)**.

## Code of Conduct

We are committed to providing a welcoming, constructive, and harassment-free environment for all contributors. Please treat fellow community members with respect and professionalism.
