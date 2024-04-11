async function call({
  baseUrl = "http://worldtimeapi.org/api",
  endpoint,
  options,
}: {
  baseUrl?: string;
  endpoint?: string;
  options?: RequestInit;
}) {
  let response: Response | undefined = undefined;

  try {
    const fullUrl = `${baseUrl}${endpoint}`;
    response = await fetch(fullUrl, options);

    if (response.ok) {
      return [await response.json(), true];
    }

    return [response?.status, false];
  } catch (err) {
    console.error(
      `Error: fetching endpoint ${endpoint} failed with error: ${err}`,
    );

    return [response?.status, false];
  }
}

export async function getTimezone({ timezone }: { timezone?: string } = {}) {
  const tz = typeof timezone !== "undefined" ? timezone : "";

  const endpoint = `/timezone/${tz}`;

  const [data, status] = await call({ endpoint });

  if (status) {
    return [data, true];
  }

  return [data, false];
}
