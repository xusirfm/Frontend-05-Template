# 学习笔记

## 有限状态机
有限状态机是一种用来进行对象行为建模的工具，其作用主要是描述对象在它的生命周期内所经历的状态序列，以及如何响应来自外界的各种事件。在计算机科学中，有限状态机被广泛用于建模应用行为、硬件电路系统设计、软件工程，编译器、网络协议、和计算与语言的研究。比如下图非常有名的TCP协议状态机。

## HTTP请求的处理
nodejs中网络相关的两个包：
- net：TCP相关
- http: HTTP相关

## 浏览器渲染过程

url -> html -> (parse) ->dom -> (css computing) -> dom with css -> (layout) -> dom with position -> (render) -> bitmap
