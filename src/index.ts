async function call({
  endpoint,
  options,
}: {
  endpoint: string;
  options?: RequestInit;
}) {
  let response: Response | undefined = undefined;

  try {
    response = await fetch(endpoint, options);

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
