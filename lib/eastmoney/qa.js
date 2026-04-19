import { postJson } from '../common.js';
import { save, outputResult } from '../storage.js';

const QA_URL = 'https://mgubaqa.eastmoney.com/interface/GetData.aspx';

export async function qa(options) {
  const code = options.code;
  const pageSize = parseInt(options.pageSize || '10', 10);

  const body = {
    param: `code=${code}&qatype=1&p=1&ps=${pageSize}&keyword=&questioner=`,
    path: 'question/api/info/Search',
  };

  const data = await postJson(QA_URL, body);

  if (!options.output) {
    await save('qa', data, code);
  }

  await outputResult(data, options);
}
