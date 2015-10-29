<pre style="background-color:#0c1021;color:#f8f8f8;font-family:'Consolas';font-size:10.5pt;"># log4js-node [![Build Status](https://secure.travis-ci.org/nomiddlename/log4js-node.png?branch=master)](http://travis-ci.org/nomiddlename/log4js-node)

[![NPM](https://nodei.co/npm/log4js.png?downloads=true&amp;downloadRank=true&amp;stars=true)](https://nodei.co/npm/log4js/)

This is a conversion of the [log4js](https://github.com/stritti/log4js)
framework to work with [node](http://nodejs.org). I've mainly stripped out the browser-specific code and tidied up some of the javascript. 

fork from https://github.com/nomiddlename/log4js-node

The help of this module: 
1<span style="font-family:'宋体';">、</span>init
```javascript
global._Log = require('log-4js')();
```
or
```javascript
global._Log = require('log-4js')(config);
```
the config is the same as original log4js module
2<span style="font-family:'宋体';">、</span>use
you can use it anywhere<span style="font-family:'宋体';">：
</span>```javascript
_Log.trace('db query error,id:' + 1);
_Log.debug('db query error,id:' + 1);
_Log.info('db query error,id:' + 1);
_Log.warn('db query error,id:' + 1);
_Log.error('db query error,id:' + 1);
_Log.fatal('db query error,id:' + 1);
_Log.traceObj('db query error,params:', {id: 1, name: 'tom'});
_Log.errorObj('db query error,params:', {id: 1, name: 'tom'});
_Log.fatalObj('db query error,params:', {id: 1, name: 'tom'});
```
3<span style="font-family:'宋体';">、</span>print
[2015-10-29 16:12:28.107] [TRACE] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:7:6)
db query error,id:1
[2015-10-29 16:12:28.108] [DEBUG] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:8:6)
db query error,id:1
[2015-10-29 16:12:28.109] [INFO] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:9:6)
db query error,id:1
[2015-10-29 16:12:28.109] [WARN] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:10:6)
db query error,id:1
[2015-10-29 16:12:28.110] [ERROR] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:11:6)
db query error,id:1
[2015-10-29 16:12:28.110] [FATAL] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:12:6)
db query error,id:1
[2015-10-29 16:12:28.110] [TRACE] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:13:6)
db query error,params:
[2015-10-29 16:12:28.110] [TRACE] - - { id: 1, name: 'tom' }
[2015-10-29 16:12:28.112] [ERROR] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:14:6)
db query error,params:
[2015-10-29 16:12:28.112] [ERROR] - - { id: 1, name: 'tom' }
[2015-10-29 16:12:28.112] [FATAL] - - at Object.&lt;anonymous&gt; (d:\Documents\WorkSpace\fps\test\test.js:15:6)
db query error,params:
[2015-10-29 16:12:28.112] [FATAL] - - { id: 1, name: 'tom' }




The help of original module:
Out of the box it supports the following features:

* coloured console logging
* replacement of node's console.log functions (optional)
* file appender, with log rolling based on file size
* SMTP appender
* GELF appender
* hook.io appender
* Loggly appender
* Logstash UDP appender
* multiprocess appender (useful when you've got worker processes)
* a logger for connect/express servers
* configurable log message layout/patterns
* different log levels for different log categories (make some parts of your app log as DEBUG, others only ERRORS, etc.)

NOTE: from log4js 0.5 onwards you'll need to explicitly enable replacement of node's console.log functions. Do this either by calling `log4js.replaceConsole()` or configuring with an object or json file like this:

```javascript
{
  appenders: [
    { type: &quot;console&quot; }
  ],
  replaceConsole: true
}
```

## installation

npm install log-4js


## usage

Minimalist version:
```javascript
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.debug(&quot;Some debug messages&quot;);
```
By default, log4js outputs to stdout with the coloured layout (thanks to [masylum](http://github.com/masylum)), so for the above you would see:
```bash
[2010-01-17 11:43:37.987] [DEBUG] [default] - Some debug messages
```
See example.js for a full example, but here's a snippet (also in fromreadme.js):
```javascript
var log4js = require('log4js'); 
//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/cheese.log'), 'cheese');

var logger = log4js.getLogger('cheese');
logger.setLevel('ERROR');

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
```
Output:
```bash
[2010-01-17 11:43:37.987] [ERROR] cheese - Cheese is too ripe!
[2010-01-17 11:43:37.990] [FATAL] cheese - Cheese was breeding ground for listeria.
```    
The first 5 lines of the code above could also be written as:
```javascript
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
  ]
});
```

## configuration

You can configure the appenders and log levels manually (as above), or provide a
configuration file (`log4js.configure('path/to/file.json')`), or a configuration object. The 
configuration file location may also be specified via the environment variable 
LOG4JS_CONFIG (`export LOG4JS_CONFIG=path/to/file.json`). 
An example file can be found in `test/log4js.json`. An example config file with log rolling is in `test/with-log-rolling.json`.
By default, the configuration file is checked for changes every 60 seconds, and if changed, reloaded. This allows changes to logging levels to occur without restarting the application.

To turn off configuration file change checking, configure with:

```javascript
var log4js = require('log4js');
log4js.configure('my_log4js_configuration.json', {});
```
To specify a different period:

```javascript
log4js.configure('file.json', { reloadSecs: 300 });
```
For FileAppender you can also pass the path to the log directory as an option where all your log files would be stored.

```javascript
log4js.configure('my_log4js_configuration.json', { cwd: '/absolute/path/to/log/dir' });
```
If you have already defined an absolute path for one of the FileAppenders in the configuration file, you could add a &quot;absolute&quot;: true to the particular FileAppender to override the cwd option passed. Here is an example configuration file:

#### my_log4js_configuration.json ####
```json
{
  &quot;appenders&quot;: [
    {
      &quot;type&quot;: &quot;file&quot;,
      &quot;filename&quot;: &quot;relative/path/to/log_file.log&quot;,
      &quot;maxLogSize&quot;: 20480,
      &quot;backups&quot;: 3,
      &quot;category&quot;: &quot;relative-logger&quot;
    },
    {
      &quot;type&quot;: &quot;file&quot;,
      &quot;absolute&quot;: true,
      &quot;filename&quot;: &quot;/absolute/path/to/log_file.log&quot;,
      &quot;maxLogSize&quot;: 20480,
      &quot;backups&quot;: 10,
      &quot;category&quot;: &quot;absolute-logger&quot;          
    }
  ]
}
```    
Documentation for most of the core appenders can be found on the [wiki](https://github.com/nomiddlename/log4js-node/wiki/Appenders), otherwise take a look at the tests and the examples.

## Documentation
See the [wiki](https://github.com/nomiddlename/log4js-node/wiki). Improve the [wiki](https://github.com/nomiddlename/log4js-node/wiki), please.

There's also [an example application](https://github.com/nomiddlename/log4js-example).

## Contributing
Contributions welcome, but take a look at the [rules](https://github.com/nomiddlename/log4js-node/wiki/Contributing) first.

## License

The original log4js was distributed under the Apache 2.0 License, and so is this. I've tried to
keep the original copyright and author credits in place, except in sections that I have rewritten
extensively.
</pre>