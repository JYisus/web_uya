$("document").ready(function() {
  if(localStorage.getItem('token') == null ) {
    $('header').append(`<nav class="grey darken-4" >
      <div class="nav-wrapper container grey darken-4">
        <a href="/" class="brand-logo">MusicArt</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li><a href="/musicos">Músicos</a></li>
          <li><a href="/grupos">Grupos</a></li>
          <li><a href="#">Eventos</a></li>
          <li><a href="/login">Iniciar sesión</a></li>
          <li><a href="/registro">Registrarse</a></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><a href="/musicos">Músicos</a></li>
      <li><a href="/grupos">Grupos</a></li>
      <li><a href="#">Eventos</a></li>
      <li><a href="/login">Iniciar sesión</a></li>
      <li><a href="/registro">Registrarse</a></li>
    </ul>`)

    $('#zona-carousel').prepend(`<a href='/login' class="waves-effect waves-light btn amber darken-2">Iniciar Sesión</a>
                <a href='/registro' class="waves-effect waves-light btn amber darken-4">Registrarse</a>`)
  }
  else {
    $('header').append(`
      <nav class="grey darken-4" >
        <div class="nav-wrapper container grey darken-4">
          <a href="/" class="brand-logo">MusicArt</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="/musicos">Músicos</a></li>
            <li><a href="/grupos">Grupos</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a id="salir" href="#">Salir</a></li>
          </ul>
        </div>
      </nav>
      <!--Barra de navegación resolución pequeña-->
      <ul class="sidenav" id="mobile-demo">
        <li><a href="/musicos">Músicos</a></li>
        <li><a href="/grupos">Grupos</a></li>
        <li><a href="#">Eventos</a></li>
        <li><a id="salir" href="#">Salir</a></li>
      </ul>`)
  }
});
