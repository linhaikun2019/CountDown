# CountDown

<div align="center">
<font size="5px">一个基于NodeJS+Electron开发的倒计时小程序</font><br>
<a href="https://nodejs.org/en/" title="NodeJS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" width="200" alt="node" /></a>
<a href="https://www.electronjs.org/" title="Electron"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/electron/electron-original.svg" width="80" alt="electron" /></a><br>
<a href="https://github.com/linhaikun2019/CountDown"><img src="https://img.shields.io/badge/CountDown-1.1.0-brightgreen" alt="CountDown"/></a>
<a href="https://nodejs.org/download/release/v14.17.3/"><img src="https://img.shields.io/badge/NodeJS-14.17.3-green" alt="NodeJS"/></a>
<a href="https://github.com/electron/electron/releases/tag/v13.1.9"><img src="https://img.shields.io/badge/Electron-13.1.9-yellowgreen" alt="Electron"/></a><br><br><br>
<img src="https://raw.githubusercontent.com/linhaikun2019/CountDown/main/img/cover.jpg" alt="cover" width="800"/>
</div>



## 简介

CountDown是一款基于NodeJS+Electron框架开发的倒计时小程序，软件应用场景主要用于教学演讲，嬉戏玩耍，竞技比赛等需要辅助计时的场景，增添活动趣味性和挑战性。针对于演讲方面，本软件可以应用于各种面试，述职演讲等场景，为演讲者提供最基本的时间提醒功能，让他们对时间的把控更加胸有成竹，也可以适用于其他一些需要倒计时的场景，比如企业年会，平常的游戏挑战等，但本软件为PC桌面端程序，所以应对场景有限，请使用者多加注意，只能适用于PC上的计时场景，如果脱离计算机将无法发挥本软件的作用，望各位使用者知悉！

本软件是基于NodeJS和Electron框架开发的，NodeJs即Node.js，Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台，Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。Electron框架提供了丰富的本地（操作系统）的API，使之能够使用纯JavaScript来创建桌面应用程序，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

本软件主要特性如下：

* 简洁清新的UI，使人耳目一新

* 丰富的计时功能，应对各种场景

* 小窗模式，让演讲时不畏干扰

* 灵动的提示音效，增添互动乐趣



##  使用指南

CountDown现已开源，大家可以提出issue或发起pr，并参与此软件的协作中，我们对大家提出的反馈都会努力跟进，集中总结在下一版本中更新迭代，谢谢大家支持！

本程序已通过electron-packger打包成可执行程序，大家可以直接下载，此为免安装版，大家直接运行程序目录的CountDown.exe就可以执行使用了，可执行程序已打包上传蓝奏云，下面是链接，可以直接去下载：

[https://wwe.lanzouo.com/ihhG6z5yn2j](https://wwe.lanzouo.com/ihhG6z5yn2j)

如果您也想学习或协作程序源码的话，也可以通过开发环境运行程序，具体步骤如下：

1. 首先您需要在您的电脑上安装Node.js（程序基于Node14.17.3版本，但也向上兼容，可以安装最新版Node）

   具体安装步骤直接访问Node官网，下载相对应系统版本安装就行，安装完以后打开命令行输入`node -v`和`npm -v`检查node和npm是否安装成功，推荐通过node版本安装器nvm来管理node版本。

2. clone本程序代码到您本地工作区，打开命令行终端或IDE（推荐VSCode)安装Electron框架

   建议将npm换成淘宝镜像cnpm，可以显著提升速度和效率

   `npm install -g cnpm --registry=https://registry.npm.taobao.org`

   之后输入`cnpm install -g electron`安装Electron框架（程序基于Electron13.1.9版本，以上版本没有测试过兼容性，推荐安装此版本`cnpm i -D electron@13.1.9`，然后命令`electron -v`检查electron是否成功安装已经安装版本等。

3. 然后运行程序使用命令`electron .`即可打开可执行程序，本程序内置electron-packger打包插件，如您参与贡献代码以后也可打包成可执行程序：

   > `cnpm install -g electron-packager`	
   >
   > `electron-packager . CountDown --platform=win32 --arch=x64 --out=./out --asar --app-version=1.1.0 --overwrite --ignore=node_modules --electron-version 13.1.9`

以上是基本的软件安装和使用步骤，本软件皮肤背景图和音效支持自定义，可以直接替换根目录下img文件夹bg1.jpg（必须同名）和sound文件夹下sound.mp3（必须同名）



## 支持作者与参与贡献

####  作者联系方式:

email:linhaikun2015@163.com



本程序完全开源，希望各位前端大佬多多协助参与贡献，在下学疏才浅，本程序刚刚上线，难免有各种bug，还希望大家积极提出issue，或参与pr，如您觉得本程序非常好用，也请您给个star作为支持的动力，在此感谢大家支持与配合！
