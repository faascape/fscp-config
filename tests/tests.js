var assert = require('assert');
var confMgr = require('../conf.js');


describe('Configuration', function() {


	
  describe('loadConf()', function () {
    
    it('should return javascript object when target file exists', function () {
      var config = confMgr.loadConf("tests/config/all-hosts/test1/config1.json");
      assert.equal(config.name, "config1");
    });
    
    it('should return null if target is not there', function () {
      var config = confMgr.loadConf("tests/config/toto/test1/config1.json");
      assert.equal(config, null);
    });

    it('should return null if local target is not there', function () {
      var config = confMgr.loadConf("config5.json");
      assert.equal(config, null);
    });

    it('should return text config if raw mode is required', function () {
      var config = confMgr.loadConf("tests/config/all-hosts/test1/config1.json", true);
      assert.equal(typeof config, "string");
    });

    it('should use default parameters value if nothing is provided', function () {
      var config = confMgr.loadConf();
      assert.equal(config.name, "config");
    });

    
  });
  
  
  
  describe('locateConfigFile()', function () {
    
    it('should return relative config file path when target file exists', function () {
      var fileLocation = confMgr.locateConfigFile("tests/config", "test1","config1.json");
      assert.equal(fileLocation, "tests/config/all-hosts/test1/config1.json");
    });
    
    
    it('should return null when target file doesn\'t exist', function () {
      var fileLocation = confMgr.locateConfigFile("tests/config", "toto","config1.json");
      assert.equal(fileLocation, null);
    });
    
    
    it('should return generic config path if specific is not found', function () {
      var fileLocation = confMgr.locateConfigFile("tests/config", "toto","config2.json");
      assert.equal(fileLocation, "tests/config/all-hosts/all-apps/config2.json");
    });

    it('should return file in current directory as last resort', function () {
      var fileLocation = confMgr.locateConfigFile("tests/config", "toto","config3.json");
      assert.equal(fileLocation, "config3.json");
    });

    it('should use default parameters value if nothing is provided', function () {
      var fileLocation = confMgr.locateConfigFile("tests/config");
      assert.equal(fileLocation, "tests/config/all-hosts/all-apps/config.json");
    });


    
  });
  
  
  describe('getConfig()', function () {
    
    it('should return javascript object when target file exists', function () {
      var config = confMgr.getConfig("tests/config", "test1","config1.json");
      assert.equal(config.name, "config1");
    });
    
    
    it('should return null when target file doesn\'t exist', function () {
      var config = confMgr.getConfig("tests/config", "toto","config1.json");
      assert.equal(config, null);
    });
    
    
    it('should return generic config if specific is not found', function () {
      var config = confMgr.getConfig("tests/config", "toto","config2.json");
      assert.equal(config.name, "config2");
    });

    it('should return config in current directory as last resort', function () {
      var config = confMgr.getConfig("tests/config", "toto","config3.json");
      assert.equal(config.name, "config3");
    });
    
    
    it('should use default parameters value if nothing is provided', function () {
      var config = confMgr.getConfig("tests/config");
      assert.equal(config.name, "config");
    });
    
    
    
  });
  
  
  
});