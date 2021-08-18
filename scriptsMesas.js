const params = new URLSearchParams(window.location.search)
let site_id=params.get('site')
var theLinks = document.querySelectorAll('.mesas a');
theLinks.forEach(function (element, index) {
    element.href = element.href +"?site="+site_id;
})
