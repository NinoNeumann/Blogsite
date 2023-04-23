---
title: c++中的输入
copyright_author: NinoNeumann
copyright_author_href: 'https://ninoneumann.cn/'
date: 2023-03-29 13:27:08
updated: 2023-03-29 13:27:08
tags:
- c++
categories:
- 算法
cover: https://resource.ninoneumann.cn/Cover_img/86446119_p0.png
---

# 记录一下程序设计中遇到的c++输入形式
## cin

以空格和换行符作为结束的标志，（不读入这两个字符）所以在cin和getline的组合运用中一定要注意。

性能差，但是可以通过

```C++
std::ios::sync_with_stdio(false);
```

将其速度优化到和scanf差不多。

应用场景：一连串读入 （空格分隔 或者 回车分割）

```
1 2 3 4 5 6
1
2
3
4
5
6
-------------------
cin>>a;
```

## scanf()

性能好 ;

应用场景和cin差不多

## getchar()

读一个字符

## getline()

读入一行 以回车为分隔。

通过换行符确定读入边界，最后将换行符丢弃掉。一般读入一个str

```c++
string str;
getline(cin,str);
```



## cin getline 组合运用

先使用cin 再使用getline的场景下一定要再使用完cin后面读入换行符要不然getline会多读一个空白字符。

