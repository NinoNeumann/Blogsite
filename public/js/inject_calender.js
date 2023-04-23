var obj = document.getElementById("recent-posts");
var ele = document.createElement('div');
if(ele!=null && obj!=null){
    ele.setAttribute('class',"calendar");
    obj.insertAdjacentElement('afterbegin',ele);
    GitHubCalendar(".calendar", "NinoNeumann", { responsive: true });
}


