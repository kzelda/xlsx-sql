# xlsx-sql

## Example : Export xlsx to sql

```js
var lib = require("../../lib");

lib.Sql(`${__dirname}/file1.xlsx` , `${__dirname}/Script_${Math.random()}.sql`);
```