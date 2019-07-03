<template>
  <div class="galeria">
    <h2>Gerenciar Postagens</h2>
    
  </div>
</template>

<script>
export default {
  name: 'galeria'
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