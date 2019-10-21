# xlsx-sql


## Without installing (using [npx](https://github.com/npm/npx))
```bash
npx xlsx-sql [xlsx_file] [sql_file]
# windows example
npx xlsx-sql "c:\tmp\file.xlsx" "c:\tmp\script.sql"
```

OR

## Global installation
```bash
yarn global add xlsx-sql
# or using npm
npm install -g xlsx-sql
# you can now use it like
xlsx-sql [xlsx_file] [sql_file]
```

OR

## Local installation
```js
// npm install xlsx-sql
const xlsx = require("xlsx-sql");

xlsx.Sql(`${__dirname}/file1.xlsx` , `${__dirname}/Script_${Math.random()}.sql`);
```