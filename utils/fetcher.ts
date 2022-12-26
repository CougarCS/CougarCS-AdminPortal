const fetcher = async (
  input: RequestInfo | URL,
  init: RequestInit | undefined
) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");

    throw Object.assign(error, {
      info: await response.json(),
      status: response.status,
    });
  }

  return response.json();
};

export default fetcher;
