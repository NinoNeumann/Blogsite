//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
    "url(https://resource.ninoneumann.cn/blog_background_img/103816605_p0_master1200.jpg)",
    "url(https://resource.ninoneumann.cn/blog_background_img/104136194_p0_master1200.jpg)",
    "url(https://resource.ninoneumann.cn/blog_background_img/68977253_p0_master1200.jpg)",
    "url(https://resource.ninoneumann.cn/blog_background_img/74078288_p0_master1200.jpg)",
    "url(https://resource.ninoneumann.cn/blog_background_img/84603466_p0_master1200.jpg)",
    "url(https://resource.ninoneumann.cn/blog_background_img/93596331_p0_master1200.jpg)",
    "url(https://resource.ninoneumann.cn/blog_background_img/101454734_p0.jpg)"
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
    "linear-gradient(to right, #076585, #fff)",
    "linear-gradient(to right, #614385, #516395)",
    "linear-gradient(to right, #9796f0, #fbc7d4)"
];
/*
* 1
* 2
* 3
* sky
* 4
* Anamnisar
* */

var tcindex = Math.floor(Math.random()*text_color.length);
var subtitle_element = document.getElementById("subtitle");
var site_title_element = document.getElementById("site-title");
var post_element = document.getElementsByClassName("post-title")[0];
var site_name = document.getElementsByClassName("site-name")[0];

if(subtitle_element!=null){
    subtitle_element.style.background = text_color[tcindex];
}
if(site_title_element!=null){
    site_title_element.style.background = text_color[tcindex];
}
if(post_element!=null){
    post_element.style.background = text_color[tcindex];
}
if(site_name!=null){
    site_name.style.background = text_color[tcindex];
}



