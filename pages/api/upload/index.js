import Formidable            from 'formidable-serverless';
import fs                    from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(req, res) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples:      true,
      keepExtensions: true,
    });

    let pathFile;

    form
      .on('file', (name, file) => {
        const data = fs.readFileSync(file.path);
        const parts = file.name.split('.')
        pathFile = `public/upload/${parts[0]}-${new Date().getTime()}.${parts[1]}`
        fs.writeFileSync(pathFile, data);
        fs.unlinkSync(file.path);
      })
      .on('aborted', () => {
        reject(res.status(500).send('Aborted'));
      })
      .on('end', () => {
        resolve(res.status(200).send({ path: pathFile }));
      });

    await form.parse(req);
  });
}
