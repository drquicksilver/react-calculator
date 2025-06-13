import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Provide `jest` global for tests written for Jest
// Vitest's `vi` is API compatible with `jest`
(globalThis as any).jest = vi;
