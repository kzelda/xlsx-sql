#!/usr/bin/env node

var lib = require("../src/lib");
var fs = require("fs");

var argv = process.argv;

if (argv.length == 2) {
    console.warn('xlsx-sql xlsx_filename [optional_sql_filename]');
    process.exit(1);
}

var args = argv.slice(2);
var xlsx_file = args[0];
var sql_file = args.length == 1 ? `_Script${Math.random()}.sql` : args[1];

fs.exists(xlsx_file,exists => {
    if(!exists){
        console.warn("xlsx file not found !");
    }
    else{
        lib.Sql(xlsx_file , sql_file);
    }
})





