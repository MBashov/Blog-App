export const getAccessToken = (): string | null => {
    return JSON.parse(localStorage.getItem('accessToken') || 'null');
};