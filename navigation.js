function init(current) {
    let list = document.createElement('ul');

    let numbers = ['0','1','2','3','A1a','A1b','4','5','6','7','8', 'A2', '9','10','11',
        '12', '13', 'A3a', 'A3b'];

for (let i=0; i<numbers.length; i++) {
    let li = document.createElement('li');
    let link = document.createElement('a');

    if (i == 0) {
        link.setAttribute('href','../../index.html');
        link.innerHTML = 'Home';
    } else if (i == current) {
        link.setAttribute('href','index.html');
        link.className = 'active';
        link.innerHTML = 'Aufgabe ' + numbers[i];

    } else {
        link.setAttribute('href','../Aufgabe' + numbers[i] +'/index.html');
        link.innerHTML = 'Aufgabe ' + numbers[i];
    }

    li.appendChild(link);
    list.appendChild(li);
}

var ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = "../../navigationStyle.css";
document.getElementsByTagName("head")[0].appendChild(ss);

document.body.appendChild(list);
}