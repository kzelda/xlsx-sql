'use strict';

var xlsx = require('node-xlsx').default;
var fs = require("fs");


var Data = function Data(xlsx_path) {
    return xlsx.parse(xlsx_path);
};

/**
 * Export xslx_file to sql file
 * @param {string} xlsx_file Xlsx file path
 * @param {string} sql_file Sql script path
 * @param {string} sql_dialect sqlserver | mysql | postgres
 * @returns number of affected rows
 */
var Sql = function Sql(xlsx_file, sql_file, sql_dialect) {

    var xlsx = Data(xlsx_file);

    var sheet1 = xlsx[0];

    var data = sheet1.data;

    var header = data[0];

    var tablename = "Z_Excel1";

    var sheader = `
IF EXISTS(SELECT TOP 1 1 FROM sysobjects WHERE name = '${tablename}')
  DROP TABLE [${tablename}]
GO

CREATE TABLE [${tablename}](
`;

    for (var i = 0; i < header.length; i++) {
        var header_i = header[i];

        if (typeof header_i === "undefined") {
            header_i = `Col${header_i}`;
        }

        sheader += `  [${header_i}] nvarchar(max)${i == header.length - 1 ? "\r\n)" : ",\r\n"}`;
    }

    //var sql_file = `${__dirname}/Script_${Math.random()}.sql`;

    function append_file(s) {
        (async function () {
            await fs.appendFileSync(sql_file, s, null);
        }());
    }

    append_file(`${sheader}\r\n\r\n`);

    for (var i = 1; i < data.length; i++) {

        var data_i = data[i];

        // fill empty with undefined to use map
        for (var j = 0; j < data_i.length; j++) {
            if (typeof data_i[j] === "undefined") {
                data_i[j] = undefined;
            }
        }

        // add string delimiters
        var q_values = data_i.map(function (x, idx) {

                if (x == null || x == undefined) {
                    return 'null';
                }

                return "'" + x.toString()
                    .replace(/(\r\n|\r|\n)/g, "")
                    .replace(/'/g, "''")
                    .trim() + "'";

            })
            .join(",");

        // export sql insert
        append_file(`INSERT INTO ${tablename} VALUES(${q_values})\r\n`);
    }

    var imported_rows = data.length -1;

    append_file("\r\n".repeat(3) + `-- Count =  ${imported_rows}`);

    append_file(`\r\nSELECT COUNT(*) FROM ${tablename}`);

    return imported_rows;

}

exports.Data = Data;
exports.Sql = Sql;