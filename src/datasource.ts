import { IntegrationBase } from "@budibase/types";
import fetch from "node-fetch";
import ical2json from "ical2json";

class CustomIntegration implements IntegrationBase {
  private readonly url: string;

  constructor(config: { url: string } ) {
    this.url = config.url;
  }

  async request(url: string) {
    if (!this.url) {
      throw new Error("Need to provide a URL for the .ics file.");
    }

    const response = await fetch(url);
    if (response.status <= 300) {
      try {
        return ical2json.convert(await response.text());
      } catch (err) {
        return ical2json.convert(await response.text());
      }
    } else {
      const err = await response.text();
      throw new Error(err);
    }
  }

  async read() {
    return this.request(this.url);
  }
}

export default CustomIntegration;
