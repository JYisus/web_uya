$("document").ready(function() {
  if(localStorage.getItem('token') == null ) {
    $('header').append(`<nav class="grey darken-4" >
          <div class="nav-wrapper container grey darken-4">
            <a href="/" class="brand-logo">MusicArt</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a class="black" href="/musicos">Músicos</a></li>
              <li><a href="/grupos">Grupos</a></li>
              <li><a href="/opiniones">Opiniones</a></li>
              <li><a href="/login">Iniciar sesión</a></li>
              <li><a href="/registro">Registrarse</a></li>
            </ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos">Músicos</a></li>
          <li><a href="/grupos">Grupos</a></li>
          <li><a href="/opiniones">Opiniones</a></li>
          <li><a href="/login">Iniciar sesión</a></li>
          <li><a href="/registro">Registrarse</a></li>
        </ul>`)
  }
  else {
    $('header').append(`
      <nav class="grey darken-4" >
          <div class="nav-wrapper container grey darken-4">
            <a href="/" class="brand-logo">MusicArt</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a class="black" href="/musicos">Músicos</a></li>
              <li><a href="/grupos">Grupos</a></li>
              <li><a href="/opiniones">Opiniones</a></li>
              <li><a class="salir" href="#">Salir</a></li>
            </ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos">Músicos</a></li>
          <li><a href="/grupos">Grupos</a></li>
          <li><a href="/opiniones">Opiniones</a></li>
          <li><a class="salir" href="#">Salir</a></li>
        </ul>`)
  }

    $("#anunciar-musico").submit(function(event){
      event.preventDefault();
      let data = $('#anunciar-musico').serializeArray()
      let formData = { username:localStorage.username, instrumento:$("#instrumento").val(), lugar:$("#lugar").val(), anuncio:$("#anuncio").val()}
      $.post('/musicos',formData,data=>{
          document.location.href = '/musicos';
      });
    });
});
