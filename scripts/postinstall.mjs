import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve, dirname, join } from "path"
import { execSync } from "child_process"
import { fileURLToPath } from "url";

const basePath = process.env.INIT_CWD || process.cwd();
const biomeConfigPath = join(basePath, "biome.json")
const lefthookPath = join(basePath, "lefthook.json")

const userAgent = process.env.npm_config_user_agent ?? '';
const isPnpm = userAgent.startsWith('pnpm')

const __dirname = dirname(fileURLToPath(import.meta.url))

const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))
const packages = Object.keys(packageJson.dependencies ?? {});

const biome_config_map = {
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@atolycs/biome-config"]
}

const lefthook_config_map = {
  "$schema": "https://json.schemastore.org/lefthook.json",
  "remotes": [
    {
      "git_url": "https://github.com/atolycs/biome-config",
      "configs": [
        "lefthooks/lefthook.json"
      ]
    }
  ]
}

if (!existsSync(biomeConfigPath)) {
  console.log("==> Installing biome config...")
  writeFileSync(biomeConfigPath, JSON.stringify(biome_config_map, null, 2))
}

if (!existsSync(lefthookPath)) {
  console.log("==> Installing lefthook config...")
  writeFileSync(lefthookPath, JSON.stringify(lefthook_config_map, null, 2))
}

if (!isPnpm) process.exit(0)

for (const pkg of packages) {
  console.log(`📦 Hoisting ${pkg} to project root ...`)
  execSync(`pnpm add ${pkg}`, { cwd: basePath, stdio: 'inherit' })
}
