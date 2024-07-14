import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  const temp = await kv.get('temp');
  // return response.status(200).json({ temp });
//  return temp as html
  return response.status(200).send(temp);
}