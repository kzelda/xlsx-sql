#!/usr/bin/env node

var lib = require("../src/lib");
var fs = require("fs");
var path = require("path");

var argv = process.argv;

if (argv.length == 2) {
    console.warn('xlsx-sql xlsx_filename [optional_sql_filename]');
    process.exit(1);
}

console.log(JSON.stringify(process.argv,null,'\t'));

var args = argv.slice(2);
var xlsx_file = args[0];
var sql_file = args.length == 1 ? path.resolve(__dirname,`_Script${Math.random()}.sql`)  : args[1];

fs.exists(xlsx_file,exists => {
    if(!exists){
        console.warn("xlsx file not found !");
    }
    else{
        var rows = lib.Sql(xlsx_file , sql_file);
        console.log("(",rows,") rows imported to :" , sql_file);        
    }
})





