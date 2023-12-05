import { IntegrationBase } from "@budibase/types";
import fetch from "node-fetch";
import ical2json from "ical2json"

interface Query {
  method: string;
  body?: string;
  headers?: { [key: string]: string };
}

interface JsonDict {
  [key: string]: string | number | boolean | (string | number | boolean)[];
}

class CustomIntegration implements IntegrationBase {
  private readonly url: string;

  constructor(config: {
    url: string;
  }) {
    this.url = config.url;
  }

  async request(url: string, opts: Query) {
    if (!this.url) {
      throw new Error("Need to provide a URL for the .ics file.");
    }

    const response = await fetch(url, opts);
    if (response.status <= 300) {
      try {
        return await ical2json.convert(response.text());
      } catch (err) {
        return await ical2json.convert(response.text());
      }
    } else {
      const err = await response.text();
      throw new Error(err);
    }
  }

  async read() {
    const opts = {
      method: "GET",
      body: "",
      headers: {},
    };
    return this.request(this.url, opts);
  }
}

export default CustomIntegration;
