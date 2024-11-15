const production = "production";
const development = "development";

const mode = development;
let base_url = "http://localhost:5173";

if (mode === production) {
  base_url = "http://localhost:5173";
} else {
  base_url = "http://localhost:5173";
}

export { base_url };
