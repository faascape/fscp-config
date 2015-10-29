# Simple JSON configuration loader


## Description

This is a small module used to load application configuration files from a set of directories.

The module find the correct configuration file using default values to navigate
in directories tree.

Your configuration directory must be set up as :

- ROOT CONFIG DIR:
   - all-hosts (contains all config files common to all hosts in your platform)
  
     - all-apps (contains files common to all hosts and all applications)
       file1.json
       file2.json
       
     - application name 1 (all config files common to application 1 on all hosts)

      fileA.json
      fileB.json
     
     - application name 2 

      ...

    - application name X

  - hostname 1 (contains all files specific to this host name)
  
    - all-apps (files for all apps in host 1)
    
    - application name 1 (specific files for app 1 on host 1)


## Usage

* load config file config.json

``` javascript
var confMgr = require('fscp-config');

var config = configMgr.loadConfig('my-config-root', 'my-appl', 'my-config.json');
```

config.json may be in :
- my-config-root/hostname1/my-appl/config.json
- my-config-root/hostname/all-apps/config.json
- my-config-root/all-hosts/my-appl/config.json
- my-config-root/all-hosts/all-apps/config.json
- ./config.json


* load default config file (config.json)

``` javascript
var confMgr = require('fscp-config');

var config = configMgr.loadConfig('my-config-root');
```

* do not parse config file

``` javascript
var confMgr = require('fscp-config');

var config = configMgr.loadConfig('my-config-root', 'my-appl', 'my-config.json', true);
```


* find path to target config file

``` javascript
var confMgr = require('fscp-config');

var config = configMgr.locateConfigFile('my-config-root', 'my-appl', 'my-config.json');
```



## Tests

```
npm test
npm coverage

```

