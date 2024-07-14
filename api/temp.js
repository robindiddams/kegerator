import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  // if method is Get then return the value of temp
  if (request.method === 'GET') {
    const temp = await kv.get('temp');
    return response.status(200).send(temp + '°C');
  }

  // if method is Post then set the value of temp
  if (request.method === 'POST') {
    // check for api key from secret
    if (request.headers['x-api-key'] !== process.env.API_KEY) {
      return response.status(401).send('Unauthorized');
    }

    const body = JSON.parse(request.body);
    await kv.put('temp', body.temp);
    return response.status(200).send('OK');
  }

  // if method is not Get or Post then return 404
  return response.status(404).send('Not Found');
}