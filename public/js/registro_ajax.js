$("document").ready(function() {
  $("#username").on("keyup",function(){
    if($('#username').val()!="") {
    console.log($('#username').serialize())
    $.post('/usuario',$('#username').serialize(),function(data){
      console.log(data.message)
      $('#respuesta').empty()
      if (data.data!=null)
      {
        $('#respuesta').append(`<span id="error" class="mensaje-error">El usuario ya existe</span>`)
      }
      else {
        $('#respuesta').empty()
        $('#respuesta').append(`<span class="mensaje-valido">El nombre de usuario está disponible</span>`)
      }
    })
  }
  else {
    $('#respuesta').empty()
  }
})
});
