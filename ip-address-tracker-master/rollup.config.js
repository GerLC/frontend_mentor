import replace from '@rollup/plugin-replace';
import { config } from 'dotenv';

const configToReplace = {};
for (const [key, v] of Object.entries(config().parsed)) {
  configToReplace[`process.env.${key}`] = `'${v}'`;
}

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    replace({
      include: ["src/**/*.ts", "src/**/*.svelte"],
      preventAssignment: true,
      values: {
        "process.env.API_KEY": "'apiKey'"
      }
    }),
  ]
};