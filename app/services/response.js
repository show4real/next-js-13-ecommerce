export const authService = {
  handleResponse,
};
export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 403) {
        window.location.href = "/";
      }

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
