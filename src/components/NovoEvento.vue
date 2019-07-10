<template>
  <div class="evento" id="novo">
    <div class="img-evento">
      <img :src="image" width="300" height="200">
      <input type="file" accept="image/png, image/jpeg" :id="'img--' + index" class="img-upload" @input="toBase64">
      <label class="lb-img-upload" :for="'img--' + index">Trocar</label>
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
          2019-06-30T01:52:15.295Z
        </span>
      </p>
      <p class="descricao">
        <strong>Descrição: </strong>
        <span class="description" contenteditable="true" spellcheck="false">
          E descrição do evento
        </span>
      </p>
    </div>
    <button @click.prevent="postarNovo(index-1)">Salvar</button>
  </div>
</template>

<script>
  export default {
    name: 'NovoEvento',
    props: {
      index: 0
    },
    data() {
      return {
        image: 'data:image/jpeg;base64,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'
      }
    },
    methods: {
      toBase64(e) {
        var img = e.target.files[0]
        console.log(img)
        let reader = new FileReader()
        reader.onload = (e) => {
          console.log('ok')
          this.image = e.target.result
        }
        reader.readAsDataURL(img)
      },
      async postarNovo(i) {
        let name = document.querySelectorAll('#novo span.name')[i].innerText
        let local = document.querySelectorAll('#novo span.local')[i].innerText
        let date = document.querySelectorAll('#novo span.date')[i].innerText
        let description = document.querySelectorAll('#novo span.description')[i].innerText

        // console.log(`${name}\n${local}\n${date}\n${description}`)

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
              "description": description,
              "image": this.image
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