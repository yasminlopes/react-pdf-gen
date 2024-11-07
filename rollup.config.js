import typescript from "rollup-plugin-typescript2";

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
  plugins: [typescript()],           
  external: ["react", "@react-pdf/renderer", "file-saver"]
};
