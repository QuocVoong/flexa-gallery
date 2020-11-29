import sharp from 'sharp';
import axios from 'axios';

const optionToKeyVal = (option) =>
  ((split) =>
    split.length > 0
      ? { [split[0]]: split.length > 1 ? split[1] : true }
      : undefined)(option.split('='));

// Parse options string and return options object
const parseOptions = (options) => {
  return options
    .split('&')
    .reduce((acc, option) => ({ ...acc, ...optionToKeyVal(option) }), {});
};

export default async (request, response) => {
  const { query: { slug } } = request;
  const [options, imageUrl] = slug;

  const decodedUrl = decodeURIComponent(imageUrl);

  const readStream = await axios({url: decodedUrl, responseType: 'stream'});

  // handling our image processing using sharp
  const parsedOptions = parseOptions(options);
  const transform     = sharp()
    .resize(
      parsedOptions.w ? Number(parsedOptions.w) : undefined,
      parsedOptions.h ? Number(parsedOptions.h) : undefined,
      { fit: 'cover' }
    )
    .jpeg({ progressive: true });

  response.statusCode = 200;
  // response.json({ options, parsedOptions, imageUrl: decodedUrl });

  // setting our cache duration
  const cacheMaxAge = 30 * 60; // 30 minutes
  response.setHeader('cache-control', `public, max-age=${cacheMaxAge}`);

  // setting our "Content-Type" as an image file
  response.setHeader('Content-Type', readStream.headers['content-type']);

  // final response
  readStream.data.pipe(transform).pipe(response);
};