# Finance Skill

金融数据获取工具 - 从东方财富、新浪财经、上交所、深交所获取快讯、新闻、财报、公告等数据。

## 安装

```bash
cd finance-skill
npm install

# 可选：链接到全局命令
npm link
```

## 使用

```bash
# 查看帮助
finance -h

# 获取东方财富 7x24 小时快讯
finance fastnews -P --page-size 10

# 获取股票新闻
finance news -c 600519 -P

# 获取董秘问答
finance qa -c 600519 -P

# 获取未来财经事件
finance events -P

# 获取财务报表 (关键指标)
finance reports -c 600519 -s key_metrics -P

# 获取资产负债表
finance reports -c 600519 -s balance -P

# 获取上交所公告
finance sse-bulletin -c 600009 -P

# 获取上交所年报
finance sse-bulletin -c 600009 -b annual -P

# 搜索含"停牌"的公告
finance sse-bulletin -t 停牌 -P

# 获取深交所公告
finance szse-bulletin -c 000001 -P

# 获取深交所年报
finance szse-bulletin -c 000001 -b annual -P

# 搜索含"年度"的公告
finance szse-bulletin -t 年度 -P

# 列出暂存的历史数据
finance list
```

## 命令详解

### `finance fastnews`

获取东方财富 7x24 小时快讯。

```bash
finance fastnews [options]
```

Options:
- `-p, --page-size <n>`: 每页条数 (默认: 100)
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance events`

获取未来财经事件日历。

```bash
finance events [options]
```

Options:
- `-s, --start-date <date>`: 开始日期 (YYYY-MM-DD)
- `-e, --end-date <date>`: 结束日期 (YYYY-MM-DD)
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance qa`

获取董秘问答数据。

```bash
finance qa -c <code> [options]
```

Options:
- `-c, --code <code>`: 股票代码 (如: 600519) (必需)
- `-p, --page-size <n>`: 每页条数 (默认: 10)
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance news`

获取股票相关新闻。

```bash
finance news -c <code> [options]
```

Options:
- `-c, --code <code>`: 股票代码 (如: 600519) (必需)
- `-p, --page-size <n>`: 每页条数 (默认: 10)
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance reports`

获取新浪财经财务报表。

```bash
finance reports -c <code> [options]
```

Options:
- `-c, --code <code>`: 股票代码 (如: sh600519 或 600519) (必需)
- `-t, --type <type>`: 报告类型: 0=全部, 1=年报, 2=中报, 3=一季报, 4=三季报 (默认: "0")
- `-s, --source <source>`: 数据源: key_metrics=关键指标, balance=资产负债表, income=利润表, cash_flow=现金流量表 (默认: "key_metrics")
- `--page <n>`: 页码 (默认: "1")
- `--num <n>`: 每页条数 (默认: "10")
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance sse-bulletin`

获取上交所公告信息。

```bash
finance sse-bulletin [options]
```

Options:
- `-c, --code <code>`: 股票代码 (如: 600009)
- `-s, --start-date <date>`: 开始日期 (YYYY-MM-DD)，默认当天前3个月
- `-e, --end-date <date>`: 结束日期 (YYYY-MM-DD)，默认当天
  - 注意：开始时间和结束时间的间隔不能超过三个月
- `-b, --bulletin-type <type>`: 公告类型
  - `suspend` - 停复牌提示性公告
  - `risk` - 风险警示
  - `major` - 其他重大事项
  - `repurchase` - 回购股份
  - `restructuring` - 重大资产重组
  - `sharechange` - 股东增持或减持股份
  - `performance` - 业绩预告、业绩快报和盈利预测
  - `periodic` - 定期报告 (全部)
  - `annual` - 年报
  - `q1` - 一季报
  - `mid` - 半年报
  - `q3` - 三季报
- `-T, --stock-type <type>`: 板块类型: main=主板, star=科创板
- `-t, --title <keyword>`: 标题模糊搜索
- `--page-size <n>`: 每页条数 (默认: "25")
- `--page-no <n>`: 页码 (默认: "1")
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance szse-bulletin`

获取深交所公告信息。

```bash
finance szse-bulletin [options]
```

Options:
- `-c, --code <code>`: 股票代码 (如: 000001)
- `-s, --start-date <date>`: 开始日期 (YYYY-MM-DD)，默认当天前3个月
- `-e, --end-date <date>`: 结束日期 (YYYY-MM-DD)，默认当天
  - 注意：开始时间和结束时间的间隔不能超过三个月
- `-b, --bulletin-type <type>`: 公告类型
  - `annual` - 年度报告
  - `q3` - 三季度报告
  - `mid` - 半年度报告
  - `q1` - 一季度报告
  - `ipo` - 首次公开发行
  - `sharechange` - 股权变动
  - `risk` - 澄清、风险提示、业绩预告事项
- `-T, --plate-type <type>`: 板块类型: main=主板, gem=创业板
- `-t, --title <keyword>`: 标题模糊搜索
- `--page-size <n>`: 每页条数 (默认: "50")
- `--page-num <n>`: 页码 (默认: "1")
- `-o, --output <file>`: 输出文件路径
- `-f, --format <format>`: 输出格式: json, ndjson (默认: json)
- `-P, --pretty`: 格式化输出 JSON

### `finance list`

列出暂存的历史数据。

```bash
finance list [options]
```

Options:
- `-t, --type <type>`: 过滤类型: fastnews, events, qa, news, reports, sse-bulletin
- `--since <date>`: 只显示指定日期之后的数据 (YYYY-MM-DD)

## 数据暂存

默认情况下，所有命令的输出都会暂存到 `data/` 目录下，文件命名格式为：
- `{type}_{date}_{timestamp}.json` - 无需股票代码的数据
- `{type}_{date}_{timestamp}_{code}.json` - 需要股票代码的数据

使用 `-o, --output` 选项可以指定输出文件路径，此时不会自动暂存。



## 项目结构

```
finance-skill/
├── bin/
│   └── finance.js       # 主入口 CLI
├── lib/
│   ├── eastmoney/       # 东方财富 API 封装
│   │   ├── fastnews.js
│   │   ├── events.js
│   │   ├── qa.js
│   │   └── news.js
│   ├── sina/            # 新浪财经 API 封装
│   │   └── reports.js
│   ├── sse/             # 上交所 API 封装
│   │   └── bulletin.js
│   ├── szse/            # 深交所 API 封装
│   │   └── bulletin.js
│   ├── storage.js       # 结果暂存模块
│   └── common.js        # 通用工具
├── data/                # 暂存数据目录
├── package.json
└── README.md
```
