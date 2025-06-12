export const getAccessToken = async () => {
    return localStorage.getItem('accessToken');
  };
  
export const refreshAccessToken = async () => {
    const response = await fetch('/refresh-token', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to refresh token');
    const data = await response.json();
    // Save new access token if returned
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    return data.accessToken;
  };
  