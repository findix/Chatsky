# 在线聊天室Chatsky —— Node.js + Angular.js + Socket.io

Web2.0大作业项目，一通宵写的外加后面几天抽空修修补补，css直接无耻的用了微信网页版（企鹅蜀黍不要吊打我），借鉴并使用了网上的一些样例代码，在此一并说明。项目以及doc目录里有文档，内容比较恶心大作业稳定嘛你懂的，源码和文档全部授权做任何使用包括但不限于交作业（特别是要求用 Angular.js 和 Socket.io 写个 Single Page Application 这种奇怪的神奇要求……）
> 开发环境：
系统：Windows 8.1 Update
服务器环境：nodejs 0.10.29
服务器包管理器：npm
前端js包管理器：bower
服务器语言：CoffeeScript
MVC框架：Express 4
数据库：MongoDB
ORM框架：Mongoose
模板引擎：ejs
Web Socket实现解决方案：Socket.io
单元测试框架：Karma
前端页面语言：HTML5
层叠样式表语言：CSS3、LESS
页面脚本语言：Javascript、CoffeeScript
页面开源框架：Angular.js, jquary, Bootstrap
版本控制软件：Git
版本控制服务：Github
数据库托管平台：Mongohq
IDE：JetBrain Webstorm

## 简介
本项目作为即时聊天平台，是一个典型的Web App，作为Single-page Application展示可以获得较好的效果。
网页即时通讯主要需要解决的问题是长连接、动态数据绑定以及大量并发访问。
本项目拟使用WebSocket的一个实现Socket.IO以及AngularJS库解决这两大问题，通过这两个工具的搭配使用，可以较好满足SPA6大特点。
Node.js作为单线程异步实现，搭配V8引擎JIT编译的高效，在1000并发条件下满足系统稳定运行是可行的。

## ab测试

### 测试环境
网络环境：
内网

压力测试服务器：
服务器系统：Linux Ubuntu 14.04(Vmware虚拟机)
服务器配置：Intel(R) Core(TM) CPU i5 2430M 2.40GHz 2 CORES

内存：4GB
发包服务器：
发包工具：apache 2.2.19自带的ab测试工具

服务器系统：Windows(R) 8.1 简体中文企业版 64bit 

服务器配置：Intel(R) Core(TM) CPU i5 2430M 2.40GHz 4 CORES
内存：8GB

### 参数
url: /
并发：1000
次数：10

### 结果
	This is ApacheBench, Version 2.3 <$Revision: 655654 $>
	Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
	Licensed to The Apache Software Foundation, http://www.apache.org/
	
	Benchmarking localhost (be patient)
	
	
	Server Software:
	Server Hostname:localhost
	Server Port:80
	
	Document Path:  /
	Document Length:4017 bytes
	
	Concurrency Level:  1000
	/* 整个测试持续的时间 */
	Time taken for tests:   36.869 seconds
	/* 完成的请求数量 */
	Complete requests:  10000
	/* 失败的请求数量 */
	Failed requests:0
	Write errors:   0
	/* 整个场景中的网络传输量 */
	Total transferred:  43235848 bytes
	HTML transferred:   40170000 bytes
	/* 每秒事务数 ，mean 表示这是一个平均值 */
	Requests per second:271.23 [#/sec] (mean)
	/* 平均事务响应时间 ，mean 表示这是一个平均值 */
	Time per request:   3686.857 [ms] (mean)
	Time per request:   3.687 [ms] (mean, across all concurrent requests)
	/* 平均每秒网络上的流量，可以帮助排除是否存在网络流量过大导致响应时间延长的问题 */
	Transfer rate:  1145.22 [Kbytes/sec] received
	
	/* 网络上消耗的时间的分解 */
	Connection Times (ms)
	  min  mean[+/-sd] median   max
	Connect:00  10.0  0 508
	Processing:   188 3570 649.5   37324442
	Waiting:   12  155 447.6 182287
	Total:188 3570 649.6   37324442
	
	/* 整个场景中所有请求的响应情况。在场景中每个请求都有一个响应时间，其中 50 ％ 的用户响应时间小于 3732 毫秒， 66 ％ 的用户响应时间小于 3094 毫秒，最大的响应时间小于 4442 毫秒 */
	Percentage of the requests served within a certain time (ms)
	  50%   3732
	  66%   3782
	  75%   3816
	  80%   3830
	  90%   3926
	  95%   4069
	  98%   4105
	  99%   4125
	 100%   4442 (longest request)

### 结论

本测试在36.869s内完成了10次1000并发测试，所有响应均全部完成，没有失败请求。其中50%请求在3.7s内完成，最长请求时间为4.4s，考虑到服务器性能以及环境，该结果被认为是可以接受的，所以我们可以认为本系统在1000并发情况下是可用的。

# LICENCE
```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2014 Sean Fung <fengxiang220@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
```
