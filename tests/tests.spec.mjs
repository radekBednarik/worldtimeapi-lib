import { getTimezone, getIpAddress } from "../dist/index.js";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("getTimezones func", function () {
  it("returns timezones string array when called without args", async function () {
    const [data, status] = await getTimezone();

    expect(status).to.equal(true);
    expect(data).to.be.a("array");
    expect(data).not.to.be.empty;
  });

  it("area zones provided", async function () {
    const [data, status] = await getTimezone({
      timezone: "Europe",
    });

    expect(status).to.equal(true);
    expect(data).to.be.a("array");
    expect(data).not.to.be.empty;
  });

  it("specific location with region provided", async function () {
    const [data, status] = await getTimezone({
      timezone: "America/Argentina/Salta",
    });

    expect(status).to.equal(true);
    expect(data).to.include.all.keys(
      "abbreviation",
      "datetime",
      "day_of_week",
      "day_of_year",
      "dst",
      "dst_offset",
      "dst_until",
      "raw_offset",
      "timezone",
      "unixtime",
      "utc_datetime",
      "utc_offset",
      "week_number",
    );
  });

  it("specific location data without region is provided", async function () {
    const [data, status] = await getTimezone({
      timezone: "Europe/Prague",
    });

    expect(status).to.equal(true);
    expect(data).to.include.all.keys(
      "abbreviation",
      "datetime",
      "day_of_week",
      "day_of_year",
      "dst",
      "dst_offset",
      "dst_until",
      "raw_offset",
      "timezone",
      "unixtime",
      "utc_datetime",
      "utc_offset",
      "week_number",
    );
  });
});

describe("getIpAddress func", function () {
  it("calling /ip without specific ip value returns ip specific data", async function () {
    const [data, status] = await getIpAddress();

    expect(status).to.equal(true);
    expect(data).to.include.all.keys(
      "client_ip",
      "abbreviation",
      "datetime",
      "day_of_week",
      "day_of_year",
      "dst",
      "dst_offset",
      "dst_until",
      "raw_offset",
      "timezone",
      "unixtime",
      "utc_datetime",
      "utc_offset",
      "week_number",
    );
  });

  it("calling /ip/8.8.8.8 return ip specific data", async function () {
    const [data, status] = await getIpAddress({ ip: "8.8.8.8" });

    expect(status).to.equal(true);
    expect(data).to.include.all.keys(
      "client_ip",
      "abbreviation",
      "datetime",
      "day_of_week",
      "day_of_year",
      "dst",
      "dst_offset",
      "dst_until",
      "raw_offset",
      "timezone",
      "unixtime",
      "utc_datetime",
      "utc_offset",
      "week_number",
    );
  });
});
