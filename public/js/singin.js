$("document").ready(function() {
  $("#loguearse").submit(function(event){
    event.preventDefault();
    let data = $('#loguearse').serializeArray()
    let formData = { 'username':data[0].value, 'password':data[1].value}
    $.post('/singin',$('#loguearse').serialize(),data=>{
      if(data.codigo==1){
        console.log('No válido')
      }
      else{
      localStorage.setItem('token',data.token)
    }
    });

  })
  /*const formLogin = document.querySelector('#loguearse')
  const formData = new FormData(formLogin);

  formLogin.addEventListener('submit',event=>{
    event.preventDefault();
    fetch('/singin',{
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data)
      localStorage.setItem('token',data.token)
      return 0
    })
  })*/
});
