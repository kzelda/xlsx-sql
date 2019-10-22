# xlsx-sql


## Without installing (using [npx](https://github.com/npm/npx))
```bash
npx xlsx-sql <xlsx_file> [optional_sql_file]
# example 1
npx xlsx-sql "c:\tmp\file.xlsx" "c:\tmp\script.sql"
# example 2 (only xlsx file)
npx xlsx-sql "c:\tmp\file.xlsx"
```

OR

## Global installation
```bash
yarn global add xlsx-sql
# or using npm
npm install -g xlsx-sql
# you can now use it like
xlsx-sql xlsx_filename [optional_sql_filename]
```

OR

## Local installation
```js
// npm install xlsx-sql
const xlsx = require("xlsx-sql");

xlsx.Sql(`${__dirname}/file1.xlsx` , `${__dirname}/Script_${Math.random()}.sql`);
```