import fetch from 'node-fetch';
import { save, outputResult } from '../storage.js';

const API_URL = 'https://www.szse.cn/api/disc/announcement/annList';
const REFERER = 'https://www.szse.cn/disclosure/listed/notice/index.html';

// 公告类型映射
const BULLETIN_TYPE_MAP = {
  'annual': '010301',          // 年度报告
  'q3': '010307',              // 三季度
  'mid': '010303',             // 半年度
  'q1': '010305',              // 一季度
  'ipo': '0102',               // 首次公开发行
  'sharechange': '0115',       // 股权变动
  'risk': '0121',              // 澄清、风险提示、业绩预告事项
};

// 板块类型映射
const PLATE_CODE_MAP = {
  'main': '11',      // 主板（0开头）
  'gem': '16',       // 创业板
};

export async function bulletin(options) {
  const securityCode = options.code;
  let startDate = options.startDate?.replace(/'/g, '');
  let endDate = options.endDate?.replace(/'/g, '');
  const pageSize = parseInt(options.pageSize || '50', 10);
  const pageNum = parseInt(options.pageNum || '1', 10);

  // 设置默认日期：结束日期为今天，开始日期为3个月前
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  if (!endDate) {
    endDate = formatDate(today);
  }
  if (!startDate) {
    startDate = formatDate(threeMonthsAgo);
  }

  // 验证日期间隔不超过3个月
  const start = new Date(startDate);
  const end = new Date(endDate);
  const maxEnd = new Date(start);
  maxEnd.setMonth(start.getMonth() + 3);

  if (end > maxEnd) {
    console.error('错误：开始时间和结束时间的间隔不能超过三个月');
    return;
  }

  // 处理公告类型参数
  let bigCategoryId = options.bulletinType;
  if (bigCategoryId && BULLETIN_TYPE_MAP[bigCategoryId]) {
    bigCategoryId = BULLETIN_TYPE_MAP[bigCategoryId];
  }

  // 处理板块类型参数
  let plateCode = options.plateType;
  if (plateCode && PLATE_CODE_MAP[plateCode]) {
    plateCode = PLATE_CODE_MAP[plateCode];
  }

  // 标题搜索
  const title = options.title?.replace(/'/g, '');

  const payload = {
    seDate: [startDate, endDate],
    channelCode: ['listedNotice_disc'],
    pageSize,
    pageNum,
  };

  if (securityCode) {
    payload.stockCode = [securityCode];
  }
  if (bigCategoryId) {
    payload.bigCategoryId = [bigCategoryId];
  }
  if (plateCode) {
    payload.plateCode = [plateCode];
  }
  if (title) {
    payload.searchKey = [title];
  }

  console.log(`请求URL: ${API_URL}`);
  console.log(`请求参数:`, JSON.stringify(payload, null, 2));

  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': REFERER,
      'Content-Type': 'application/json',
      'Origin': 'https://www.szse.cn',
    },
    body: JSON.stringify(payload),
  });

  const root = await resp.json();

  if (!root || !root.data) {
    console.error('未获取到数据');
    return;
  }

  const resultList = root.data;

  if (!resultList || !Array.isArray(resultList)) {
    console.error('未获取到数据');
    return;
  }

  const allRecords = [];
  for (const item of resultList) {
    if (item && typeof item === 'object') {
      allRecords.push({
        sseDate: item.publishTime,
        securityCode: item.stockCode,
        securityName: item.stockName,
        title: item.title,
        url: item.attachPath ? `https://www.szse.cn${item.attachPath}` : null,
        id: item.id,
        columnId: item.columnId,
        pageURL: item.pageURL ? `https://www.szse.cn${item.pageURL}` : null,
      });
    }
  }

  if (!options.output) {
    await save('szse-bulletin', allRecords, securityCode);
  }

  await outputResult(allRecords, options);
}
