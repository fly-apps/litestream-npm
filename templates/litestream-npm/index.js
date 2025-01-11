#!/usr/bin/env node

import process from 'node:process'
import child_process from "child_process"

let path = import.meta.resolve(`../litestream-${process.platform}-${process.arch}/litestream`)
try {
  child_process.spawnSync(
    new URL(path).pathname,
    process.argv.slice(2),
    {stdio: "inherit"}
  )
} catch(error) {
  process.exit(error.status)
}
