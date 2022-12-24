const fetcher = async (
  input: RequestInfo | URL,
  init: RequestInit | undefined
) => {
  const response = await fetch(input, init);
  return response.json();
};

export default fetcher;
