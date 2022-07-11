<a href="https://github.com/realsee-developer/open-center-framework"><img src="https://vrlab-static.ljcdn.com/release/web/pic/realsee-logo.9b303b78.png"></a>

# 如视开放台VR云开发 应用示例

这个目录是基于如视开放台VR云开发的一个 **[Realsee Open Center Framework VR](https://open-platform.realsee.com/)** 应用示例，包含 如视开放平台三维空间应用 部署，可以基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境

## 线上演示地址

[https://open-center.realsee.com](https://open-center.realsee.com)

点击下方按钮使用 **[Realsee Open Center Framework](https://github.com/realsee-developer/open-center-framework)** 可以在云端一键部署本项目到自己的云开发账号上。

[![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2Frealsee-developer%2Fopen-center-framework%2Ftree%2Fmain)

## 部署一个 Realsee Open Center Framework 应用

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CLI_GUIDE.md)

### 步骤二. 初始化应用示例

在命令行执行

```
git clone https://github.com/realsee-developer/open-center-framework RealseeOpenCenter
```

### 步骤二. 配置环境变量文件 .env

```
envId="云开发环境ID"
```

### 步骤三. 一键部署

进入到项目目录，在命令行执行

```
tcb deploy
```

## 开发命令及配置

### 本地开发

```
npm run dev
```

### 上线部署

```
npm run deploy
```

### 如视开放平台 相关开发文档

查看 **[如视开放平台](http://open-platform.realsee.com/)**

### CloudBase Framework 相关开发配置

查看 [CloudBase Framework 配置](https://github.com/TencentCloudBase/cloudbase-framework).

### Next 相关开发配置

查看 [Configuration Reference](https://nextjs.org/docs/api-reference/next.config.js/introduction).
