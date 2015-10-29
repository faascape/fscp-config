var fs = require('fs');
var os = require('os');

var DEFAULT_CONFIG_NAME = "config.json";

var ALL_APPS = 'all-apps';
var ALL_HOSTS = 'all-hosts';


var loadConf = exports.loadConf = function(confName, raw) {
  if(!confName) {
    confName = DEFAULT_CONFIG_NAME;
  }
  try {
    var config = fs.readFileSync(confName, 'utf8');
    return raw ? config : JSON.parse(config);
  }
  catch(ex) {
    return null;
  }
};


function normalizeDirName(dirName) {
  if(!dirName || dirName.length === 0) {
    return './';
  }
  return dirName.charAt(dirName.length-1) == '/' ? dirName : dirName+'/';
}

function findConfigFile(configDir, host, appName, configName) {
  try {
    var path = normalizeDirName(configDir)+host+'/'+appName+'/'+configName;
    return fs.statSync(path) ? path : null;
  }
  catch(err) {
    return null;
  }
}


/*
 * try to locate a configuration file
 * configDir : root directory for all configuration files
 * appName : name of current app
 * configName : file name
 * return path name of found file
 *
 * location algorithm
 * try in order
 * CONFIG DIR/HOST NAME/APP NAME/FILE
 * CONFIG DIR/HOST NAME/all-apps/FILE
 * CONFIG DIR/all-hosts/APP NAME/FILE
 * CONFIG DIR/all-hosts/all-apps/FILE
 * FILE
 */


var locateConfigFile = exports.locateConfigFile = function(configDir, appName, targetFile) {
  var configName = targetFile||DEFAULT_CONFIG_NAME;
  var rootDir = normalizeDirName(configDir);
  var hostDir = os.hostname();
  var targetApp = appName || ALL_APPS;
  var completePath = findConfigFile(rootDir, hostDir, targetApp, configName);
  if(completePath) {
    return completePath;
  }
  completePath = findConfigFile(rootDir, hostDir, ALL_APPS, configName);
  if(completePath) {
    return completePath;
  }
  completePath = findConfigFile(rootDir, ALL_HOSTS, targetApp, configName);
  if(completePath) {
    return completePath;
  }
  completePath = findConfigFile(rootDir, ALL_HOSTS, ALL_APPS, configName);
  if(completePath) {
    return completePath;
  }
  
  try {
   return fs.statSync(configName) ? configName : null; 
  }
  catch(err) {
    return null;
  }
};

/*
 * try to locate and load a JSON configuration file
 * configDir : root directory for all configuration files
 * appName : name of target app
 * configName : file name
 * raw : if true don't parse json content file
 * return javascript object with file content if file found or null
 */

exports.getConfig = function(configDir, appName, targetFile, raw) {
  var completePathName;
  
  if(arguments.length == 1) {
    completePathName = locateConfigFile(configDir, ALL_APPS, DEFAULT_CONFIG_NAME);
  }
  else {
    completePathName = locateConfigFile(configDir, appName, targetFile);  
  }

  
  if(completePathName) {
    return loadConf(completePathName, raw);
  }

  return null;
};
