import * as fs from "fs"
import * as path from "path"

const basePath = process.env.INIT_CWD || process.cwd();
const biomeConfigPath = path.join(basePath, "biome.json")
const lefthookPath = path.join(basePath, "lefthook.json")


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

if (!fs.existsSync(biomeConfigPath)) {
  console.log("==> Installing biome config...")
  fs.writeFileSync(biomeConfigPath, JSON.stringify(biome_config_map, null, 2))
}

if (!fs.existsSync(lefthookPath)) {
  console.log("==> Installing lefthook config...")
  fs.writeFileSync(lefthookPath, JSON.stringify(lefthook_config_map, null, 2))
}

