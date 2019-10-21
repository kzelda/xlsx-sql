#!/usr/bin/env node

var lib = require("../src/lib");
var fs = require("fs");
var path = require("path");

var argv = process.argv;
var version = require("../package.json").version;





if (argv.length == 2) {
    console.warn('xlsx-sql xlsx_filename [optional_sql_filename]');
    process.exit(1);
}

if (argv.length == 3) {
    var arg3 = argv[2].toString().toLowerCase();

    if(arg3 == "-v" || arg3 == "--version"){
        console.log(`v${version}`);
        process.exit(0);
    }    
}

//console.log(JSON.stringify(process.argv,null,'\t'));

var args = argv.slice(2);
var xlsx_file = args[0];
var sql_file = args.length == 1 ? path.resolve(path.dirname(xlsx_file),`_Script${Math.random()}.sql`)  : args[1];


fs.exists(xlsx_file,exists => {
    if(!exists){
        console.warn("xlsx file not found !");
    }
    else{
        var rows = lib.Sql(xlsx_file , sql_file);
        console.log("(",rows,") rows imported to :" , sql_file);        
    }
})





