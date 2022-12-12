const fs = require('fs');
const folderName = './src/assets/img';

const MIME_TYPES: any = {
    mp3: 'audio/mp3',
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg'
};

type AssetItem = {
    name: string,
    src: string
}

export function parseResourses(): string {
    const assets: AssetItem[] = [];
    function parseAssets(url) {
        fs.readdirSync(url).forEach((file: any) => {
            const isFolder = fs.lstatSync(`${url}/${file}`).isDirectory();
            if (isFolder) {
                parseAssets(url + '/' + file);
            } else {
                const name = file.split('.')[0];
                const dist = url + '/' + file;
                const ext = file.split('.')[1];
                if (fs.lstatSync(dist).isDirectory()) {
                    parseAssets(dist);
                } else {
                    const src = encode_base64(dist, ext);
                    const config: AssetItem = { name, src };
                    assets.push(config);
                }
            }
        });
    }
    parseAssets(folderName);
    return `<script type="text/javascript"> window["res"] = ${JSON.stringify(assets)} </script>`;
}

function encode_base64(filename: string, extension: string): string {
    if (fs.lstatSync(filename).isDirectory()) return;
    const data = fs.readFileSync(filename);
    return `data:${MIME_TYPES[extension]};base64,${Buffer.from(data).toString('base64')}`;
}

export const resources = parseResourses;