<template>
  <div class="galeria">
    <input type="file" accept="image/*" multiple @input="toBase64">
    <button @click.prevent="enviar" :disabled="btn_disabled">Enviar</button>
    <span>{{ ja_enviado }} / {{ env_imagens.length }}</span>
    <button @click.prevent="deleteAll">Apagar tudo</button>

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
        btn_disabled: false
      }
    },
    methods: {
      toBase64() {
        // this.imagens = []
        this.env_imagens = []
        var image = document.querySelector('input[type="file"]')

        let reader = []

        for (var i = 0; i < image.files.length; i++) {

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
        if (this.env_imagens.length < 1) {
          console.warn('Nenhuma imagem selecionada.')
        } else {
          for (let img of this.env_imagens) {
            try {
              let res = await fetch('https://engetec-api.herokuapp.com/galeria', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "imagem": img
                })
              })
              console.log('Foi: ', await res.json())
            } catch(e) {
              // statements
              console.log('Erro: ', e);
            }
            this.ja_enviado++
          }
          this.ja_enviado = 0
          var image = document.querySelector('input[type="file"]')
          image.value = ""
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
</style>