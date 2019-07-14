<template>
	<div class="page">
    <h2 class="article-title" @focusout="atualizar" contenteditable="true" spellcheck="false" v-html="title"></h2>

    <img class="article-img" src="https://lorempixel.com/400/400/nightlife/">
    
    <div class="article-content" @focusout="atualizar" contenteditable="true" spellcheck="false" v-html="content">
    </div>
    <div class="toolbar" @click="atualizar">
      <button class="btn btn-flat" @click.prevent="formatDoc('bold')">
        <i class="material-icons">format_bold</i>
      </button>
      <button class="btn btn-flat" @click.prevent="formatDoc('italic')">
        <i class="material-icons">format_italic</i>
      </button>
      <button class="btn btn-flat" @click.prevent="formatDoc('underline')">
        <i class="material-icons">format_underlined</i>
      </button>
      <!-- <button class="btn" @click="formatDoc('strikeThrough')">
        <i class="material-icons">strikethrough_s</i>
      </button> -->
      <button class="btn btn-flat" @click.prevent="formatDoc('justifyLeft')">
        <i class="material-icons">format_align_left</i>
      </button>
      <button class="btn btn-flat" @click.prevent="formatDoc('justifyCenter')">
        <i class="material-icons">format_align_center</i>
      </button>
      <button class="btn btn-flat" @click.prevent="formatDoc('justifyRight')">
        <i class="material-icons">format_align_right</i>
      </button>
      <button class="btn btn-flat" @click.prevent="formatDoc('justifyFull')">
        <i class="material-icons">format_align_justify</i>
      </button>
      <button class="btn btn-primary no-border-radius" @click.prevent="postar">
        <i class="material-icons">save</i>
      </button>
    </div>
	</div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      async listar() {
        var res = await fetch('https://engetec-api.herokuapp.com/home', {
          method: 'GET',
          mode: 'cors'
        })
        res = await res.json()
        console.log(res)
        this.title = res[0].title
        this.content = res[0].content
      },
      async postar() {
        var res = await fetch('https://engetec-api.herokuapp.com/home', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "title": this.title,
            "content": this.content
          })
        })
      },
      atualizar() {
        var titulo = document.querySelector('.article-title').innerHTML
        var conteudo = document.querySelector('.article-content').innerHTML
        this.title = titulo
        this.content = conteudo
      },
      formatDoc(sCmd, sValue) {
        document.execCommand(sCmd, false, sValue)
      }
    },
    mounted() {
      this.listar()
    }
  }
</script>

<style scoped>
  .page {
    margin-bottom: 50px;
  }
  .article-title {
    min-height: 30px;
    border: 2px dashed #00000050;
  }
  .article-content {
    line-height: 160%;
    max-width: 960px;
    width: 100%;
    min-height: 100px;
    border: 2px dashed #00000050;
  }
  .toolbar {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #f1f1f1;
    height: 40px;
  }
  .toolbar button {
    height: 40px;
  }
  .toolbar button:nth-last-child(1) {
    float: right;
  }
  .toolbar button:nth-last-child(1) .material-icons {
    color: #fff;
  }
  .btn {
    height: 34px;
    line-height: 55px;
    padding: 0 10px;
    border: 0;
    border-radius: 7px;
    background-color: transparent;
    /*background-color: #f6f6f6;*/
    cursor: pointer;
    box-shadow: 0 1px 2px 1px #00000020;
  }
  /* .btn:hover {
    background-color: #e1e1e1;
  }*/
  .btn:active {
    /*background-color: #f5f5f5;*/
    background-color: #d2d2d250;
    box-shadow: 0 0 2px 1px #00000020;
  }
  .no-border-radius {
    border-radius: 0;
  }
  .btn-flat {
    border-radius: 0;
    box-shadow: none;
  }
  .btn-primary {
    background-color: #fc9a22;
    color: #fff;
  }
  .btn-primary:active {
    background-color: #ed8200;
  }
  @media (max-width: 490px) {
    .article-img {
      width: 100%;
    }
  }
</style>
