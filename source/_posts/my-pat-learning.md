---
totitle: PAT甲级学习记录
copyright_author: NinoNeumann
date: 2023-03-24 16:26:08
updated: 2023-03-24 16:26:08
mathjax: true
tags:
- algorithm
- PAT certificate
categories: "Algorithm"
keywords: "算法"
description: to record my learning on algorithm
cover: https://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/Cover_img/100412772_p0.png
---



{% timeline 2023,blue %}
<!-- timeline 03-29 -->
PAT甲级 进位制
<!-- endtimeline -->

<!-- timeline 03-30 -->
PAT甲级 排序
<!-- endtimeline -->

<!-- timeline 03-31 -->
PAT甲级 排序

- stringstream 类的一些操作
- 如何自定义stl在sort中的排序规则

<!-- endtimeline -->

<!-- timeline 04-01 -->
PAT甲级 排序

PAT甲级 的一些模拟题目

- long long 数据类型的大小判断。

<!-- endtimeline -->

<!-- timeline 04-01 -->
PAT甲级 DFS

acwing上的一些冠以dfs的题解。

<!-- endtimeline -->

<!-- timeline 04-05 -->
PAT甲级 最短路算法复习

- 单源最短路
  - 存在负权边
    - spfa
    - bellman-ford算法
  - 不存在负权边
    - dijkstra
    - 堆优化版本的dijkstra
- 多源最短路
  - floyd算法

<!-- endtimeline -->

<!-- timeline 04-05 -->

- 二分查找找左右边界问题。

<!-- endtimeline -->

<!-- timeline 04-18 -->

- [x] 1497. 树的遍历

<!-- endtimeline -->

<!-- timeline 04-18 -->

- [x] 1498. 最深的根

<!-- endtimeline -->

{% endtimeline %}



[toc]

# PAT-recording



- [x] 进位制
- [ ] 排序



## 进位制

### 1482 进制

分析：

两个数，其中的一个进制是给定的,并且这个数的进制不超过36。

但是另外一个数的进制就不好说了，可能是一个很大的数字。（重点）枚举的区间就是1~target  ：target=给定的数最大能表示的范围也就是$$36^{10}-1$$ 。

显然，不能通过枚举的方法找，使用二分是一个不错的选择。

{% tabs test4 %}
<!-- tab 第一种方法（繁琐） -->

枚举另一个数 将其转化为枚举的进制数字 或者都转化为10进制数字。

需要一个 

```c++
string fuc(string a, int in,int out);
```

 这样的函数将a转化为out 进制数

这个方法实在是太繁琐了，（这个函数我不会写）

<!-- endtab -->

<!-- tab 第二种方法 -->

计算一下两个数如果转化为十进制数 int 或者long long 能否能存下

N是不超过十位的数字 最大就是 十个z  =  $$36^{10}-1$$  可以使用 计算机自带的计算器计算这个数看看是否溢出。（不溢出）

那么就可以找这样的函数

```c++
long long fuc(string a,int out);
```

主要思路就是：二分。

```c++
// 二分模板
int main(){
    int l = floor,r = ceil;
    while(l<r){
        int mid = (l+r)>>1;
        if(check()) r = mid;
        else l = mid+1;
    }
    // 第二个模板   注意左右边界的跳转的条件
    while(l<r){
        int mid = (l+r+1)>>1;
        if(check()) l = mid;  
        else r = mid-1;
    }
    
}
```



```c++
//
// Created by Nino Neumann on 2023/3/29.
//
#include<iostream>
#include<algorithm>
#include<cmath>
using namespace std;
typedef long long LL;
const LL N = 1e16;

int get(char c){
    if(c<='9') return c-'0';
    else return c-'a'+10;
}


LL convert(string a,LL radix){
    LL res = 0;
    LL c = 1;
    for(int i = a.length()-1;i>=0;--i){
        // if((double)res + (get(a[i])*c) > 1e16) return 1e18;
        // cout<<(double)res + (get(a[i])*c)<<"  ";
        res += (get(a[i])*c);
        c *= radix;
        // cout<<"  "<<res<<endl;
        if(res>1e16) return 1e16;
        if(res<0)return 1e16;
        
    }
    // cout<<res<<endl;
    return res;
}

int main(){
    string a,b;
    int tag,radix;
    cin>>a>>b>>tag>>radix;
    if(tag==2) swap(a,b);
    LL a_n = convert(a,radix);
    // cout<<"a_: "<<a_n<<endl;
    
    // 二分的模板
    LL l = 1,r = a_n+1;
    
    for (auto c : b) l = max(l, (LL)get(c) + 1);
    while(l<r){
        LL mid = (l+r)>>1;
        if(convert(b,mid)>=a_n) r = mid;
        else l = mid+1;
    }
    if(convert(b,r)==a_n) cout<<r<<endl;
    else cout<<"Impossible\n";
    // cout<<convert(b,r)<<endl;
    return 0;
}
```



- 上下界的选择：

上下界必须要根据当前这个数来确定进制上下界搜索的范围。

- 做进制转换的时候数据可能会溢出，所以要加以判断，由于确定数最大就是$$36^{10}-1$$ 所以如果当前这一步计算的结果大于这个数就可以直接return一个很大的但是不溢出的数字。
- 由于进制计算的步骤问题，有可能当前判断的时候溢出已经发生所以判断当前计算结果是否小于0 如果是则返回一个很大的数。

<!-- endtab -->
{% endtabs %}



### 1492 可逆质数

简单题，用到的模板就是质数判断

### 1504 火星颜色

简单题 不记录了

值得记录的知识点：stringstream类的一些操作

#### StringStream

包含的头文件： sstream.h

- 可以做普通的字符串输入输出的中转站

```c++
// 初始化一个sstream对象
stringstream ssin;
string a;
string b;
ssin<<a; // 将a放入b中
cout<<ssin.str()<<endl;// 输出存放在ssin中的所有字符串
ssin>>b; // 将刚才的放入的a放到b中
```

- 实现类型的转换

```c++
int d;
string ds;
stringstream ssin;
ssin<<d;  // 将int输入ssin
ssin>>ds; // 将输入的int输出到ds中这中间会调用数据类型转换。

```

- 实现对于string字符串的空格切割

```c++
string str;
getline(cin,str);
stringstream ssin(str);
string word;
while(ssin>>word){
   operation)();
}
```



### 1590 火星数字

stringstream ssin（）

输入输出

## 排序

### 1484 最佳排名

数据结构：

一个结构体、重载<运算符。规则 有四列成绩，每个学生只有其最好的排名。

数据范围：

学生和查询次数在2000以内 每科成绩100以内的正数

思路：

每次查询的时候对每个学生排序 输出所有排序中成绩最好的。时间复杂度不超。

不清楚的点：

排名怎么算？如果有同分数的人怎么算排名？按照分数排名还是按照别的规则。同分数名次一致。

如何解决：

将所有分数排序，然后按照每个同学的分数 直接去查这个排名表，查到的最考前的数的下标就是其排名。



### 1499 数字图书馆

要求：

五个关键字段：书名、作者（唯一）、出版商、关键词（不超过五个空格分开。）、日期.

id是可能有前导0的。

思路：

五个map<string,vector<string\> >分别存放书名、出版商、关键词、日期 、作者与相关id的对应查询字典。最后输出查询的时候只要更具hash表找到对应的vector然后对其排名就可以了

### 1502 PAT 排名

思路：

对每个地区的学生信息输入完成后生成一个地区排名表，将输入完成的学生的地区排名信息输入。

所有的地区的学生信息输入完成后生成一个。

```C++
//
// Created by Nino Neumann on 2023/3/31.
//
#include<iostream>
#include<vector>
#include<map>
#include<algorithm>
using namespace std;

struct info{
    string id;
    int grade;
    int final_rank,location_number,local_rank;
    bool operator<(const info &a) const{
        if(final_rank==a.final_rank) return id<a.id;
        return final_rank<a.final_rank;
    }
};


vector<int> total_grade_list;
vector<info> total_students_list;


int get_rank(int grade,vector<int> gl){
    int l = 0,r = gl.size()-1;
    while(l<r){
        int mid = (l+r+1)>>1;
        if(gl[mid]<=grade) l = mid;
        else r = mid-1;
    }
    return gl.size()-l;
}

bool cmp(int &a,int &b){
    return a>b;
}
int main(){
    int n;
    cin>>n;
    for(int i = 1;i<=n;++i){
        int k;
        cin>>k;
        vector<pair<string,int>> local_info;
        vector<int> local_grade_list;
        while(k--){
            string id;
            int grade;
            cin>>id>>grade;
            local_grade_list.push_back(grade);
            local_info.push_back({id,grade});
            total_grade_list.push_back(grade);
        }

        sort(local_grade_list.begin(),local_grade_list.end(),cmp);
        // cout<<i<<" "<<"local_grade_list 0 "<<local_grade_list[0];

        for(auto p:local_info){
            string id = p.first;
            int g = p.second;
            int rank = get_rank(g,local_grade_list);
            total_students_list.push_back({id,g,-1,i,rank});
        }
    }

    sort(total_grade_list.begin(),total_grade_list.end(),cmp);
    
    for(int i = 0;i<total_students_list.size();++i){
        info *p = &total_students_list[i];
        int g = p->grade;
        p->final_rank = get_rank(g,total_grade_list);
    }
    sort(total_students_list.begin(),total_students_list.end());
    // cout<<total_students_list[0].grade<<endl;
    cout<<total_students_list.size()<<endl;
    for(auto stu:total_students_list){
        cout<<stu.id<<" "<<stu.final_rank+1<<" "<<stu.location_number<<" "<<stu.local_rank+1<<endl;
    }
    return 0;
}
```

毫不意外的超时了捏。

应该是get_rank导致三重循环所以超时了吧。



### 1505列表排序

很简单的一道排序题，但是很容易超时，就想着这样。

```C++
//
// Created by Nino Neumann on 2023/3/31.
//
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

struct student{
    string id,name;
    int score;
};

bool cmp1(student &a,student &b) {
    return a.id<b.id;
}
bool cmp2(student &a,student &b) {
    return a.name==b.name ? a.id<b.id : a.name>=b.name;
}
bool cmp3(student &a,student &b) {
    return a.score==b.score ? a.id<b.id : a.score>=b.score;
}

vector<student> students;

int main(){
    int n,c;
    cin>>n>>c;
    while(n--){
        string id,name;
        int grade;
        cin>>id>>name>>grade;
        students.push_back({id,name,grade});
    }

    if(c==1){
        sort(students.begin(),students.end(),cmp1);
    }else if (c==2){
        sort(students.begin(),students.end(),cmp2);
    }else{
        sort(students.begin(),students.end(), cmp3);
    }
    for(auto s:students){
        cout<<s.id<<" "<<s.name<<" "<<s.score<<endl;
    }



    return 0;
}
```

试着用堆排序实现

```C++
//
// Created by Nino Neumann on 2023/3/31.
//
#include<iostream>
#include<vector>
#include<algorithm>
#include<queue>
using namespace std;

struct student{
    string id,name;
    int score;
};

int c;

bool operator>(const student a,const student b) {
    if(c==1)
        return a.id>b.id;
    else if(c==2)
        return a.name==b.name ? a.id>b.id : a.name>=b.name;
    else
        return a.score==b.score ? a.id>b.id : a.score>=b.score;
}


int main(){
    int n;
    scanf("%d%d",&n,&c);
    priority_queue<student , vector<student> , greater<student> > heap;
    while(n--){
        string id,name;
        id.resize(6);
        name.resize(8);
        
        int grade;
        scanf("%s%s%d",&id[0],&name[0],&grade);
        // scanf("%s",&name[0]);
        // scanf("%d",&grade);
        // cout<<id<<endl;
        // students.push_back({id,name,grade});
        heap.push({id,name,grade});
    }

    while(!heap.empty()){
        auto s = heap.top();
        heap.pop();
        // cout<<s.id<<" "<<s.name<<" "<<s.score<<endl;
        printf("%s %s %d\n",s.id.c_str(),s.name.c_str(),s.score);
    }



    return 0;
}
```

依旧超时，因为在一个n循环中使用了堆排序所以时间复杂度是$$n^2log{n}$$ 所以会超时。

这里应该着重优化输入输出。

```C++
//
// Created by Nino Neumann on 2023/3/31.
//
#include<iostream>
#include<vector>
#include<algorithm>
#include<sstream>
using namespace std;
const int N = 1e5+1;
struct student{
    string id,name;
    int score;
};
student students[N];

bool cmp1(student &a,student &b) {
    return a.id<b.id;
}
bool cmp2(student &a,student &b) {
    return a.name==b.name ? a.id<b.id : a.name<=b.name;
}
bool cmp3(student &a,student &b) {
    return a.score==b.score ? a.id<b.id : a.score<=b.score;
}

// vector<student> students;

int main(){
    int n,c;
    scanf("%d%d",&n,&c);
    // while(n--){
    //     string id,name,line;
    //     int grade;
    //     cin>>id>>name>>grade;
    //     students.push_back({id,name,grade});
    // }
    for(int i = 0;i<n;++i){
        string name,id;
        int grade;
        name.resize(8);
        id.resize(6);
        scanf("%s%s%d",&id[0],&name[0],&grade);
        students[i].id = id;
        students[i].name = name;
        students[i].score = grade;
    }
        
    

    if(c==1){
        sort(students,students+n,cmp1);
    }else if (c==2){
        sort(students,students+n,cmp2);
    }else{
        sort(students,students+n, cmp3);
    }
    for(int i = 0;i<n;++i){
        auto s = students[i];
        printf("%s %s %d\n",s.id.c_str(),s.name.c_str(),s.score);
    }


    return 0;
}
```



### 1523 学生课程列表

思路：

使用哈希表 map查询 将每个学生的name为索引 跟上其选课的列表 vector<int> 

时间复杂度分析：

hash表的插入查询：都是$$O(1)$$ 的时间复杂度

输入时间复杂度：最多输入2500（课程最大数量）multi 200 （单个课程最多容纳人数）== 450000  输入

查询操作时间复杂度：查询400000个人 最多不会超过450000（假设存在学生选了所有的课，但是这样的学僧最多不超过200个人，如果这个情况成立，那么也就是450000次）

```c++
//
// Created by Nino Neumann on 2023/4/1.
//
#include<iostream>
#include<map>
#include<vector>
#include<algorithm>
using namespace std;

map<string,vector<int>> students;


int n,k;

int main(){
    scanf("%d%d",&n,&k);
    while(k--){
        int c_id,member_num;
        scanf("%d%d",&c_id,&member_num);
        while(member_num--){
            string s;
            s.resize(4);
            scanf("%s",&s[0]);
            students[s].push_back(c_id);
        }
    }
    //query
    while(n--){
        string s;
        s.resize(4);
        scanf("%s",&s[0]);
        printf("%s ",s.c_str());
        if(students.find(s)!=students.end()){
            sort(students[s].begin(),students[s].end());
            printf("%d ",students[s].size());
            
            for(auto c:students[s])
                printf("%d ",c);
        }else{
            printf("0");
        }
        printf("\n");
    }

    return 0;
}

```

应为在最后的查询里面会有一部排序的操作，所以挺怕他超时的，但是最后也没超时。

### 1538 链表排序

思路：

创建一个map 将所有的元素输入进去，按照链表遍历将在链表中的元素加入vector里面 然后排序，最后输出。

{% tabs 链表排序 %}
<!-- tab TLE 使用了map-->



 ```C++
//
// Created by Nino Neumann on 2023/4/1.
//
#define _CRT_SECURE_NO_WARNINGS 
//
// Created by Nino Neumann on 2023/4/1.
//
#include<iostream>
#include<vector>
#include<algorithm>
#include<string>
#include<map>
using namespace std;

struct node {
    string addr;
    int key;
    string addr_next;
    bool operator<(const node& a) const {
        return key < a.key;
    }
};

map<string, node> hash_table;
vector<node> nodes;

// 输入 删除 排序 输出

int main() {
    string ad;
    int n;
    cin >> n >> ad;
    while (n--) {
        string s;
        string o;
        int key;
        cin >> s >> key >> o;
        hash_table[s] = { s,key,o };
    }

    while (ad != "-1") {
        auto top_node = hash_table[ad];
        nodes.push_back(top_node);
        ad = top_node.addr_next;
    }
    sort(nodes.begin(),nodes.end());
    
    cout<<nodes.size()<<" ";
    if(nodes.size())
        cout<<nodes[0].addr<<endl;
    else{
        cout<<"-1\n";
        return 0;
    }
    for (int i = 0;i<nodes.size();++i) {
        auto n = nodes[i];
        
        if(i!=nodes.size()-1){
            auto next = nodes[i+1];
            printf("%s %d %s\n", n.addr.c_str(), n.key, next.addr.c_str());
        }
        else{
            printf("%s %d -1\n", n.addr.c_str(), n.key);
        }
    }
            



    return 0;
}
 ```

TLE了。感觉又是cin的事情。

<!-- endtab -->

<!-- tab 使用unordered_map不超时 -->

```C++
//
// Created by Nino Neumann on 2023/4/1.
//
#define _CRT_SECURE_NO_WARNINGS 
//
// Created by Nino Neumann on 2023/4/1.
//
#include<iostream>
#include<vector>
#include<algorithm>
#include<string>
#include<unordered_map>
using namespace std;

struct node {
    string addr;
    int key;
    string addr_next;
    bool operator<(const node& a) const {
        return key < a.key;
    }
};

unordered_map<string, node> hash_table;
vector<node> nodes;

// 输入 删除 排序 输出

int main() {
    char c1[10];
    char c2[10];
    char c3[10];
    
    int n,key;
    scanf("%d%s",&n,c1);
    string ad(c1);
    while (n--) {
        scanf("%s%d%s",c2,&key,c3);
        string s(c2),o(c3);
        // cin >> s >> key >> o;
        hash_table[s] = { s,key,o };
    }

    // while (ad != "-1") {
    //     auto top_node = hash_table[ad];
    //     nodes.push_back(top_node);
    //     ad = top_node.addr_next;
    // }
    for(string head = ad;head!="-1";head = hash_table[head].addr_next){
        nodes.push_back(hash_table[head]);
    }
    sort(nodes.begin(),nodes.end());

    printf("%d ",nodes.size());
    if(nodes.size())
        printf("%s\n",nodes[0].addr.c_str());
    else{
        printf("-1\n");
        return 0;
    }
    for (int i = 0;i<nodes.size();++i) {
        auto n = nodes[i];
        
        if(i!=nodes.size()-1){
            auto next = nodes[i+1];
            printf("%s %d %s\n", n.addr.c_str(), n.key, next.addr.c_str());
        }
        else{
            printf("%s %d -1\n", n.addr.c_str(), n.key);
        }
    }
            



    return 0;
}
```

<!-- endtab -->
{% endtabs %}

能用scanf就用scanf，能用unordered_map就不用map。

### 1561 PAT 评测

思路：

## 树

### 树的遍历（重点最好记一下）

- 给出的所有的点最多能到1百万个
- 复杂度为$$O(n)$$
- 给定的所有点的权值都是唯一的，如果不唯一那么树的形状可能不唯一。

给定后序和中序遍历 输出层序遍历

1、需要熟悉手动的中序+后续 构建树的过程、以及中序+前序构建树的过程。（在此基础上需要要知道如何快速找到中序遍历中的root下标）

2、要知道本题中树是如何存储的。二叉树的存储可以简化到使用两个unordered_map 存储

````C++
#include<iostream>
#include<queue>
#include<unordered_map>
using namespace std;

const int N = 40;

int postordered[N],inordered[N];

unordered_map<int, int> l,r,ipost;

int n;

int build(int pl,int pr,int il,int ir){
    int root  = postordered[pr];
    int k = ipost[root];
    if(il<k){
        l[root] = build(pl,pl+k-1-il,il,k-1);
    }
    if(ir>k){
        r[root] = build(pl+k-1-il+1,pr-1,k+1,ir);
    }
    return root;
}

void bfs(int root){
    queue<int> q;
    q.push(root);
    while(!q.empty()){
        auto t = q.front();
        q.pop();
        cout<<t<<" ";
        if(l.count(t)) q.push(l[t]);
        if(r.count(t)) q.push(r[t]);
    }
}

int main(){
    cin>>n;
    for(int i = 0;i<n;i++){
        cin>>postordered[i];
    }
    
    for(int i = 0;i<n;i++){
        cin>>inordered[i];
        ipost[inordered[i]] = i;
    }
    
    int root = build(0,n-1,0,n-1);
    bfs(root);
    
    
    
    return 0;
}
````



### 1498 最深的根

思路：使用并查集求解给定的树是否符合要求，以及不符合要求的话有多少个连通块。（这一步主要是对merge的过程进行修改。）

```C++
//
// Created by Nino Neumann on 2023/4/19.
//
// 判断给出的树是不是一个连通的，如果不是求出连通分量-- 并查集
// 求最深的根：对每个点进行遍历 dfs  存储图用的邻接表需要使用简易的邻接表否则会超时。
#include "iostream"
#include "vector"
#include<cstring>
using namespace std;

const int N=1e4+10,M=N*2;  //
int h[N],e[M],ne[M],idx; //邻接表存稀疏树图

int n,k; // 一共有多少个节点

// 定义并查集以及相关操作
int p[N];

int find(int a){
    if(p[a]!=a) p[a] = find(p[a]);
    return p[a];
}

void add(int a,int b)
{
    e[idx]=b;
    ne[idx]=h[a];
    h[a]=idx++;
}

void merge(int a,int b){
    int fa = find(a),fb = find(b);
    p[fa] = fb;
}
// 定义存储树的结构

// struct head{
//     vector<int> e;
// };
// head heads[N];

// dfs
int dfs(int u,int father){
    // 计算当前根的最大深度
    int depth = 0;
    // if(heads[root].e.empty()){   // 搜索到叶子节点了；
    //     return depth;
    // }
    for(int i=h[u];~i;i=ne[i])
    {
        int j=e[i];
        if(j==father) continue; //重复搜了
        depth=max(depth,dfs(j,u)+1);
    }

    // for(auto x:heads[root].e){
    //     if(x==father)continue;
    //     depth = max(depth,dfs(x,root)+1);
    // }
    return depth;
}




int main(){

    scanf("%d",&n);
    k=n;
    for(int i = 0;i<=n;++i) p[i] = i;
    memset(h,-1,sizeof h); //初始化邻接表
    for(int i = 0;i<n-1;++i){
        int x,y;
        scanf("%d%d",&x,&y);
        int fx = find(x),fy = find(y);
        if(fx!=fy){
            p[fx] = fy;
            k--;
        }
        add(x,y);add(y,x); //无向边加两次
        // heads[x].e.push_back(y);
        // heads[y].e.push_back(x);
    }
    if(k>1) printf("Error: %d components\n",k);
    else
    {
        vector<int>nodes;
        int max_depth=-1; //设置相反界外量
        for(int i=1;i<=n;i++)
        {
            int depth=dfs(i,-1);  //这个节点无来源点 得到这个点的深度
            if(depth>max_depth)
            {
                max_depth=depth; //更新
                nodes.clear(); //清空
                nodes.push_back(i);
            }
            else if(depth==max_depth) nodes.push_back(i);
        }
        for(auto v:nodes) cout<<v<<endl;

    }


    return 0;
}
```



### 判断二叉搜索树

问题一：如何根据二叉搜索树的先序遍历恢复树结构？

二叉搜索树的中序遍历其实是已知的。这个问题其实就是根据二叉搜索树的中序和前序遍历得到二叉树。

问题二：将问题转换为 上述的树的遍历后，中序遍历中节点值不唯一如何解决？

由于中序遍历是一个有序数列，所以可以使用二分的方法去查找到当前前序遍历中的根节点在中序遍历中的位置

问题三：如何判断不合法的情况？

如果当前在中序区间中找根节点的过程中没有找到那么就返回false；

```c++
//
// Created by Nino Neumann on 2023/4/19.
//
#include<iostream>
#include<cstring>
#include<algorithm>
using namespace std;



const int N = 1e3+10;
int preorder[N],postorder[N],inorder[N];
int cnt;
int n;


bool build(int il,int ir,int pl,int pr,int type){
    bool res = true;
    int root = preorder[pl];
    int k = -1;
    if(il>ir) return res; //  正常结束了
    if(type==0){
        // 二分查找左边界 升序数组中
        // for (k = il; k <= ir; k ++ )
        //     if (inorder[k] == root)
        //         break;
        // if (k > ir) return false;
        int l = il,r = ir;
        while(l<r){
            int mid = (r+l)>>1;
            if(inorder[mid]>=root)r = mid;
            else l = mid+1;
        }
        if(inorder[l]==root) k = l;
        else return false;
    }else{
        // 二分查找右边界 降序数组中
        // for (k = ir; k >= il; k -- )
        //     if (inorder[k] == root)
        //         break;
        // if (k < il) return false;
        int l = il,r = ir;
        while(l<r){
            int mid = (r+l+1)>>1;
            if(inorder[mid]>=root) l = mid;
            else r = mid-1;
        }
        if(inorder[l]==root) k = l;
        else return false;
    }

    if(!build(il,k-1,pl+1,pl+1+(k-1-il),type)) res = false;
    if(!build(k+1,ir,pl+1+(k-1-il)+1,pr,type)) res = false;
    postorder[cnt++] = root;
    return res;



}

int main(){
    scanf("%d",&n);
    for(int i = 0;i<n;++i){
        scanf("%d",&preorder[i]);
        inorder[i] = preorder[i];
    }
    sort(inorder,inorder+n);
    if(build(0,n-1,0,n-1,0)){
        // 这个树不是镜像并且存在  输出YES 和postorder序列
        printf("YES\n%d",postorder[0]);
        for(int i = 1;i<n;++i) printf(" %d",postorder[i]);
    } else{
        reverse(inorder,inorder+n);
        cnt = 0; // 一定要注意cnt的重置
        if(build(0,n-1,0,n-1,1)){
            printf("YES\n%d",postorder[0]);
            for(int i = 1;i<n;++i) printf(" %d",postorder[i]);
        }else{
            printf("NO\n");
        }
    }


    return 0;
}

```



### 1550 完全二叉搜索树

对于我来说的难点：

给定了每个节点的权值如何取构建一个完全二叉搜索树；

如何使用数组存储树结构。

-  从下标为0开始存储：
- 从下标为一开始存储。

{% tabs 1550 完全二叉搜索树 %}
<!-- tab 思路-->

通过完全二叉树的性质，可以定义二叉树的dfs边界，通过中序遍历将二叉树构建出来，并存储到一个数组中，再通过层序遍历将其输出。

- 首先将节点按照从小到大的顺序排序，
- 通过中序遍历建树
- 直接输出存储树的数组就是中序遍历。

<!-- endtab -->

<!-- tab -->

```C++
#include<iostream>
#include<algorithm>
using namespace std;
const int N = 1010;

int w[N];
int tree[N];
int n,cnt;

void pre_order(int u){
    int r_tree = u<<1;
    int l_tree = (u<<1)+1;
    if(r_tree<=n)
        pre_order(r_tree);
    tree[u] = w[cnt++];
    if(l_tree<=n)
        pre_order(l_tree);
}


int main(){
    
    cin>>n;
    for(int i = 0;i<n;++i)cin>>w[i];
    sort(w,w+n);
    pre_order(1);
    cout<<tree[1];
    for(int i = 2;i<=n;++i) cout<<" "<<tree[i];
    
    
    return 0;
}
```

<!-- endtab -->
{% endtabs %}

### 1576 再次树遍历

这一题和  [3384. 二叉树遍历 - AcWing题 ](https://www.acwing.com/problem/content/description/3387/) 很像

{% tabs 思路&&题解 %}
<!-- tab 思路-->
给出的堆栈操作是二叉树的先序遍历，可以使用先序遍历的dfs方法建树。

- 可能涉及到字符串的查找判断。（可以简化，也可以省略）

思路：

- 首先根据先序遍历遍历二叉树，如果遇到pop就是回溯，
- 然后再先序遍历过程中（由于是一个递归过程所以其中所有的节点都是存储下来的）通过后序的顺序输出每个节点的内容。

一个重要的解题方法就是可以边先序输入边后序输出。

<!-- endtab -->

<!-- tab 题解-->

```C++
#include<iostream>
#include<cstring>
using namespace std;

const int N = 40;
int n;

void preorder(int root){
    int w;
    string str;
    cin>>str;
    if(str[1]=='u'){
        // push 操作
        cin>>w;
        preorder(root*2);
        preorder(root*2+1);
        cout<<w;
        if(root!=1)cout<<" ";  //结尾不能有多余的空格。
    }
}


int main(){
    cin>>n;
    preorder(1);
    return 0;
}
```

<!-- endtab -->
{% endtabs %}

### 1589 构建二叉搜索树

{% tabs 思路&&题解 %}
<!-- tab 思路-->

搜索树天生就知道其中序遍历。那么这题就是给出了树的结构和中序遍历，输出层序遍历。

接下来就是解决具体问题了：

- 定义存储树的结构
- 定义inorder遍历的dfs函数
- 定义层序遍历的bfs函数。

<!-- endtab -->

<!-- tab 题解-->

```C++
#include<iostream>
#include<queue>
#include<algorithm>
using namespace std;

const int N = 110;

struct node{
    int w;
    int l,r;
};
int n;
node tree[N];
int v[N];
int cnt;

void inorder(int root){
    if(root==-1)return;
    int l = tree[root].l;
    int r = tree[root].r;
    inorder(l);
    tree[root].w = v[cnt++];
    inorder(r);
}

void bfs(int root){
    queue<int> q;
    q.push(root);
    while(!q.empty()){
        auto front = q.front();
        int l_tree = tree[front].l, r_tree = tree[front].r;
        q.pop();
        cout<<tree[front].w<<" ";
        if(l_tree>=0) q.push(l_tree);
        if(r_tree>=0) q.push(r_tree);
    }
}


int main(){
    
    cin>>n;
    for(int i = 0;i<n;++i)
        cin>>tree[i].l>>tree[i].r;
        
    for(int i = 0;i<n;++i)cin>>v[i];
    sort(v,v+n);
    inorder(0);
    bfs(0);
    
    return 0;
}
```



<!-- endtab -->
{% endtabs %}







# PAT甲级网站刷题记录

## A1046 前缀和。

## A1065 A+B and C (64bit)

在使用longlong 类型的运算与另一个long long数据类型判断大小的时候（如下的情况）

不能直接使用 (运算) 判断符号 LL这样的格式来判断

{% tabs longlong数据类型判断大小 %}
<!-- tab 错误做法 -->

```c++
LL a,b,c,res;
a+b>c;  //这样做是错误的。
```

<!-- endtab -->

<!-- tab 正确做法 -->

```c++
LL a,b,c,res;
res = a+b;
res>c;  //这样做是对的。
```

因为不能确定两个longlong数据类型在做加法的时候是否发生了溢出，如果发生溢出机器会自动截断，因而加法运算会在不知道哪一步停止。

<!-- endtab -->
{% endtabs %}

# DFS

dfs的搜索顺序是一个树形的。

DFS的经典运用：

- 组合数问题

## 输出组合数 acwing 

```C++
#include<iostream>
using namespace std;


const int N = 10;

int num[N];
int res[N];
bool is_select[N];
int n;

void print_result(){
    for(int i = 1;i<=n;++i){
        cout<<res[i]<<" ";
    }
    cout<<endl;
}



void dfs(int step){
    // step 表示当前到哪一个位置了。
    if(step == n+1) {
        //表示已经到达最后一步了 可以输出了
        print_result();
        return;
    }
    // 在所有没有被添加进去的数字中选择一个填入
    for(int i = 1;i<=n;++i){
        if(!is_select[i]){
            is_select[i] = true;
            res[step] = i;
            dfs(step+1);
            is_select[i] = false;
        }
    }
}


int main(){
    cin>>n;
    
    dfs(1);
    return 0;
}
```

## PAT甲级中的DFS题目

- A1004



# 一些c++ 的性质的记录（我记不住所以记一下）

## c++在函数声明后面有const

```c++
bool operator<(const T &a) const {...}
```

**已定义成const的成员函数，一旦企图修改数据成员的值，则编译器按错误处理**

该函数内部不能修改成员变量的值。

## 遇到需要使用效率更高的输入scanf 输入\printf 输出一行内含有string和in的混合类型。

一种可行的方法是resize string的大小，这种方法使用的前提是你得知道这个待输入的string有多大。然后如下使用

```c++
int main(){
	string a;
	string b;
	int c;
	a.resize(10);
	b.resize(10);
	scanf("%s%s%d",&a[0],&b[0],&c);
	printf("a: %s b: %s c: %d\n",a.c_str(),b.c_str(),c);

}
```

输出的时候要转换为c_str()。

## 字符串的比较失效问题



{% tabs 字符串比较失效 %}
<!-- tab 最原始的场景-->

```c++
//
// Created by Nino Neumann on 2023/4/1.
//
#define _CRT_SECURE_NO_WARNINGS 
//
// Created by Nino Neumann on 2023/4/1.
//
#include<iostream>
#include<vector>
#include<algorithm>
#include<string>
#include<map>
using namespace std;

struct node {
    string addr;
    int key;
    string addr_next;
    bool operator<(const node& a) const {
        return key < a.key;
    }
};

map<string, node> hash_table;
vector<node> nodes;

// 输入 删除 排序 输出

int main() {
    string ad;
    ad.resize(7);
    int n;
    scanf("%d%s", &n, &ad[0]);
    // cout<<n<<endl;
    while (n--) {
        string s;
        string o;
        s.resize(7);
        o.resize(7);
        int key;
        scanf("%s%d%s", &s[0], &key, &o[0]);
        hash_table[s] = { s,key,o };
        //        nodes.push_back({s,key,o});
                // if(o=="-1")cout<<"yes\n"<<endl;
        if (o == "-1")cout << "yes\n";
    }
    //    if(nodes)
    // string current_addr = ad;
    // cout<<(hash_table["11111"].addr_next=="22222")<<endl;
    // 下面的while循环部分失效 导致死循环 string之间的比较失效。
    while (ad != "-1") {
        auto top_node = hash_table[ad];
        nodes.push_back(top_node);
        ad = top_node.addr_next;
        // cout<<"-1"<<endl;
    }
    //     sort(nodes.begin(),nodes.end());
    // //    cout<<nodes.size()<<endl;
    //     printf("%d %s",nodes.size(),nodes[0].addr.c_str());
    for (auto n : nodes) {
        printf("%s %d %s", n.addr.c_str(), n.key, n.addr_next.c_str());
    }



    return 0;
}
```

<!-- endtab -->

<!-- tab 一开始我以为-->问题出现的场景

最原始的场景：

```c++
string ad;
string addr_next;
ad.resize(5);
addr_next.resize(5);
string current_addr = ad;
 // 输入的所有字符串的大小都是5，并且里面的有效长度也都是5
while(current_addr!="-1"){
    auto top_node = hash_table[current_addr];
    nodes.push_back(top_node);
    current_addr = top_node.addr_next;
}
// 出现死循环，current_addr 不能判断出是否等于“-1”
```

出现原因：string读入的字符串必须要以\0结尾，所以在定义string的resize大小的时候一定至少要多定义出一个额外的空间存放'\0'。

==不是这个原因==。 

<!-- endtab -->

<!-- tab 其实是-->
sanf 读入字符串的原因，导致比较失效了。不建议使用scanf读入string 类型的数据。
<!-- endtab -->
{% endtabs %}

# 关于二分找边界：



暂时没弄明白，先记着。

{% tabs 二分找边界问题 %}

<!-- tab 基本的二分模板 -->

```c++
int bs(int q[],int t){
	int l = 0,r = n-1;
	while(l<r){
		int mid = (l+r)>>1;
		if(q[mid]<t) l = mid;
		else r = mid+1;
	}
    if(q[l]!=t) return -1;
	return q[l];
}
```

<!-- endtab -->

<!-- tab 找有序数组中的某一个数的左边界 -->

```c++
int bs_left(int nums[],int t){
    int r = n-1,l = 0;
    while(l<r){
        int mid = (l+r)>>1;
        if(nums[mid]>=t) r = mid;
        else l = mid+1;
    }
    
    // cout<<"targ: "<<t<<" left:"<<l<<" "<<r<<endl;
    if(nums[l]==t) return l;
    return -1;
}
```



<!-- endtab -->

<!-- tab 找有序数组中的某一个数的右边界-->

```c++
int bs_right(int nums[],int t){
    int r = n-1,l = 0;
    while(l<r){
        int mid = (l+r+1)>>1;
        if(nums[mid]<=t) l = mid;
        else r = mid-1;
    }
    // cout<<"targ: "<<t<<" right:"<<l<<" "<<r<<endl;
    if(nums[l]==t) return l;
    return -1;
}
```

<!-- endtab -->
{% endtabs %}



