import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export async function PostImageBBUrl(images: string): Promise<any> {
  const response = await axios.post('https://api.imgbb.com/1/upload', {
    headers: {
      params: {
        key: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
        images,
      },
    },
  });

  if (!response) {
    throw new Error('Fail request post image imgBB');
  }

  return response.data;
}
