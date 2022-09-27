function useHttpRequest() {
  const usuallyRequest = async (method: string, url: string, body?: object) => {
    let response = await fetch(url, {
      method: method,
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    return await result;
  };

  const hookRequest = async (method: string, url: string, body?: object) => {
    const result = await usuallyRequest(method, url, body);

    return result;
  };

  return { hookRequest };
}

export default useHttpRequest;
