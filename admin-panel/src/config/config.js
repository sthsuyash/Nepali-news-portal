const production = "production";
const development = "development";

const mode = development;
let base_url = "http://localhost:5000";

if (mode === production) {
  base_url = "http://localhost:5000";
} else {
  base_url = "http://localhost:5000";
}

export { base_url };
