export const request = async (
  url: string,
  method = 'GET',
  body: any = null,
  headers: any = {}
) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    return data;
  } catch (err) {
    throw err;
  }
};
