$("document").ready(function() {
  $("#loguearse").submit(function(event){
    event.preventDefault();
    let data = $('#loguearse').serializeArray()
    let formData = { 'username':data[0].value, 'password':data[1].value}
    $.post('/singin',formData,data=>{
      if(data.codigo==1){
        $('#merror').empty()
        $('#merror').append(`
            <p role="alert" class="mensaje-error">El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.</p>
          `)
      }
      else{
      localStorage.setItem('token',data.token)
      localStorage.setItem('username',$('#loguearse').serializeArray()[0].value)
      document.location.href = '/';
    }
    });

  })
});
