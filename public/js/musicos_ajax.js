$("document").ready(function() {
  if(localStorage.getItem('token') == null ) {
    $('header').append(`    <nav class="grey darken-4" >
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
        $('#zona-superior').append(`<div class="row center">
        <p class="caption center-align parrafo-texto">Inicia sesión o registrate para crear un anuncio.</p>
        <a href='/login' class="waves-effect waves-light btn amber darken-2">Iniciar Sesión</a>
                    <a href='/registro' class="waves-effect waves-light btn amber darken-4">Registrarse</a> <br>`)
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
              <li><a id="salir" href="#">Salir</a></li>
            </ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos">Músicos</a></li>
          <li><a href="/grupos">Grupos</a></li>
          <li><a href="/opiniones">Opiniones</a></li>
          <li><a id="salir" href="#">Salir</a></li>
        </ul>`)
        $('#zona-superior').append(`<div class="row center">
          <a href='/anunciarMusico' class="waves-effect waves-light btn amber darken-2">Crear anuncio</a>
        </div> <br>`)
  }
  $.get('/musicos/all',(datos)=>{
    var res = '';
    (datos.data).forEach (i => {
      $('#anuncios_musicos').append(`
      <li>
        <div class="collapsible-header">
        <ul class="list-inline">
          <li>
            <i alt="" class="material-icons prefix">person</i><span class="title-element">Usuario: </span>${i['username']}
          </li>
          <li>
            <i alt="" class="material-icons prefix">music_note</i><span class="title-element">Intrumento: </span>${i['instrumento']}
          </li>
          <li>
            <i alt="" class="material-icons prefix">map</i><span class="title-element">Lugar: </span>${i['lugar']}
          </li>
        </div>
        </ul>
        <div class="collapsible-body"><span class="caption">${i['anuncio']}</span></div>
      </li>
      `);
    })
  });
});
