import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("app-dir-example");
}
// NOTE: You can replace `your-project-name` with the actual name of your project
