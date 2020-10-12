$.ajaxPrefilter(function(optins){
    console.log(optins);
    optins.url = 'http://ajax.frontend.itheima.net'+ optins.url
})