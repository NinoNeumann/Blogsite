---
title: 外挂标签速查
tag: 
- 主题美化
- 标签速查
categories:
- 学习笔记
date: {{date}}
cover: https://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/Cover_img/105773900_p0.jpg
---



https://butterfly.js.org/posts/4aa8abbe/

# hexo butterfly 主题的外挂标签 速查

## Note 标签

```markdown
{% note [color] [icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

| 名称  | 用法                                                         |
| ----- | ------------------------------------------------------------ |
| color | 【可選】顔色(default / blue / pink / red / purple / orange / green) |
| icon  | 【可選】可配置自定義 icon (只支持 fontawesome 圖標, 也可以配置 no-icon ) |
| style | 【可選】可以覆蓋配置中的 style（simple/modern/flat/disabled） |

## tag-hide标签

```markdown
{% hideToggle display,bg,color %}
content
{% endhideToggle %}
```

## Tabs 标签

横向可选择的框栏

```markdown
{% tabs test1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

```markdown
{% tabs test4 %}
<!-- tab 第一個Tab -->
**tab名字為第一個Tab**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有圖標 沒有Tab名字**
<!-- endtab -->

<!-- tab 炸彈@fas fa-bomb -->
**名字+icon**
<!-- endtab -->
{% endtabs %}

```

## label标签

高亮文字

```
{% label text color %}
```

| 参数  | 解释                                                         |
| ----- | ------------------------------------------------------------ |
| text  | 待高亮的文字                                                 |
| color | 【可選】背景顏色，默認為 default  default/blue/pink/red/purple/orange/green |



## timeline标签

```
{% timeline 2022,blue %}
<!-- timeline 01-02 -->
這是測試頁面
<!-- endtimeline -->
{% endtimeline %}
```

## Mermaid标签

```
{% mermaid %}
內容
{% endmermaid %}
```

## 记录算法题解和思路的tabs 标签

```
{% tabs 思路&&题解 %}
<!-- tab 思路-->
**This is Tab 1.**
<!-- endtab -->

<!-- tab 题解-->
**This is Tab 2.**
<!-- endtab -->
{% endtabs %}


```

