import { getJson } from '../common.js';
import { save, outputResult } from '../storage.js';

const EVENT_URL_TEMPLATE = 'https://np-listapi.eastmoney.com/sec/economiccalendar/findEventByDateRange?startDate={startDate}&eventType=001&pageNum=1&pageSize=15&req_trace=';

export async function events(options) {
  const startDate = options.startDate || new Date().toISOString().slice(0, 10);

  const url = EVENT_URL_TEMPLATE.replace('{startDate}', startDate);
  const data = await getJson(url, {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  });

  if (!options.output) {
    await save('events', data);
  }

  await outputResult(data, options);
}
