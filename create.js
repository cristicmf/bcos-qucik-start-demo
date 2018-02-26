#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const changeCase = require("change-case");
const program = require("commander");

//const components = require('./components');
//const modules = require('./modules');
//const redux = require('./redux');
const common = require('./common');

const { createComponentName, createClassName, createModuleName, clearLine } = common;
//const { Normal } = components;

function wirte(path, code) {
  fs.writeSync(fs.openSync(path, "w"), clearLine(code));
};

function getOpts(name = '', parentName = '', cmd = {}) {
  return Object.assign({
    name,
    parentName,
  }, cmd);
}

function createComp(opts = {}) {
  const name = createComponentName(opts);

   fs.mkdirSync(`./${name}`);

   function copyDir(src, dist, callback) {
    fs.access(dist, function(err){
      if(err){
        // 目录不存在时创建目录
        fs.mkdirSync(dist);
      }
      _copy(null, src, dist);
    });
  
    function _copy(err, src, dist) {
      if(err){
        callback(err);
      } else {
        fs.readdir(src, function(err, paths) {
          if(err){
            callback(err)
          } else {
            paths.forEach(function(path) {
              var _src = src + '/' +path;
              var _dist = dist + '/' +path;
              fs.stat(_src, function(err, stat) {
                if(err){
                  callback(err);
                } else {
                  // 判断是文件还是目录
                  if(stat.isFile()) {
                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                  } else if(stat.isDirectory()) {
                    // 当是目录是，递归复制
                    copyDir(_src, _dist, callback)
                  }
                }
              })
            })
          }
        })
      }
    }
  }
  // 复制文件
   function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
  }

  //copyFile('./startDemo/', `./${name}/`)
  copyDir('./startDemo/', `./${name}/`, function(err){
    if(err){
      console.log(err);
    }
  })
}




function run(name = '', parentName = '', cmd = {}) {
  const opts = getOpts(name, parentName, cmd);


  createComp(opts);
};

program
  .name('create-react-file')
  .arguments('<name> [parentName]')
  .action(run)
  .parse(process.argv); 