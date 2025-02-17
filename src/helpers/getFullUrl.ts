export const getFullUrl = (imageUrl: string) =>
  `${import.meta.env.VITE_API_URL}/uploads${imageUrl}`;
