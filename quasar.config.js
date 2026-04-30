import { configure } from 'quasar/wrappers'
import fs from 'node:fs'
import path from 'node:path'

function ensureSyscallGraphInPublic() {
  const projectRoot = process.cwd()
  const srcFile = path.join(projectRoot, 'man7_see-also_syscall_graph.html')
  const publicDir = path.join(projectRoot, 'public')
  const outDir = path.join(publicDir, 'posts')
  const outFile = path.join(outDir, 'man7_see-also_syscall_graph.html')

  try {
    if (!fs.existsSync(srcFile)) return
    if (!fs.existsSync(publicDir)) return

    fs.mkdirSync(outDir, { recursive: true })

    const srcStat = fs.statSync(srcFile)
    const outStat = fs.existsSync(outFile) ? fs.statSync(outFile) : null

    if (!outStat || srcStat.mtimeMs > outStat.mtimeMs) {
      fs.copyFileSync(srcFile, outFile)
    }
  } catch {
    // non-fatal: missing permissions or readonly env
  }
}

export default configure(() => ({
  supportTS: true,

  boot: ['i18n'],

  css: ['app.scss'],

  extras: ['fontawesome-v6'],

  build: {
    vueRouterMode: 'history',
    // For `Shepherd-ITSec.github.io` (and custom domain) this is correct.
    publicPath: '/',
    extendViteConf() {
      // Ensure the graph HTML is available as a static asset for iframe embedding.
      ensureSyscallGraphInPublic()
    }
  },

  devServer: {
    open: false
  },

  framework: {
    config: {
      dark: true
    },
    plugins: ['Dark', 'Loading', 'Notify']
  },

  animations: ['fadeIn', 'fadeOut', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'zoomIn', 'zoomOut']
}))


