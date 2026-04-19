import { postJson } from '../common.js';
import { save, outputResult } from '../storage.js';

const FAST_NEWS_URL = 'https://np-seclist.eastmoney.com/sec/getFastNews';

export async function fastnews(options) {
  const pageSize = parseInt(options.pageSize || '100', 10);

  const body = {
    biz: 'sec_724',
    client: 'sec_android',
    h24ColumnCode: '102',
    order: 2,
    pageSize: pageSize,
    trace: 'fd189d7e-02b7-456e-ac47-6ac93ee1484b',
  };

  const data = await postJson(FAST_NEWS_URL, body);

  if (!options.output) {
    await save('fastnews', data);
  }

  await outputResult(data, options);
}
