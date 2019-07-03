<template>
  <div class="eventos">
    <h2>Eventos</h2>
    <div class="evento" v-for="(evento, index) of eventos" :key="index">
      <div class="img-evento">
        <img :src="link + index">
      </div>
      <div class="detalhes">
        <p><strong>Nome: </strong> {{ evento.name }}</p>
        <p>
          <strong>Local: </strong>
          {{ evento.local }}
        </p>
        <p>
          <strong>Data: </strong>
          {{ new Date(evento.date).toLocaleDateString() }} | 
          {{ new Date(evento.date).toLocaleTimeString() }}
        </p>
        <p class="descricao">
          <strong>Descrição: </strong>
          {{ evento.description }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'eventos',
  data() {
    return {
      eventos: [],
      link: 'http://lorempixel.com/300/200/business/'
    }
  },
  methods: {
    async listar() {
      var res = await fetch('http://localhost:3000/eventos', {
        method: 'GET',
        mode: 'cors'
      })
      res = await res.json()
      console.log(res);
      this.eventos = res
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