import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        document: true,
        IntersectionObserver: true,
        window: true,
      },
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-undef": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
];
