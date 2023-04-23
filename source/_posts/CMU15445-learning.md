---
title: CMU15445_learning
copyright_author: NinoNeumann
copyright_author_href: 'https://ninoneumann.cn/'
date: 2023-03-27 12:58:26
updated: 2023-03-27 12:58:26
tags: 
- CMU15445
- database
categories:
- 学习笔记
keywords: CMU15445
description: 记录CMU15445学习过程
cover: https://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/Cover_img/106446680_p0.png
---



{% timeline 2023,orange %}
<!-- timeline 03-27 -->
初步完成了homework1 但是上传测试结果不理想
<!-- endtimeline -->

<!-- timeline 03-28 -->
今天来找homework中的错误，争取这次满分通过测试.

<!-- endtimeline -->

<!-- timeline 03-29 -->
完成project-0

<!-- endtimeline -->

<!-- timeline 03-30 -->
project0 终于运行起来了，哭。

<!-- endtimeline -->

{% endtimeline %}







[TOC]

# 数据库基本介绍

## SQL语句基础

### SQL 中的基本数据类型

- char(n)
- varchar(n)  指定最长为n的字符串
- numeric(p,q)   一共有p位 q位位小数位
- int   
- smallint
- real precision / double precision  单精度/双精度 浮点数
- float(n)  精度至少为n的浮点数

### 完整性约束 概念

- primary key  主键 主码 属性： 虽然在create table时是可选的，每个元组的主键的值是不能重复的。

```sql
primary key (colunm)
```

- foreign key reference： 外键

```sql
foreign key (column) reference (table)
```

- not null  非空

```sql
create table stus(
	stu_id int not null,
	stu_name varchar(20) not null,
	primary key (stu_id)
);
```

==sql 禁止破环完整性约束的操作出现==

如果任意一条插入到当前关系中的元组有违反完整性约束的条件存在 sql就会报错。

### sql 插入元组操作

```sql
insert into (table) values ([v1,[v2,[v3...]]]);
```

### sql 删除一个关系（表）中所有元组操作

```sql
delete from table_name; # 这种方式会保留表（关系）可以继续对这个表进行操作
```

### sql 删除关系操作（删除表？）

```sql
drop table table_name; # 删除关系
```

drop 删除了一个table 和这个table相关的外键会怎样呢？

### sql 为关系增加/删除 属性

```sql
alter table table_name add (column_name) (column_domain); #  属性的域就是数据类型吧
```

```sql
alter table table_name drop (column_name);
```

## SQL 查询操作

### 查询操作简介

在一个关系上进行“查询操作”将查询结果构建成一个关系 作为返回。=> 关系

### 单关系查询

### 多关系查询

## SQL index 索引





## SQL  AGGREGATES 聚集函数

作用将从结果中计算整个集合中的一些类似 sum average 这样的函数

聚集函数最后返回的是一个值，你得保证这次查询的东西都在这个结果中

- AVG()  	    支持DISTINCT
- MIN()
- MAX()
- SUM()        支持DISTINCT
- COUNT()   支持DISTINCT  
  - count(*) 是有优化的 这个更快！

```sql
select count(distinct column_name) from table_name where column_name like "正则";
```

### GROUP BY + 聚集函数的使用技巧

### HAVING

### ORDER BY

ASC 

DESC

## SQL中的模糊查询

使用LIKE 以及 正则匹配来进行模糊查询（匹配）

## SQLite JOIN

### 交叉连接 CROSS JOIN

将第一个表的每一行与第二个表的每一行进行匹配 假设两个表是x y行，那么输出就是x*y行

语法示例

```sql
SELECT * FROM T1 CROSS JOIN T2;
```

### 内连接

和cross join差不多，但是在连接两个表的时候对每一次的匹配进行比较，当满足连接谓词的时候才会形成一个结果行。

语法示例	

```sql
SELECT * FROM T1 (INNER) JOIN T2 ON condition;
```

自然连接

```sql
SELECT * FROM T1 NATURAL JOIN T2;
```



### 外连接

## UNION 操作

UNION

`UNION`是一种操作符，它用于将两个或多个`SELECT`语句的结果集合并为一个结果集。具体来说，`UNION`操作符会将多个`SELECT`语句的结果集合并成一个结果集，并自动去除其中的重复行。

```sql
SELECT column1, column2, ... FROM table1
UNION
SELECT column1, column2, ... FROM table2
UNION
SELECT column1, column2, ... FROM table3
...

```



`UNION ALL`是一种用于将两个或多个`SELECT`语句的结果集合并为一个结果集的操作符。它与`UNION`操作符不同的是，它不会自动去除结果集中的重复行，而是将所有的行都保留下来。

```sql
SELECT column1, column2, ... FROM table1
UNION ALL
SELECT column1, column2, ... FROM table2
UNION ALL
SELECT column1, column2, ... FROM table3
...

```

## 递归查询

递归查询的结构

- 初始查询
- 递归查询





# CMU15445-HomeWork-1

==任务==：写sql脚本，使用sql语句在IMDb dataset里面查询/完成指定任务

## 环境配置

本机环境：VMware ==Ubuntu 22.04.2 server==

- 安装sqlite3

```bash
# 查看当前linuxOS 是否默认安装了sqlite3
> sqlite3
# 如果没有就sudo 安装
> sudo apt install sqlite3
```

- 下载数据

```bash
> wget https://15445.courses.cs.cmu.edu/fall2022/files/imdb-cmudb2022.db.gz
```

- (可选) 检查数据的完整性
- 给各个表创建索引
- 了解数据中的各个表

![schema](https://15445.courses.cs.cmu.edu/fall2022/files/schema2022.png)



- people

- title

- akas
- rating
- crew

> TIPS:
>
> 本次作业中，将title表称作 works
>
> 在akas表中不会使用 `region`, `types`, `attributes` 或者`is_original_title`
>
> 对于crew表，不会使用  `job` or `characters`，当考虑一个人的职责的时候指的就是 `category`

## 作业准备

### placeholder folder 的构建

```bash
$ mkdir placeholder
$ cd placeholder
$ touch \
  q1_sample.sql \
  q2_sci_fi.sql \
  q3_oldest_people.sql \
  q4_crew_appears_most.sql \
  q5_decade_ratings.sql \
  q6_cruiseing_altitude.sql \
  q7_year_of_thieves.sql \
  q8_kidman_colleagues.sql \
  q9_9th_decile_ratings.sql \
  q10_house_of_the_dragon.sql
$ cd ..
```

### Q1 [0 point] 提交示例

例如按照如下的sql代码为样例写你的作业。

### Q2 [5 points] 找最长时间sci_fi

要求：

- 10个最长时间的works  grenre 是SCI_FI
- 输出 title  premiere date（首映日期） 电影时长+（min）

{% tabs %}
<!-- tab 第一次提交（存在错误） -->

```sql
SELECT primary_title, premiered, CAST(runtime_minutes AS VARCHAR) || "(mins)"
FROM title
WHERE genres LIKE "%Sci-Fi%"
ORDER BY runtime_mins DESC;
```

不会是少了一个空格吧

<!-- endtab -->

<!-- tab 第二次提交 -->

```sql
SELECT primary_title, premiered, CAST(runtime_minutes AS VARCHAR) || " (mins)"
FROM title
WHERE genres LIKE "%Sci-Fi%"
ORDER BY runtime_mins DESC;
```

<!-- endtab -->
{% endtabs %}

如何在输出的东西上任意添加想要附加的字符串？

将int类型的数据映射成字符串 CAST（）然后使用字符串连接符号 || 连接

### Q3 [5 points] 最老的人

要求：

- 这些人需要在1900年之后出生
- 你需要考虑没死的人
- 输出：首先按照年龄排序，相同年龄按照名字的字典序排序
- 输出20个结果  并且按照 name|age 的格式输出

分析：

显然考察的是运算操作。people中born的字段是int died字段也一样。先看没死的人died是不是null

如何计算没死的人的年龄 并将他们放到一起

```sql
CASE
	WHEN died IS NOT NULL
	THEN died - born
	ELSE 2022 - born
END AS age
```

{% tabs test1 %}
<!-- tab 第一次提交（出错） -->

```sql
SELECT name,
	CASE
		WHEN died IS NULL
		THEN 2023-died
		ELSE died-born
    END AS age
FROM people
WHERE born>=1900
ORDER BY age DESC, name ASC
LIMIT 20;
```

可能是时间上出错了 今年是2023年

<!-- endtab -->

<!-- tab 第二次提交 -->

```
SELECT name,
	CASE
		WHEN died IS NULL
		THEN 2022-born
		ELSE died-born
    END AS age
FROM people
WHERE born>=1900
ORDER BY age DESC, name ASC
LIMIT 20;
```

<!-- endtab -->
{% endtabs %}

### Q4 [10 points] 出现次数最多的人

要求：

- 出现次数最多的人
- 输出格式 name 出现次数
- 最多的前20人

分析：

- 将titles 和 crew join到一起

```sql
SELECT p.name,count(p.person_id) AS appear_times
FROM crew AS c, people AS p
WHERE c.person_id==p.person_id
GROUP BY p.person_id
ORDER BY appear_times DESC
LIMIT 20;
```

- 使用inner join 也是一个不错的选择

```sql
SELECT name,count(*) AS appear_times
FROM people AS p JOIN crew AS c
ON p.person_id==c.person_id
GROUP BY p.person_id
ORDER BY appear_times DESC
LIMIT 20;
```

出错原因：有些细节没注意。

### Q5 [10 points]

要求：

- 每十年的平均评分、最高评分、最低评分、上映的电影数量
- 按照平均评分降序排序，同分按照年份升序排序，average rating 保留两位小数

分析：

- 将rating 和 title做一个inner join

```sql
SELECT 
	CAST(premiered/10*10 AS VARCHAR) || "s" AS year, 
	ROUND(AVG(rating),2) AS avg_rating,
    MAX(rating),
    MIN(rating),
    count(*)
FROM 
	titles AS t
INNER JOIN 
	ratings AS r 
ON t.title_id=r.title_id
WHERE premiered IS NOT NULL
GROUP BY year
ORDER BY avg_rating DESC, year ASC;
```

sqlite 整除  / 就是整除

sqlite 保留n位小数 round 

sqlite 取整 ceil floor



### Q6  [10 points] 找人

要求：

- 一个人 名字里有 Cruise  生于1962
- vote 数量最多的作品 前十 
- 输出格式： 作品名称 | 投票数

分析：

- 多表联合查询

```sql
SELECT t.primary_title,votes
FROM 
	ratings AS r
JOIN
	titles AS t
ON t.title_id = r.title_id
JOIN
	crew AS c
ON t.title_id = c.title_id
JOIN 
	people AS p
ON c.person_id = p.person_id
WHERE p.name LIKE "%Cruise%" AND p.born==1962
ORDER BY votes DESC
LIMIT 10;
```

感觉有点慢

```sql
WITH cruise_movies AS (
     SELECT
          crew.title_id AS title_id
     FROM crew
     INNER JOIN
          people ON crew.person_id = people.person_id
     WHERE people.name LIKE "%Cruise%" AND people.born = 1962
)
SELECT
     titles.primary_title as name,
     ratings.votes as votes
FROM
     cruise_movies
INNER JOIN
     ratings ON cruise_movies.title_id = ratings.title_id
INNER JOIN
     titles ON cruise_movies.title_id = titles.title_id
ORDER BY votes DESC
LIMIT 10;
```

### Q7 [15 points] 找特定年份的数据

要求：

- 找和Army of Thieves同年上映的电影数量
- 输出这一年的电影数量

分析：

- 嵌套查询、子查询

```sql
SELECT COUNT(DISTINCT title_id) 
FROM titles
WHERE premiered = (
SELECT premiered
FROM titles
WHERE primary_title = "Army of Thieves"
);
```

### Q8 [15 points]

要求：

- 找到所有与Nicole Kidman  (1967 出生的) 共同出演的演员
- 将所有的actor / actress按照名字的字典序排序

with 前置条件的运用

分析（过程）：

- 首先将这个人的出演过的作品id列出
- 通过这个作品id查所有出现过的人的person -id （使用distinct去重）
- 查people表找上述person-id里面的人的名字

```sql
SELECT title_id 
FROM 
	crew AS c
JOIN
	people AS p
ON c.person_id = p.person_id
WHERE p.name = "Nicole Kidman"
```

```sql
WITH kidman_titles AS (
SELECT title_id 
FROM crew JOIN people ON crew.person_id = people.person_id
WHERE people.name = "Nicole Kidman" AND people.born == 1967
),
WITH kidman_colleagues AS(
SELECT DISTINCT(person_id) AS id
FROM crew 
WHERE (category = "actor" or category = "actress") AND crew.title_id in kidman_titles
)
SELECT name
FROM people
WHERE people.person_id in kidman_colleagues.id
ORDER BY name ASC;
```

### Q9 [15 points]

要求：

- 出生于1955年的演员



```sql
WITH actors_and_movies_1955 AS (
     SELECT
          people.person_id,
          people.name,
          titles.title_id,
          titles.primary_title
     FROM
          people
     INNER JOIN
          crew ON people.person_id = crew.person_id
     INNER JOIN
          titles ON crew.title_id = titles.title_id
     WHERE people.born = 1955 AND titles.type = "movie"
),
actor_ratings AS (
     SELECT
          name,
          ROUND(AVG(ratings.rating), 2) as rating
     FROM ratings
     INNER JOIN actors_and_movies_1955 ON ratings.title_id = actors_and_movies_1955.title_id
     GROUP BY actors_and_movies_1955.person_id
),
quartiles AS (
     SELECT *, NTILE(10) OVER (ORDER BY rating ASC) AS RatingQuartile FROM actor_ratings
)
SELECT name, rating
FROM quartiles
WHERE RatingQuartile = 9
ORDER BY rating DESC, name ASC;
```

### Q10 [15 points]

要求：

- 使用逗号和空格连接TV 龙之家族的 所有unique titles 这些titles必须要按照字典序来

```sql
with p as (
      select titles.primary_title as name, akas.title as dubbed
      from titles
      inner join akas on titles.title_id = akas.title_id
      where titles.primary_title = "House of the Dragon" AND titles.type = 'tvSeries'
      group by titles.primary_title, akas.title
      order by akas.title
),
c as (
      select row_number() over (order by p.name asc) as seqnum, p.dubbed as dubbed
      from p
),
flattened as (
      select seqnum, dubbed
      from c
      where seqnum = 1
      union all
      select c.seqnum, f.dubbed || ', ' || c.dubbed
      from c join
            flattened f
            on c.seqnum = f.seqnum + 1
)
select dubbed from flattened
order by seqnum desc limit 1;

```







### 完成后将sql文件打包

```bash
$ zip -j submission.zip placeholder/*.sql
```



# CMU15445-PROJECT-0

## project-0 任务介绍

目标：

> implement a key-value store backed by a concurrent [trie](https://zh.wikipedia.org/wiki/Trie)

## 环境搭建：

使用的是本地的VMware里面的Ubuntu server 22.04.x版本的

IDE：CLion 通过ssh连接虚拟机

## 前置知识的学习

trie也叫 前缀树、字典树。之前没接触过。先做一下leetcode上的有关前缀树的定义的题目熟悉一下前缀树 

## 前缀树

### 数据结构

is_end bool 表示是否是单词的结束 true表示当前节点为单词的结束

map<char,Trie*> children_nodes; 子节点的连接。

```c++
class Trie {
private:
    // 存储前缀树的存储数据结构
    map<char,Trie*> children_node;
    bool is_End;
    // 内置的搜索前缀的工具函数
    Trie* searchPrefix(string prefix){
        Trie* current_node = this;
        for(auto c:prefix){
            if(current_node->children_node.find(c)==current_node->children_node.end()){
                return nullptr;
            }
            current_node = current_node->children_node[c];
        }
        return current_node;
    }
public:
    Trie() {
        is_End = false;
    }
    
    void insert(string word) {
        Trie* current_node = this;  // 初始指针指向当前根节点
        for(auto c:word){
            if(current_node->children_node.find(c)==current_node->children_node.end()){
                // 表示当前字节点集合中没有这个  所以创建一个
                current_node->children_node[c] = new Trie();
            }
            current_node = current_node->children_node[c];
        }
        current_node->is_End = true;
    }
    
    bool search(string word) {
        Trie* current_node = this->searchPrefix(word);
        return current_node!=nullptr && current_node->is_End;
    }
    
    bool startsWith(string prefix) {
        return this->searchPrefix(prefix)!=nullptr;
    }
};
```

### 左值、右值、左值引用、右值引用

左值：可以放在赋值号的左边充当被赋值的对象，也可以在右边做赋值对象，充当左值的“东西”必须要有在内存上的存储空间。

右值：智能在赋值号的右边，做赋值对象，可以没有存储空间，可以只是一个在cpu寄存器上的一个数据。右值不能被修改

左值引用：引用的是一个对象。

右值引用：引用的是一个数据。这个只能作为右值，他不在内存上占有存储空间。

作用用来提高程序运行效率，避免多余的拷贝操作。

std::move()  将一个左值变为右值

使用临时对象使用的空间，赋值到目标对象中可以节省对内存的释放。

==例如==

```c++
int main() { 
	MyString a; 
	a = MyString("Hello"); 
	std::vector<MyString> vec; 
	vec.push_back(MyString("World")); 
}
```

这个函数在程序结束时一共调用了四次析构函数

```
Copy Assignment is called! source: Hello
Destructor is called!
Copy Constructor is called! source: World
Destructor is called!
Destructor is called!  // 最后两次的析构函数时a 和 vector0 被释放
Destructor is called!
```



####  智能指针

unique_ptr()

独占资源所有权指针，该指针式moveonly的 也就是智能通过move函数将其给赋值到一个左值中

创建：

shared_ptr()

共享资源所有权指针

weak_ptr()

共享资源观察者

### dynamic_cast

将一个基类的指针/引用 指向继承类的指针/引用，dynamic_cast将会判断该基类是否真的指向继承类，如果否则返回null 或者报错







# Linux 一些命令的小记

创建目录：

```bash
> mkdir  path/directory-name
```

创建文件：

``` bash
> touch  path/file-name
```

创建多个文件：

```bash
> touch \

file-name1 \

file-name2 \

....

```

sqlite 执行sql文件











