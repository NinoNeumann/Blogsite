---
title: acwing算法每日一题记录
copyright_author: NinoNeumann
copyright_author_href: 'https://ninoneumann.cn/'
date: 2023-04-09 20:17:33
updated: 2023-04-09 20:17:33
mathjax: true
tags:
- algorithm
- PAT certificate
categories: "Algorithm"
keywords: acwing
description: 考PAT甲级的每日一题
cover: https://resource.ninoneumann.cn/Cover_img/90611592_p0.jpg
---



{% timeline 2023,blue %}
<!-- timeline 04-09 -->

根据先序序列输出中序序列。

<!-- endtimeline -->

<!-- timeline 04-10 -->

冶炼金属，一道数学题。

<!-- endtimeline -->

<!-- timeline 04-14 -->

最长上升子序列的变形。

<!-- endtimeline -->

<!-- timeline 04-15 -->

子矩阵、接龙数列、skew数

<!-- endtimeline -->

<!-- timeline 04-18 -->

整数奇偶排序

<!-- endtimeline -->

<!-- timeline 04-19 -->

最长公共子串。

<!-- endtimeline -->



<!-- timeline 04-20 -->

很简单的一道题目，三重循环

- 三元组。

- 分组统计

<!-- endtimeline -->

<!-- timeline 04-22 -->

- 高精度进制转换

<!-- endtimeline -->

{% endtimeline %}

[toc]





# 每日一题

## 3384 二叉树遍历

```c++
#include<iostream>
using namespace std;

void dfs(){
    char x;
    scanf("%c",&x);
    if(x>='a' && x<='z'){
        dfs();
        printf("%c ",x);
        dfs();
    }
}
int main(){
    dfs();
    return 0;
}
```

## 4956冶炼金属

{% tabs 题解 %}
<!-- tab 最简单的答案--数学推导 -->
$$
(暴力枚举) O\left(n^2\right)
设答案为 x, 则有 b \leqslant \frac{a}{x}<b+1
即 \frac{a}{b+1}<x \leqslant \frac{a}{b}
最小值 \frac{a}{b+1}+1, 最大值 \frac{a}{b}
多组数据取一个交集
$$
最后答案也很好看

```C++
#include<iostream>
using namespace std;
int res_max,res_min;

int main(){
    int n;
    scanf("%d",&n);
    res_min = 0;
    res_max = 1e9+100;
    for(int i = 0;i<n;++i){
        int a,b;
        scanf("%d%d",&a,&b);
        res_max = min(a/b,res_max);
        res_min = max(a/(b+1)+1,res_min);
        
    }
    printf("%d %d",res_min,res_max);
    
    
    return 0;
}
```



<!-- endtab -->

<!-- tab 我自己想的，二分查找，只能过前八个样例-->

基本思路是，给定的两个数能找到其范围内的最大值和最小值。不详细说明了，反正是一个很傻瓜的算法，后面不知道什么原因过不了最后两个样例。

```c++
#include<iostream>
using namespace std;


bool judge_ceil(int a,int b,int c){
    return b>(double)a/c;
}

bool judge_floor(int a,int b,int c){
    return b>=(double)a/c-1;
}

void get_range(int a,int b,int &mn,int &mx){
    mn = mx = 0;
    
    
    int l = 0,r = a;
    while(l<r){
        int mid = (l+r)>>1;
        if(judge_floor(a,b,mid)) r = mid;
        else l = mid+1;
    }
    if(judge_floor(a,b,l)) mn = l;
    else mn = l+1;
    
    
    l = 0,r = a;
    while(l<r){
        int mid = (l+r)>>1;
        if(judge_ceil(a,b,mid)) r = mid;
        else l = mid+1;
    }
    if(judge_ceil(a,b,l)) mx = l-1;
    else mx = l;
    // mx = l;
}

int res_max,res_min;

int main(){
    int n;
    scanf("%d",&n);
    res_min = 0;
    res_max = 1e9+100;
    for(int i = 0;i<n;++i){
        int a,b,tmp_max,tmp_min;
        scanf("%d%d",&a,&b);
        
        get_range(a,b,tmp_min,tmp_max);
        // cout<<a<<" "<<b<<endl;
        // cout<<"tmp_max&min: "<<tmp_max<<" "<<tmp_min<<endl;
        res_max = min(tmp_max,res_max);
        res_min = max(tmp_min,res_min);
        
    }
    cout<<res_min<<" "<<res_max<<endl;
    
    
    return 0;
}
```



<!-- endtab -->
{% endtabs %}



## 4958 接龙数列

先复习一下模板（我又忘得差不多了）

{% tabs 最长上升子序列问题 %}
<!-- tab acwing-895.最长上升子序列 -->

```C++
#include<iostream>
using namespace std;

const int N = 1010;
int f[N];  // fi 表示以i结尾的 上升子序列的集合  属性 子序列的长度最大值  
            // 状态计算：fi = sigma（fk+1）
int g[N];
int n;



int main(){
    cin>>n;
    
    int mx = 0;
    for(int i = 1;i<=n;++i)cin>>g[i];
    for(int i = 1;i<=n;++i){
        f[i] = 1;
        for(int j = 0;j<=i-1;++j)
            if(g[i]>f[j]) f[i] = max(f[i],f[j]+1);
        mx = max(mx,f[i]);
    }
    cout<<mx<<endl;

    return 0;
}
```

关键在于理解这一部分

```c++
for(int i = 1;i<=n;++i){
 	f[i] = 1;
 	for(int j = 0;j<=i-1;++j)
     	if(g[i]>g[j]) f[i] = max(f[i],f[j]+1);
 	mx = max(mx,f[i]);
}
// 这里内层循环的顺序对这道题的结果无影响
for(int i = 1;i<=n;++i){
    f[i] = 1;
    for(int j = i-1;j>0;--j)
        if(g[i]>g[j]) f[i] = max(f[i],f[j]+1);
    mx = max(mx,f[i]);
        // cout<<"f_"<<i<<": "<<f[i]<<endl;
}
```

按从1--n的次序更新f（n）的值 $$ f(n): 以第n个数为结尾的最长上升子序列的长度 $$ 



<!-- endtab -->

<!-- tab 第一次尝试：递推-->

```c++
#include<iostream>
using namespace std;

// 动态规划
// d(j) 前j个数组中组成 合法串的集合  值：最长  最长上升子序列！！！
// 运算 f [n] f[n-1]

const int N = 1e5+10;

int d[N];
int f[N];

int num[N];
int n;

bool check(int a,int b){
    int tail = a%10;  // a的最后一个数
    int head = 0;
    while(b){
        head = b%10;
        b/=10;
    }
    return tail==head;
}

int main(){
    scanf("%d",&n);
    for(int i = 1;i<=n;++i)scanf("%d",&num[i]);
    int last = num[1];
    f[1] = 1;
    for(int i = 2;i<=n;++i){
        if(check(last,num[i])){//最长接龙尾部的数和当前数满足接龙条件 则f(i+1) = f(i)+1) 还要更新当前最长接龙尾部的值  否则 f(i+1) = f(i)
            last = num[i];
            f[i] = f[i-1]+1;
        }else{
            f[i] = f[i-1];
        }
    }
    
    cout<<n-f[n]<<endl;
    
    
    
    
    
    return 0;
}
```

具体思路：

由第一个往后推，如果后一个是当前最长接龙的下一个位置，则更新当前最长接龙尾部的数为当前数并且将fi = length++ 否则 fi = length。

问题：贪心思想没法找到全局最优解。当前这个可以是最长接龙的尾巴但是不是最好的。

<!-- endtab -->

<!-- tab 第二次尝试：最长上升子序列的变体（时间复杂度太高）-->

```c++
#include<iostream>
using namespace std;

// 动态规划
// d(j) 前j个数组中组成 合法串的集合  值：最长  最长上升子序列！！！
// 运算 f [n] f[n-1]

const int N = 1e5+10;

int d[N];
int f[N];

int num[N];
int n;

bool check(int a,int b){
    int tail = a%10;  // a的最后一个数
    int head = 0;
    while(b){
        head = b%10;
        b/=10;
    }
    return tail==head;
}

int main(){
    scanf("%d",&n);
    for(int i = 1;i<=n;++i)scanf("%d",&num[i]);
    f[1] = 1;
    int mx = 0;
    for(int i = 1;i<=n;++i){
        f[i] = 1;
        for(int j = i-1;j>0;--j){
            if(check(num[j],num[i])) f[i] = max(f[i],f[j]+1);
        }
        mx = max(f[i],mx);
    }
    
    cout<<n-mx<<endl
    return 0;
}
```

TLE 时间复杂度为$$O(n^2)$$ 超时了。

<!-- endtab -->

<!-- tab 第三次尝试（Y总的思路）：-->

对于前面的最长上升子序列的优化，主要优化部分是两重循环。

分析：第二层循环是在前i-1个数据中找到以第i个数头结尾的最长的子序列长度，所以只要记录这个值就ok，因为：==以i个数头结尾的最长的子序列长度是可以穷举，有限的（只有十个）==，而最长子序列无法使用这种方法是因为他需要遍历前面所有的数据找到最值，而这个最值是无法有限次记录的。

```C++
#include<iostream>
#include<cstring>
using namespace std;
// 动态规划
// d(j) 前j个数组中组成 合法串的集合  值：最长  最长上升子序列！！！
// 运算 f [n] f[n-1]
const int N = 1e5+10;
int h[N],l[N],G[11];
int f[N];
int n;

int main(){
    scanf("%d",&n);
    int mx = 0;
    for(int i = 1;i<=n;++i){
        char s[11];
        scanf("%s",s);
        h[i] = s[0]-'0';
        l[i] = s[strlen(s)-1]-'0';
        f[i] = 1;
        f[i] = max(f[i],G[h[i]]+1);
        G[l[i]] = max(f[i],G[l[i]]);
        mx = max(f[i],mx);
    }
    cout<<n-mx<<endl;
    return 0;
}
```

<!-- endtab -->

{% endtabs %}



## 4964 子矩阵

数位DP、单调队列。

{% tabs 子矩阵 %}

<!-- tab 暴力方法 -->

```c++
#include<iostream>
#include<cstring>
using namespace std;

const int N = 1010;
const int mod = 998244353;
const int INF = 1e9+10;

int g[N][N];

int m,n,a,b;

int main(){
    // 暴力
    scanf("%d%d%d%d",&n,&m,&a,&b);
    for(int i = 1;i<=n;++i)
        for(int j = 1;j<=m;++j)scanf("%d",&g[i][j]);
    
    int sum = 0;
    for(int i = 1;i<=n-a+1;++i){
        for(int j = 1;j<=m-b+1;++j){
            int mx = 0;
            int mi = INF;
            for(int q = i;q<i+a;++q){
                for(int p = j;p<j+b;p++){
                    mx = max(mx,g[q][p]);
                    mi = min(mi,g[q][p]);
                }
            }
            sum=(sum+(mx*mi))%mod;
        }
    }
    printf("%d",sum);
    
    return 0;
}
```

时间复杂度可能要到$$500^4 = 62,500,000,000 \approx 10^8 $$ 

<!-- endtab -->

<!-- tab 暴力解法的优化 -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

## 3431 skew数

很简单的一道字符串模拟题目

```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
    string str;
    while(getline(cin,str)){
        int res = 0;
        for(int i = str.length()-1,k = 2;i>=0;--i,k<<=1)
            res += (str[i]-'0')*(k-1);
        cout<<res<<endl;
    }
}
```

## 3446 整数奇偶排序

一道很简单的排序题

```C++
#include<algorithm>
#include<vector>
#include<iostream>
using namespace std;


vector<int> odd,even;

bool cmp(int &a,int &b){
    return a>b;
}

int main(){
    
    int t;
    while(cin>>t){
        // cout<<t<<" ";
        if(t%2) odd.push_back(t);
        else even.push_back(t);
        
    }
    sort(odd.begin(),odd.end(),cmp);
    sort(even.begin(),even.end());
    for(auto x:odd){
        cout<<x<<" ";
    }
    for(auto x:even){
        cout<<x<<" ";
    }
    
    return 0;
}
```



## 3508 最长公共子串

:exclamation: 求的是公共子串！！！

```c++
//
// Created by Nino Neumann on 2023/3/8.
//
#include<iostream>
#include<cstring>
using namespace std;
const int N = 1e4+10;

int f[N]; // 定义 fij a的以第i个char结尾的 和 b的以第j个char结尾的 构成的公共子串  数值：长度的最大值
char a[N],b[N];

int main(){
    scanf("%s%s",a+1,b+1);
    int a_length = strlen(a+1);
    int b_length = strlen(b+1);
    int mx = 0;
   
    
    for(int i = 1;i<=a_length;++i){
        for(int j = b_length;j>=1;--j){
            if(a[i]==b[j] && a[i]>='a') f[j] = f[j-1]+1;
            else f[j] = 0;  // 这里不太理解
            mx = max(mx,f[j]);
        }
    }
    cout<<mx<<endl;

    return 0;
}

```

## 3543 三元组

时间复杂度分析：找一个长度为m中的满足条件的三元组。时间复杂度为$$O(m^3)$$ m最大为50，n最大为10；所以$$T(n) = 50^3 10= 1.25 \times10^6 $$ 暴力做法完全可行啊！ 可以做的优化就是将第三重循环做一个二分。这样就可以少一层，但是要先排序。

```c++
#include<iostream>
using namespace std;

// 三重循环遍历

const int N = 51;

int num[N];

int main(){
    int n;
    cin>>n;
    while(n--){
        int m;
        int cnt = 0;
        cin>>m;
        for(int i = 0;i<m;++i){
            cin>>num[i];
        }
        
        for(int i = 0;i<m;++i){
            for(int j = 0;j<m;++j){
                for(int k = 0;k<m;++k){
                    if(num[i]+num[j] == num[k]) cnt++;
                }
            }
        }
        
        cout<<cnt<<endl;
        
    }
    
    return 0;
}
```

## 3576 分组统计

```C++
#include<iostream>
#include<unordered_map>
#include<vector>
#include<algorithm>
using namespace std;
// 小组数连续且不为空  需要保存一个数值的集合

const int N = 110;

// vector<int> set[N];




int main(){
    int t,n;
    cin>>t;
    while(t--){
        unordered_map<int,int> set[N];
        int number[N];
        int gs[N];
        cin>>n;
        int mx_group = 0;
        for(int i = 0;i<n;++i)cin>>number[i];
        for(int i = 0;i<n;++i) cin>>gs[i];
        for(int i = 0;i<n;++i){
            set[gs[i]][number[i]]++;
            mx_group = max(mx_group,gs[i]);
        }
        sort(number,number+n);
        int k = unique(number,number+n)-number;
        // 输出
        
        for(int g = 1;g<=mx_group;++g){
            cout<<g<<"={";
            for(int i = 0;i<k;++i){
                cout<<number[i]<<"="<<set[g][number[i]];
                if(i+1<k)cout<<",";
                else cout<<"}\n";
            }
        }
        
    }
    
    return 0;
}

```

简单模拟。

## 3395 10进制 VS 2进制

这是一道典型的高精度运算的题目

{% tabs 高精度相关的板子 %}
<!-- tab 高精度加法 -->

```C++
#include<iostream>
#include<vector>
using namespace std;

vector<int> add(vector<int> &A,vector<int> &B){
    
    if(A.size()<B.size()) return add(B,A);
    
    vector<int> C;
    int t = 0;
    for(int i = 0;i<A.size();++i){
        
        t+=A[i];
        if(i<B.size()) t+=B[i];
        C.push_back(t%10);
        t/=10;
    }
    
    if(t) C.push_back(t);
    return C;
}


int main(){
    string a,b;
    vector<int> A,B,C;
    cin>>a>>b;
    // cout<<a<<endl;
    for(int i = a.length()-1;i>=0;--i) A.push_back(a[i]-'0');
    for(int i = b.length()-1;i>=0;--i) B.push_back(b[i]-'0');
    C = add(A,B);
    for(int i = C.size()-1;i>=0;--i)cout<<C[i];
    return 0;
}
```

没啥好说的，注意输入和输出的数组顺序。add函数在处理加法的时候是从低位处理到高位，所以在输入的时候需要将低位放在前面，这和我们日常的书写顺序是相反的。

<!-- endtab -->



<!-- tab 高精度减法-->

和加法差不多（差得不太多）

- 判断两个数的大小，用大的减去小的。
- 由于减法并不像加法有交换律所以定义减法的函数中减数和被减数的位置是固定的。
- 对于前导0 的处理。

```c++
#include<iostream>
#include<vector>
using namespace std;


bool cmp(vector<int> &a,vector<int> &b){
    if(a.size()!=b.size()) return a.size()>b.size();
    
    for(int i = a.size()-1;i>=0;--i)
        if(a[i]!=b[i]) return a[i]>b[i];
    
    return true;
    // 比较两个数的大小，返回a>=b；
}


vector<int> sub(vector<int> &a,vector<int> &b){
    vector<int> c;
    int t = 0;
    for(int i = 0;i<a.size();++i){
        t = a[i]-t;
        if(i<b.size()) t-=b[i];
        c.push_back((t+10)%10);  // 因为t可能是个负数，所以取其10 的mod 是借位后的数位。
        if(t<0) t = 1;
        else t = 0;
    }
    
    while(c.size()>1 && c.back()==0) c.pop_back();
    
    return c;
}



int main(){
    string a_s,b_s;
    vector<int> a,b,c;
    cin>>a_s>>b_s;
    for(int i = a_s.length()-1;i>=0;--i) a.push_back(a_s[i]-'0');
    for(int i = b_s.length()-1;i>=0;--i) b.push_back(b_s[i]-'0');
    
    if(cmp(a,b)){
        c = sub(a,b);
    }else{
        c = sub(b,a);
        cout<<"-";
    }
    
    for(int i = c.size()-1;i>=0;--i) cout<<c[i];
    
    
    
    
    return 0;
}
```



<!-- endtab -->



<!-- tab 高精度乘法-->

需要注意的是：

- 对于结果的前导0的处理
- 结果一定会大于原式，如何处理多出原本被乘数size的数位。



```C++
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;


vector<int> multi(vector<int> &a,int b){
    vector<int> c;
    int t = 0;
    for(int i = 0;i<a.size()||t>0;++i){
        if(i<a.size()) t += b*a[i];
        c.push_back(t%10);
        t/=10;
    }
    
    while(c.size()>1 && c.back()==0) c.pop_back();
    
    return c;
}

int main(){
    
    string a;
    int b;
    vector<int> A;
    cin>>a>>b;
    if(b==0){
        cout<<"0";
        return 0;
    }
    for(int i = a.length()-1;i>-1;--i){
        A.push_back(a[i]-'0');
    }
    
    vector<int> C = multi(A,b);
    
    for(int i = C.size()-1;i>-1;--i)cout<<C[i];
    
    
    return 0;
}
```



<!-- endtab -->



<!-- tab 高精度除法-->

```C++
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> div(vector<int> &A, int b, int &r)
{
    vector<int> C;
    r = 0;
    for (int i = A.size() - 1; i >= 0; i -- )
    {
        r = r * 10 + A[i];
        C.push_back(r / b);
        r %= b;
    }
    reverse(C.begin(), C.end());
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}

int main()
{
    string a;
    vector<int> A;

    int B;
    cin >> a >> B;
    for (int i = a.size() - 1; i >= 0; i -- ) A.push_back(a[i] - '0');

    int r;
    auto C = div(A, B, r);

    for (int i = C.size() - 1; i >= 0; i -- ) cout << C[i];

    cout << endl << r << endl;

    return 0;
}

```



<!-- endtab -->

{% endtabs %}



> 题目描述：
>
> 对于一个十进制数 A，将 A转换为二进制数，然后按位逆序排列，再转换为十进制数 B，我们称 B为 A 的二进制逆序数。
>
> 例如对于十进制数 173173，它的二进制形式为 1010110110101101，逆序排列得到 1011010110110101，其十进制数为 181181，181181 即为 173173 的二进制逆序数。

注意：二进制转十进制的加法表示！！！秦九韶算法



```C++
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;


vector<int> div_2(vector<int> &a,int &r){
    vector<int> c;
    r = 0;
    for(int i = a.size()-1;i>-1;--i){
        r = r*10+a[i];
        c.push_back(r>>1);
        r%=2;
    }
    reverse(c.begin(),c.end());
    while(c.size()>1 && c.back()==0) c.pop_back();
    return c;
}

vector<int> add(vector<int> a,vector<int> b){
    if(a.size()<b.size()) return add(b,a);
    
    vector<int> c;
    int t = 0;
    for(int i = 0;i<a.size();++i){
        t += a[i];
        if(i<b.size()) t+=b[i];
        c.push_back(t%10);
        t/=10;
    }
    
    if(t) c.push_back(t);
    return c;
}

bool cmp(vector<int> a){
    if(a.size()>1) return true;
    else return a[0];
}

vector<int> dec_to_bin(vector<int> &a){
    vector<int> b;
    while(cmp(a)){
        int r;
        a = div_2(a,r);
        b.push_back(r);
    }
    return b;
}

vector<int> bin_to_dec(vector<int> &b){  //二进制转十进制的算法很香。 秦九韶算法
    vector<int> d;
    d.push_back(0);
    for(int i = 0;i<b.size();++i){
        d = add(add(d,d),{b[i]});
    }
    return d;
}



int main(){
    string a_s;
    vector<int> a,b,d;
    cin>>a_s;
    
    for(int i = a_s.length()-1;i>-1;--i) a.push_back(a_s[i]-'0');
    b = dec_to_bin(a);

    d = bin_to_dec(b);

    for(int i = d.size() - 1; i >= 0; i --) cout << d[i];

    cout << endl;
    
    
    return 0;
}
```

详解一下如何计算大数二进制转大数十进制：
$$
假设 当前二进制的数组为: \ \  b_i, b_{i-1},\cdots,b_{1},b_{0};   \ \ (ps : 从高位到低位。)\\
正常的计算方法是: \ \ \  res = \sum_{k=0}^{i}{2^{k}b_{k}} \\
对于这个算法显然不适合大数计算，因为计算2^k 是一个乘法运算，在这个算法里面，乘法和加法的混合运算显然会使得算法的时间复杂度上升\\
因此 我们可以使用秦九韶算法来简化步骤将所有的乘法运算都化简为加法运算\\
由res = \sum_{k=0}^{i}{2^{k}b_{k}},我们不妨拿出前四项: res_{前四项} = b_{3}2^3+ b_{2}2^2+ b_{1}2^1+ b_{0}2^0 = 
\{[b_{3}2+b_{2}]2+b_1\}2+b_0; \\
故可以使用秦九韶算法化简步骤
$$

```C++
vector<int> bin_to_dec(vector<int> &b){  //二进制转十进制的算法很香。 秦九韶算法
    vector<int> d;
    d.push_back(0);
    for(int i = 0;i<b.size();++i){
        d = add(add(d,d),{b[i]});
    }
    return d;
}
```



