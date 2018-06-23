$("document").ready(function() {
  if(localStorage.getItem('token') == null ) {
    $('header').append(`<nav class="grey darken-4" >
          <div class="nav-wrapper container grey darken-4">
            <a href="/" class="brand-logo">MusicArt</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
				<li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
				<li><a class="black" href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
				<li><a href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
				<li><a href="/login" role="menuitem" aria-label="Iniciar sesion">Iniciar sesión</a></li>
				<li><a href="/registro" role="menuitem" aria-label="Registrarse">Registrarse</a></li>
			</ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
		  <li><a href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
          <li><a href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
          <li><a href="/login" role="menuitem" aria-label="Iniciar sesión">Iniciar sesión</a></li>
          <li><a href="/registro" role="menuitem" aria-label="Registrarse">Registrarse</a></li>
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
              <li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
              <li><a class="black" href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
              <li><a href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
              <li><a class="salir" href="#" role="menuitem" aria-label="Salir">Salir</a></li>
            </ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
          <li><a href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
          <li><a href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
          <li><a class="salir" href="#" role="menuitem" aria-label="Salir">Salir</a></li>
        </ul>`)
        $('#zona-superior').append(`<div class="row center">
          <a href='/anunciarGrupo' class="waves-effect waves-light btn amber darken-2">Crear anuncio</a>
        </div> <br>`)
  }
  $.get('/grupos/all',(datos)=>{
    var res = '';
    (datos.data).forEach (i => {
      $('#anuncios-grupos').append(`
      <li>
        <div class="collapsible-header">
        <ul class="list-inline">
          <li>
            <i alt="" class="material-icons prefix">people</i><span class="title-element">Grupo: </span>${i['grupo']}
          </li>
          <li>
            <i alt="" class="material-icons prefix">music_note</i><span class="title-element">Género: </span>${i['genero']}
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
