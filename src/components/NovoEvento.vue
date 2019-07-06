<template>
  <div class="evento" id="novo">
    <div class="img-evento">
      <img src="https://placeimg.com/300/200/any">
    </div>
    <div class="detalhes">
      <p>
        <strong>Nome: </strong>
        <span class="name" contenteditable="true" spellcheck="false">
          Nome do evento.
        </span>
      </p>
      <p>
        <strong>Local: </strong>
        <span class="local" contenteditable="true" spellcheck="false">
          Local do evento.
        </span>
      </p>
      <p>
        <strong>Data: </strong>
        <span class="date" contenteditable="true" spellcheck="false">
          <!-- {{ new Date(evento.date).toLocaleDateString() }} | 
          {{ new Date(evento.date).toLocaleTimeString() }} -->
          Data.
        </span>
      </p>
      <p class="descricao">
        <strong>Descrição: </strong>
        <span class="description" contenteditable="true" spellcheck="false">
          E descrição do evento
        </span>
      </p>
    </div>
    <button @click.prevent="postarNovo">Salvar</button>
  </div>
</template>

<script>
  export default {
    name: 'NovoEvento',
    data() {
      return {
        msg: 'Funciona'
      }
    },
    methods: {
      async postarNovo() {
        let name = document.querySelector('#novo span.name').innerText
        let local = document.querySelector('#novo span.local').innerText
        let date = document.querySelector('#novo span.date').innerText
        let description = document.querySelector('#novo span.description').innerText

        console.log(`${name}\n${local}\n${date}\n${description}`)

        try {
          let res = await fetch('https://engetec-api.herokuapp.com/eventos', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": name,
              "local": local,
              "date": date,
              "description": description
            })
          })
          console.log(await res.json())
        } catch(e) {
          console.log(e)
        }
      }
    }
  }
</script>