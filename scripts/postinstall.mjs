import * as fs from "fs"
import * as path from "path"

const basePath = process.env.INIT_CWD;
const biomeConfigPath = path.join(basePath, "biome.json")

const config_map = {
  "extends": ["@atolycs/biome-config"]
}

if (!fs.existsSync(biomeConfigPath)) {
  fs.writeFileSync(biomeConfigPath, JSON.stringify(config_map, null, 2))
}


