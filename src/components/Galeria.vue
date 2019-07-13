<template>
  <div class="galeria">
    <input type="file" accept="image/*" multiple @input="toBase64">
    <button @click.prevent="enviar" :disabled="btn_disabled">Enviar</button>
    <span>{{ ja_enviado }} / {{ env_imagens.length }}</span>
    <button @click.prevent="deleteAll">Apagar tudo</button>
    <div id="myModal" class="modal" v-if="show_modal">

      <!-- Modal content -->
      <div class="modal-content">
        <h3 class="mb-2">Imagens selecionadas</h3>
        <span class="close" @click.prevent="closeModal">&times;</span>
        <div class="line" v-for="data of modal_data" :class="{ 'ok': data.ok > 0, 'not': data.ok < 0 }">
          <span class="name">
            {{ data.name }}
          </span>
          <span class="size">
            {{ data.size }}
          </span>
        </div>
      </div>

    </div>
    <div class="img_escolhida">
      <img :src="env_imagens[0]" width="300">
    </div>
    <div class="imagens">
      <div class="img-galeria" v-for="img of imagens">
        <img :src="img.imagem">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Galeria',
    data() {
      return {
        imagens: [],
        env_imagens: [],
        ja_enviado: 0,
        show_modal: false,
        modal_data: [],
        btn_disabled: false
      }
    },
    methods: {
      returnSize(size) { // Bytes
        let size_kB = size / 1024
        let size_MB = size_kB / 1024
        if (size < 1024 ) {
          return `${size} B`
        } else if (size_kB < 1024) {
          return `${size_kB.toFixed(2)} kB`
        } else {
          return `${size_MB.toFixed(2)} MB`
        }
      },
      closeModal() {
        this.show_modal = false
        this.modal_data = []
      },
      toBase64() {
        // this.imagens = []
        this.env_imagens = []
        var image = document.querySelector('input[type="file"]')
        let reader = []

        for (var i = 0; i < image.files.length; i++) {
          this.modal_data.push({
            "name": image.files[i].name,
            "size": this.returnSize(image.files[i].size),
            "ok": 0
          })
          reader.push(new FileReader())

          reader[i].readAsDataURL(image.files[i])
        
          reader[i].onload = async (e) => {

            this.env_imagens.push(await e.target.result)

          }
        }
      },
      async listar() {
        let res = await fetch('https://engetec-api.herokuapp.com/galeria', {
          method: 'GET',
          mode: 'cors'
        })
        this.imagens = await res.json()
      },
      async enviar() {
        this.btn_disabled = true
        this.show_modal = true
        if (this.env_imagens.length < 1) {
          console.warn('Nenhuma imagem selecionada.')
        } else {
          for (let i = 0; i < this.env_imagens.length; i++) {
            try {
              let res = await fetch('https://engetec-api.herokuapp.com/galeria', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "imagem": this.env_imagens[i]
                })
              })
              res = await res.json()
              if (res.imagem) {
                this.modal_data[i].ok = 1
                console.log('Resposta: ', res.imagem)
              } else {
                this.modal_data[i].ok = -1
                console.log('Erro: ', res.error)
              }
            } catch(e) {
              // statements
              console.log('Erro: ', e);
            }
            this.ja_enviado++
          }
          this.ja_enviado = 0
          var image = document.querySelector('input[type="file"]')
          image.value = ""
          // this.show_modal = false
          this.env_imagens = []
          this.btn_disabled = false
          this.listar()
        }
      },
      async deleteAll() {
        let res = await fetch('https://engetec-api.herokuapp.com/galeria/all', {
          method: 'DELETE',
          mode: 'cors'
        })
        console.log(await res.json())
        this.listar()
      }
    },
    mounted() {
      this.listar()

      if (this.env_imagens.length === 0) {
        this.btn_disabled = true
      } else {
        this.btn_disabled = false
      }
    },
    updated() {
      if (this.env_imagens.length === 0) {
        this.btn_disabled = true
      } else {
        this.btn_disabled = false
      }
    }
  }
</script>

<style>
  .imagens {
    column-count: 4;
    column-gap: 1em;
    display: inline-block;
  }
  .img-galeria img {
    background-color: #eee;
    margin: 0 auto 1em;
    width: 100%;
  }
  @media (max-width: 369.98px) {
    .imagens {
      column-count: 1;
    }
  }
  @media (min-width: 370px) and (max-width: 575.98px) {
    .imagens {
      column-count: 1;
    }
  }
  @media (min-width: 576px) and (max-width: 767.98px) {
    .imagens {
      column-count: 2;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    .imagens {
      column-count: 3;
    }
  }
  @media (min-width: 992px) and (max-width: 1199.98px) {
    .imagens {
      column-count: 4;
    }
  }
  @media (min-width: 1200px) {
    .imagens {
      column-count: 4;
    }
  }
   /* The Modal (background) */
  .modal {
    display: flex;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: hidden; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    max-height: 75%;
    overflow: auto;
    align-self: center;
    background-color: #fefefe;
    margin: auto; /* 15% from the top and centered */
    padding: 16px 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    z-index: 1;
  }
  .line {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 6px 0;
    background-color: #e1e1e130;
    border-radius: 7px;
    border: 1px solid #e1e1e1;
  }
  .line.ok {
    color: green;
    background-color: #00ff0010;
    border: 1px solid #00ff0090;
    transition: .4s;
  }
  .line.not {
    color: red;
    background-color: #ff000010;
    border: 1px solid #ff000090;
    transition: .4s;
  }
  /* The Close Button */
  .close {
    color: #aaa;
    position: relative;
    margin: -54px -8px 0 0;
    float: right;
    font-size: 40px;
    font-weight: bold;
    z-index: 2;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  } 
</style>