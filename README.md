# xlsx-sql

## Installation
```bash
yarn add xlsx-sql
# or using npm
npm install xlsx-sql
```

## Examples

```js
const xlsx = require("xlsx-sql");

xlsx.Sql(`${__dirname}/file1.xlsx` , `${__dirname}/Script_${Math.random()}.sql`);
```