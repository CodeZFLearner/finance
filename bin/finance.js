#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('finance')
  .description('金融数据获取工具 - 从东方财富、新浪财经、上交所、深交所获取快讯、新闻、财报、公告等数据')
  .version('1.0.0');

// 快讯
program
  .command('fastnews')
  .description('获取东方财富 7x24 小时快讯')
  .option('-p, --page-size <n>', '每页条数', '100')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { fastnews } = await import('../lib/eastmoney/fastnews.js');
    await fastnews(options);
  });

// 未来事件
program
  .command('events')
  .description('获取未来财经事件日历')
  .option('-s, --start-date <date>', '开始日期 (YYYY-MM-DD)')
  .option('-e, --end-date <date>', '结束日期 (YYYY-MM-DD)')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { events } = await import('../lib/eastmoney/events.js');
    await events(options);
  });

// 董秘问答
program
  .command('qa')
  .description('获取董秘问答数据')
  .requiredOption('-c, --code <code>', '股票代码 (如: 600519)')
  .option('-p, --page-size <n>', '每页条数', '10')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { qa } = await import('../lib/eastmoney/qa.js');
    await qa(options);
  });

// 新闻
program
  .command('news')
  .description('获取股票相关新闻')
  .requiredOption('-c, --code <code>', '股票代码 (如: 600519)')
  .option('-p, --page-size <n>', '每页条数', '10')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { news } = await import('../lib/eastmoney/news.js');
    await news(options);
  });

// 财报
program
  .command('reports')
  .description('获取新浪财经财务报表')
  .requiredOption('-c, --code <code>', '股票代码 (如: sh600519 或 600519)')
  .option('-t, --type <type>', '报告类型: 0=全部, 1=年报, 2=中报, 3=一季报, 4=三季报', '0')
  .option('-s, --source <source>', '数据源: key_metrics=关键指标, balance=资产负债表, income=利润表, cash_flow=现金流量表', 'key_metrics')
  .option('--page <n>', '页码', '1')
  .option('--num <n>', '每页条数', '10')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { reports } = await import('../lib/sina/reports.js');
    await reports(options);
  });

// 上交所公告
program
  .command('sse-bulletin')
  .description('获取上交所公告信息')
  .option('-c, --code <code>', '股票代码 (如: 600009)')
  .option('-s, --start-date <date>', '开始日期 (YYYY-MM-DD)')
  .option('-e, --end-date <date>', '结束日期 (YYYY-MM-DD)')
  .option('-b, --bulletin-type <type>', '公告类型: suspend=停复牌, risk=风险警示, major=重大事项, repurchase=回购, restructuring=重组, sharechange=增减持, performance=业绩, periodic=定期报告, annual=年报, q1=一季报, mid=半年报, q3=三季报')
  .option('-T, --stock-type <type>', '板块类型: main=主板, star=科创板')
  .option('-t, --title <keyword>', '标题模糊搜索')
  .option('--page-size <n>', '每页条数', '25')
  .option('--page-no <n>', '页码', '1')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { bulletin } = await import('../lib/sse/bulletin.js');
    await bulletin(options);
  });

// 深交所公告
program
  .command('szse-bulletin')
  .description('获取深交所公告信息')
  .option('-c, --code <code>', '股票代码 (如: 000001)')
  .option('-s, --start-date <date>', '开始日期 (YYYY-MM-DD)')
  .option('-e, --end-date <date>', '结束日期 (YYYY-MM-DD)')
  .option('-b, --bulletin-type <type>', '公告类型: annual=年报, q3=三季度, mid=半年报, q1=一季度, ipo=首次公开发行, sharechange=股权变动, risk=澄清/风险提示/业绩预告')
  .option('-T, --plate-type <type>', '板块类型: main=主板, gem=创业板')
  .option('-t, --title <keyword>', '标题模糊搜索')
  .option('--page-size <n>', '每页条数', '50')
  .option('--page-num <n>', '页码', '1')
  .option('-o, --output <file>', '输出文件路径')
  .option('-f, --format <format>', '输出格式: json, ndjson', 'json')
  .option('-P, --pretty', '格式化输出 JSON')
  .action(async (options) => {
    const { bulletin } = await import('../lib/szse/bulletin.js');
    await bulletin(options);
  });

// 列出历史数据
program
  .command('list')
  .description('列出暂存的历史数据')
  .option('-t, --type <type>', '过滤类型: fastnews, events, qa, news, reports, sse-bulletin, szse-bulletin')
  .option('--since <date>', '只显示指定日期之后的数据 (YYYY-MM-DD)')
  .action(async (options) => {
    const { list } = await import('../lib/storage.js');
    await list(options);
  });

program.parse();
