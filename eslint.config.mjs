import {
  defineConfig,
  globalIgnores,
} from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  /*
   * =========================================================
   * PÁGINAS DO APP
   * =========================================================
   *
   * Algumas páginas carregam dados persistidos em
   * IndexedDB/localStorage ao serem montadas.
   *
   * As funções de carregamento atualizam o estado da página,
   * o que é intencional neste projeto.
   */

  {
    files: [
      "src/app/**/*.tsx",
    ],

    rules: {
      "react-hooks/set-state-in-effect":
        "off",
    },
  },

  /*
   * =========================================================
   * ARQUIVOS IGNORADOS
   * =========================================================
   */

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;