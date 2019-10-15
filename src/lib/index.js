'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var xlsx = require('node-xlsx').default;
var fs = require("fs");

//var fs = require("fs");

var Data = function Data(xlsx_path) {
    return xlsx.parse(xlsx_path);
};

var Sql = function Sql(xlsx_file,sql_file) {

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

    for (let i = 0; i < header.length; i++) {
        sheader += `  [${header[i]}] nvarchar(max)${i == header.length - 1 ? "\r\n)" : ",\r\n"}`;
    }

    //var sql_file = `${__dirname}/Script_${Math.random()}.sql`;

    async function append_file(s) {
        await fs.appendFileSync(sql_file, s, null);
    }

    append_file(`${sheader}\r\n\r\n`);

    for (let i = 1; i < data.length; i++) {

        var data_i = data[i];

        // fill empty with undefined to use map
        for (let j = 0; j < data_i.length; j++) {
            if (!data_i[j]) {
                data_i[j] = undefined;
            }
        }

        // add string delimiters
        var q1 = data_i.map(function (x, idx) {

            if (x == null || x == undefined) {
                return 'null';
            }

            return "'" + x.toString()
                .replace(/\r/g, "")
                .replace(/\n/g, "")
                .replace(/'/g, "''") + "'";

        });

        // export sql insert
        (async function () {
            await append_file(`INSERT INTO ${tablename} VALUES(${q1.join(",")})\r\n`);
        })();
    }
}

// var ImportJsonFromFile = function Json(xlsx_path) {
//     return JSON.stringify(Data(xlsx_path));
// };

// var ExportJsonToFile = function WriteFile(xlsx_path,json_path) {

//     fs.writeFile(json_path,
//         ImportJsonFromFile(xlsx_path),
//         function(x){}
//     );
// };

// exports.Json = ImportJsonFromFile;
// exports.WriteFile = ExportJsonToFile;
exports.Data = Data;
exports.Sql = Sql;