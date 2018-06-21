$("document").ready(function() {
  $.get('/musicos/all',(datos)=>{
    console.log(datos.data)
    var res = '';
    (datos.data).forEach (i => {
      console.log(i);
      $('#anuncios_musicos').append(`
      <li>
        <div class="collapsible-header">${i['username']} Intrumento:${i['instrumento']} Lugar:${i['lugar']}</div>
        <div class="collapsible-body"><span>${i['anuncio']}</span></div>
      </li>
      `);
    })
  });
});
