import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["**/node_modules/**", ".next/**", "out/**", "dist/**", "build/**"],
  },
  // Extend Next.js's recommended ESLint configuration.
  // This should set up the parser, plugins (like @typescript-eslint, react, react-hooks, @next/next),
  // and recommended rules for a Next.js project.
  ...compat.extends("next/core-web-vitals"),

  // Add any project-specific overrides or additional configurations here.
  {
    rules: {
      // Your existing custom rules (ensure they are still needed and correctly named):
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
    },
  }
];

export default eslintConfig;