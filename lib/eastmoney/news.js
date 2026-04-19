import { postJson } from '../common.js';
import { save, outputResult } from '../storage.js';

const NEWS_URL = 'https://np-seclist.eastmoney.com/sec/getQuoteNews';

export async function news(options) {
  const code = options.code;
  const pageSize = parseInt(options.pageSize || '10', 10);

  const body = {
    appKey: 'fd374bf183b866ce5cf7b00b92bb9858',
    biz: 'sec_quote_news',
    client: 'sec_android',
    clientVersion: '10.23',
    deviceId: '',
    midCode: code,
    pageSize: pageSize,
    req_trace: 'fac289aa-39ed-4bf1-b8b6-fd999a7d1b2a',
    sortEnd: '',
  };

  const data = await postJson(NEWS_URL, body);

  if (!options.output) {
    await save('news', data, code);
  }

  await outputResult(data, options);
}
