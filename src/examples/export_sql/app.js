var lib = require("../../lib");

lib.Sql(`${__dirname}/file2.xlsx` , `${__dirname}/Script_${Math.random()}.sql`);
