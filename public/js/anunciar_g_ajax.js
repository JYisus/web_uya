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
  }

    $("#anunciar-grupo").submit(function(event){
      event.preventDefault();
      let data = $('#anunciar-grupo').serializeArray()
      let formData = { grupo:$("#grupo").val(), genero:$("#genero").val(), lugar:$("#lugar").val(), anuncio:$("#anuncio").val()}
      $.post('/grupos',formData,data=>{
          document.location.href = '/grupos';
      });
    });
});
