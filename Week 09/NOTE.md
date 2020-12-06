# 学习笔记

## HTML解析模块
实际生产过车个闹钟功能http请求的响应应逐段返回，toy browser中整体返回。 拆分parser.js

## CSS计算
- 遇到style 标签时候，把css规则保存起来
- 通过css parser来分析css 规则
- 创建一个元素后，立即计算css
- 理论上，当我们分析一个元素的时候，所有的css规则已经收集完毕；
- 在真是的浏览器钟可能遇到写在body的style标签，需要重新css计算

## 创建元素，创建token序列，完成词法分析
创建数组，保存token。状态机节点，保存需要的token，完成html词法分析。

## 用栈构建dom树的原理
emit函数接受了所有的token。在此完成dom树的构建》

创建根节点 let stack = [{type: 'document', children: []}];

取出栈顶元素 let top = stack[stack.length - 1]

如果遇到startTag token，创建element，入栈
