import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  const temp = await kv.get('temp');
  return response.status(200).json({ temp });
}