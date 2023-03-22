//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/103816605_p0_master1200.jpg)",
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/104136194_p0_master1200.jpg)",
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/68977253_p0_master1200.jpg)",
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/74078288_p0_master1200.jpg)",
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/84603466_p0_master1200.jpg)",
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/93596331_p0_master1200.jpg)",
    "url(http://my-blog-pics-repo.oss-cn-shanghai.aliyuncs.com/blog_background_img/93596331_p0_master1200.jpg)"
];
//获取背景图片总数，生成随机数
var bgindex =Math.floor(Math.random() * backimg.length);
//重设背景图片
document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];

// 随机字体颜色
var text_color = [
    "linear-gradient(to right, #003973, #e5e5be)",
    "linear-gradient(to right, #ede574, #e1f5c4)",
    "linear-gradient(to right, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #076585, #fff)"
];

var tcindex = Math.floor(Math.random()*text_color.length);
document.getElementById("subtitle").style.background = text_color[tcindex];
document.getElementById("site-title").style.background = text_color[tcindex];
document.getElementsByClassName("site-name")[0].style.background = text_color[tcindex];



