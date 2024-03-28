/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_MS_FRISBEE: string;
  // Ajoutez ici d'autres variables d'environnement que vous pourriez utiliser
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}