import { kv } from '@vercel/kv';
 
export default async function handler(request, response) {
  // if method is Get then return the value of temp
  if (request.method === 'GET') {
    const temp = await kv.get('temp');
    if (!temp) {
      return response.status(200).send("Kegerator temperature not found!");
    }
    return response.status(200).send(temp + '°C');
  }

  // if method is Post then set the value of temp
  if (request.method === 'POST') {
    // check for api key from secret
    if (request.headers['x-api-key'] !== process.env.API_KEY) {
      return response.status(401).send('Unauthorized');
    }

    await kv.set('temp', request.body.temp);
    return response.status(200).send('OK');
  }

  // if method is not Get or Post then return 404
  return response.status(404).send('Not Found');
}