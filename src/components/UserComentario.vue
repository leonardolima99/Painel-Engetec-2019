<template>
  <div class="user">
    <img class="user-img1" src="https://placekitten.com/50/50" width="50">
    <div class="comentario-post">
      <div class="comentario-texto" @click="focus" contenteditable="true">
        <p>
          
        </p>
      </div>
      <div class="actions">
        <button class="btn" @click="postar">Comentar</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserComentario',
    data() {
      return {
        comentarios: [],
        comentario: {
          user_name: '',
          date: '',
          texto: ''
        }
      }
    },
    methods: {
      postar() {
        this.comentario = {
          user_name: 'Leonardo Lima',
          date: new Date(),
          texto: document.querySelector('div.comentario-texto').innerText
        }
        this.comentarios.push(this.comentario)
        localStorage.setItem('comentarios', JSON.stringify(this.comentarios))
        this.listar()
      },
      listar() {
        var comentariosStorage = JSON.parse(localStorage.getItem('comentarios'))
        if (comentariosStorage) {
          this.comentarios = comentariosStorage
        }
      },
      focus() {
        // document.querySelector('.comentario-texto p').innerText = ""
      }
    }
  }
</script>