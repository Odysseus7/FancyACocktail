const urlParams = new URLSearchParams(window.location.search);

const keyword = urlParams.get("keyword");
const filter = window.location.href.split('=')[1];
console.log(keyword);