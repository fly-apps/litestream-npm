import ejs from 'ejs'
import fs from 'node:fs'
import { execSync } from 'node:child_process'

const ARCH = {
  amd64: 'x64',
  arm64: 'arm64'
}
  
const OS = {
  darwin: 'darwin',
  linux: 'linux',
}

const template = fs.readFileSync('templates/package.json.ejs', 'utf8')

fs.mkdirSync('tmp', { recursive: true })
execSync('gh release download -p "*" -R benbjohnson/litestream --clobber', { cwd: 'tmp', stdio: 'inherit' })
const files = fs.readdirSync('tmp')
let version = "0.0.1"
for (const file of files) {
  const match = file.match(/litestream-v([.\d]+)-/)
  if (match) {
    // version = match[1] *TODO* uncomment once working
    break
  }
}

fs.mkdirSync('pkg/litestream-npm', { recursive: true })
for (const os in OS) {
  for (const arch in ARCH) {
    const platform = `${OS[os]}-${ARCH[arch]}`
    const path = `pkg/litestream-${platform}`
    fs.mkdirSync(path, { recursive: true })

    const options = { os, arch, version }
    const rendered = ejs.render(template, options)
    fs.writeFileSync(`${path}/package.json`, rendered)

    const file = files.find(f => f.includes(`${os}-${arch}`) && !f.includes('.deb'))

    if (!file) {
      console.error(`Could not find litestream binary for ${platform}`)
      continue
    }

    if (file.endsWith('.tar.gz')) {
      console.log(`Archive: ${file}`)
      execSync(`tar -xvzf tmp/${file} -C ${path}`, { stdio: 'inherit' })
    } else if (file.endsWith('.zip')) {
      execSync(`unzip -o tmp/${file} -d ${path}`, { stdio: 'inherit' })
    }

    fs.chmodSync(`${path}/litestream`, 0o755)
  }
}

fs.rmSync("tmp", { recursive: true })

fs.cpSync('templates/litestream-npm/index.js', 'pkg/litestream-npm/index.js')
const json = JSON.parse(fs.readFileSync('templates/litestream-npm/package.json', 'utf8'))
json.version = version
for (const dependency in json.optionalDependencies) {
  json.optionalDependencies[dependency] = version
}
fs.writeFileSync('pkg/litestream-npm/package.json', JSON.stringify(json, null, 2))
