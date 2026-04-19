import { writeFile, mkdir, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'data');

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
}

function generateFilename(type, code = null) {
  const ts = Date.now();
  const date = new Date().toISOString().slice(0, 10);
  if (code) {
    return `${type}_${date}_${ts}_${code}.json`;
  }
  return `${type}_${date}_${ts}.json`;
}

export async function save(type, data, code = null) {
  await ensureDataDir();
  const filename = generateFilename(type, code);
  const filepath = join(DATA_DIR, filename);
  await writeFile(filepath, JSON.stringify(data, null, 2));
  return filepath;
}

export async function outputResult(data, options) {
  let content;
  if (options.format === 'ndjson') {
    if (Array.isArray(data)) {
      content = data.map(item => JSON.stringify(item)).join('\n');
    } else {
      content = JSON.stringify(data);
    }
  } else {
    content = options.pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  }

  if (options.output) {
    await writeFile(options.output, content);
    console.error(`Saved to: ${options.output}`);
  } else {
    console.log(content);
  }
}

export async function list(options = {}) {
  await ensureDataDir();
  const files = await readdir(DATA_DIR);
  const results = [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const filepath = join(DATA_DIR, file);
    const stats = await stat(filepath);

    const parts = file.split('_');
    const type = parts[0];

    if (options.type && type !== options.type) continue;

    if (options.since) {
      const fileDate = parts[1];
      if (fileDate < options.since) continue;
    }

    results.push({
      file,
      type,
      size: stats.size,
      mtime: stats.mtime,
    });
  }

  console.log(JSON.stringify(results, null, 2));
}
