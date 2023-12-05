import { IntegrationBase } from "@budibase/types";
import fetch from "node-fetch";
import ical2json from "ical2json";

class CustomIntegration implements IntegrationBase {
  private readonly url: string;

  constructor(config: { url: string } ) {
    this.url = config.url;
  }

  async request(url: string) {
    const response = await fetch(url);
    return await response.text();
  }

  async read() {
    return ical2json.convert(this.request(this.url));
  }
}

export default CustomIntegration;
