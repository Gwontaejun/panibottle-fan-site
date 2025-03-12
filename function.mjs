import functions from 'firebase-functions';
import next from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/prefer-default-export
export const nextServer = functions
  .region('asia-northeast3')
  .runWith({ memory: '1GB', timeoutSeconds: 360 })
  .https.onRequest((req, res) => {
    return server.prepare().then(() => nextjsHandle(req, res));
  });
