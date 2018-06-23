$("document").ready(function() {
  $(".salir").on('click',function(event){
    localStorage.clear('token')
    localStorage.clear('username')
    document.location.href = '/';
  })
});
