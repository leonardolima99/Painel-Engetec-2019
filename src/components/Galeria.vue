<template>
  <div class="galeria">
    <input type="file" accept="image/*" multiple @input="toBase64">
    <button @click.prevent="enviar">Enviar</button>
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
        imagens: []
      }
    },
    methods: {
      toBase64() {
        this.imagens = []
        var image = document.querySelector('input[type="file"]').files

        let reader = []

        for (var i = 0; i < image.length; i++) {

          reader.push(new FileReader())

          reader[i].readAsDataURL(image[i])
        
          reader[i].onload = async (e) => {

            this.imagens.push(await e.target.result)

          }
        }
        console.log(this.imagens)
      },
      async listar() {
        let res = await fetch('https://engetec-api.herokuapp.com/galeria', {
          method: 'GET',
          mode: 'cors'
        })
        this.imagens = await res.json()
      },
      async enviar() {
        for (let img of this.imagens) {
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
            console.log(img)
          } catch(e) {
            // statements
            console.log('Erro: ', e);
          }
        }
        this.listar()
      }
    },
    mounted() {
      this.listar()
    }
  }
</script>

<style>
  .img-galeria img {
    cursor: pointer;
    transition: .4s;
  }
  .img-galeria img:hover {
  }
  @media (max-width: 369.98px) {
    .imagens {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 100%;
      grid-gap: 1px 5px;
    }
    .img-galeria {
      margin: 0 auto;
    }
    .img-galeria img {
      width: calc(100%);
    }
  }
  @media (min-width: 370px) and (max-width: 575.98px) {
    .imagens {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 100%;
      grid-gap: 1px 5px;
    }
    .img-galeria {
      margin: 0 auto;
    }
    .img-galeria img {
      width: 280px;
    }
  }
  @media (min-width: 576px) and (max-width: 767.98px) {
    .imagens {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-gap: 1px 5px;
    }
    .img-galeria img {
      width: calc(100% - 3px);
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    .imagens {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-gap: 1px 5px;
    }
    .img-galeria img {
      width: calc(100% - 3px);
    }
  }
  @media (min-width: 992px) and (max-width: 1199.98px) {
    .imagens {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      grid-gap: 7px 3px;
    }
    .img-galeria img {
      width: calc(100% - 9px);
    }
  }
  @media (min-width: 1200px) {
    .imagens {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      grid-gap: 7px 3px;
    }
    .img-galeria img {
      width: calc(100% - 9px);
    }
  }
</style>