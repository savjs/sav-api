import buble from 'rollup-plugin-buble'

const pack = require('./package.json')
const YEAR = new Date().getFullYear()

export default {
  entry: 'src/index.js',
  targets: [
    { dest: 'dist/sav-api.cjs.js', format: 'cjs' },
    { dest: 'dist/sav-api.es.js', format: 'es' }
  ],
  plugins: [
    buble()
  ],
  banner   () {
    return `/*!
 * ${pack.name} v${pack.version}
 * (c) ${YEAR} ${pack.author.name} ${pack.author.email}
 * Release under the ${pack.license} License.
 */`
  },
  // Cleaner console
  onwarn (msg) {
    if (msg && msg.startsWith('Treating')) {
      return
    }
  }
}
