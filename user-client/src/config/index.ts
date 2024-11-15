enum Mode {
  PROD = "production",
  DEV = "dev",
}

const mode: Mode = process.env.NODE_ENV === Mode.PROD ? Mode.PROD : Mode.DEV;

const local_api_url = process.env.LOCAL_API_URL || "http://localhost:5000";
const production_api_url = process.env.PRODUCTION_API_URL || "http://localhost:5000";

const base_api_url = mode === Mode.PROD ? production_api_url : local_api_url;

export { base_api_url };
