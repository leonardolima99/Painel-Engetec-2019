<template>
  <div class="eventos">
    <h2>Eventos</h2>
    <div class="evento" v-for="(evento, index) of eventos" :key="index">
      <div class="img-evento">
        <img :src="link">
      </div>
      <div class="detalhes">
        <p>
          <strong>Nome: </strong>
          <span class="name" contenteditable="true" spellcheck="false">
            {{ evento.name }}
          </span>
        </p>
        <p>
          <strong>Local: </strong>
          <span class="local" contenteditable="true" spellcheck="false">
            {{ evento.local }}
          </span>
        </p>
        <p>
          <strong>Data: </strong>
          <span class="date" contenteditable="true" spellcheck="false">
            <!-- {{ new Date(evento.date).toLocaleDateString() }} | 
            {{ new Date(evento.date).toLocaleTimeString() }} -->
            {{ evento.date }}
          </span>
        </p>
        <p class="descricao">
          <strong>Descrição: </strong>
          <span class="description" contenteditable="true" spellcheck="false">
            {{ evento.description }}
          </span>
        </p>
      </div>
      <button @click.prevent="atualizar(index, evento._id)">Atualizar</button>
      <button @click.prevent="apagar(index, evento._id)">Apagar</button>
    </div>
    <div id="novo" v-for="vez of vezes">
      <novo-evento />
    </div>
    <button @click.prevent="addNovo">Adicionar Evento</button>
  </div>
</template>

<script>
import NovoEvento from './NovoEvento'
export default {
  name: 'eventos',
  components: {
    NovoEvento
  },
  data() {
    return {
      eventos: [],
      link: 'https://placeimg.com/300/200/any',
      vezes: 0
    }
  },
  methods: {
    async listar() {
      let res = await fetch('https://engetec-api.herokuapp.com/eventos', {
        method: 'GET',
        mode: 'cors'
      })
      res = await res.json()
      console.log(res);
      this.eventos = res
    },
    async atualizar(i, id) {
      let name = document.querySelectorAll('span.name')[i].innerText
      let local = document.querySelectorAll('span.local')[i].innerText
      let date = document.querySelectorAll('span.date')[i].innerText
      let description = document.querySelectorAll('span.description')[i].innerText
      this.eventos[i] = { name, local, date, description }
      console.log(this.eventos[i])
      console.log(i)
      
      try {
        let res = await fetch(`https://engetec-api.herokuapp.com/eventos/${id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": this.eventos[i].name,
            "local": this.eventos[i].local,
            "date": this.eventos[i].date,
            "description": this.eventos[i].description,
          })
        })
        console.log(await res.json())
      } catch(e) {
        console.log(e)
      }

    },
    async apagar(i, id) {
      try {
        let res = await fetch(`https://engetec-api.herokuapp.com/eventos/${id}`, {
          method: 'DELETE',
          mode: 'cors'
        })
        console.log(await res.json())
        
      } catch(e) {
        console.log(e)
      }
    },
    async addNovo() {
      this.vezes += 1
      // this.add_novo = true
    }
  },
  mounted() {
    this.listar()
  }
}
</script>

<style>
  .evento {
    display: block;
    min-height: 200px;
    margin: 10px 0 30px 0;
  }
  .img-evento {
    float: left;
    margin-right: 10px;
  }
  .detalhes {
    line-height: 150%;
    display: block;
  }
  .descricao {
    text-align: justify;
  }
  @media (max-width: 490px) {
    .img-evento img {
      width: 100%;
    }
    .img-evento {
      margin-right: 0;
    }
  }
</style>