import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";

export default {
  input: "src/index.ts", 
  output: [
    {
      file: "dist/index.js",         
      format: "cjs",                  // CommonJS (compatível com versões antigas do Node)
      sourcemap: true                 
    },
    {
      file: "dist/index.esm.js",     
      format: "es",                   // ES Modules (compatível com Node.js mais recente)
      sourcemap: true                 
    }
  ],
  plugins: [
    url({
      include: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
      limit: 0, // Define limite para inline, 0 força o uso de caminho absoluto
    }),
    typescript(),
  ],   
  external: ["react", "@react-pdf/renderer", "file-saver"]
};
