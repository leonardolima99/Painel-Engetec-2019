<template>
  <div class="inscricao">
    <h2>Inscreva-se</h2>
    <form class="inscricao" @submit.prevent="inscrever" autocomplete="off">
      <div class="form-group">
        <input type="text" class="form-control" id="nome" required v-model="dados.nome" placeholder=" ">
        <label class="lb" for="nome">Nome</label>
      </div>
      
      <div class="form-group">
        <input type="email" class="form-control" id="email" required=".*S.*" v-model="dados.email" placeholder=" ">
        <label class="lb" for="email">Email</label>
      </div>

      <div class="form-group">
        <input type="tel" class="form-control" id="telefone" maxlength="14" required=".*S.*" v-model="dados.telefone" pattern="\d{2} [0-9] \d{4}-\d{4}" placeholder=" " @keypress="mascaraTelefone(dados.telefone, '## # ####-####')">
        <label class="lb" for="telefone">Telefone</label>
      </div>
      
      <div class="form-group">
        <input type="text" class="form-control" id="rg" maxlength="9" required v-model="dados.rg" placeholder=" " @keypress="mascaraRG(dados.rg, '#.###.###')">
        <label class="lb" for="rg">RG</label>
      </div>
      
      <div class="form-group">
        <input type="text" class="form-control" id="curso" required=".*S.*" v-model="dados.curso" placeholder=" ">
        <label class="lb" for="curso">Curso</label>
      </div>
      
      <div class="form-group">
        <input type="number" class="form-control" id="semestre" min="1" max="10" required v-model="dados.semestre" placeholder=" ">
        <label class="lb" for="semestre">Semestre</label>
      </div>

      <div class="actions">
        <button type="reset" class="btn">Cancelar</button>
        <button type="submit" class="btn btn-primary">Inscrever</button>
        <!-- <button @click="listar">Listar</button> -->
      </div>
            
    </form>

  </div>
</template>

<script>
export default {
  name: 'inscricao',
  data() {
    return {
      dados: {
        nome: "",
        email: "",
        telefone: "",
        rg: "",
        curso: "",
        semestre: ""
      }
    }
  },
  methods: {
    async inscrever() {
      var res = await fetch('http://localhost:3000/inscricoes/new', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.dados)
      })
      // localStorage.setItem('inscricao', JSON.stringify(this.dados))
      console.log(res)
    },
    async listar() {
      var res = await fetch('http://localhost:3000/inscricoes', {
        mode: 'cors'
      })
      res = await res.json()
      console.log(res)
    },
    mascaraTelefone(t, mask) {
      var i = t.length
      var saida = mask.substring(1,0)
      var texto = mask.substring(i)
      if (texto.substring(0,1) != saida) {
        this.dados.telefone += texto.substring(0,1)
      }
    },
    mascaraRG(t, mask) {
      var i = t.length
      var saida = mask.substring(1,0)
      var texto = mask.substring(i)
      if (texto.substring(0,1) != saida) {
        this.dados.rg += texto.substring(0,1)
      }
    }
  }
}
</script>

<style scoped>
  form.inscricao {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 10px;
  }
  .form-group {
    padding: 10px 0;
    height: 50px;
  }
  .lb {
    position: absolute;
    margin-left: 9px;
    margin-top: 11px;
    padding: 2px;
    font-size: 16px;
    color: #00000080;
    border-radius: 12px;
    cursor: text;
    transition: .2s;
    font-family: sans-serif !important;
    user-select: none;
  }
  .form-control {
    position: absolute;
    width: calc(500px - 40px);
    height: 45px;
    font-size: 16px;
    font-family: sans-serif !important;
    color: #555;
    padding: 0 10px;
    border: 1px solid #00000050;
    border-radius: 7px;
    transition: .2s;
  }
  .form-control:not(:placeholder-shown) + .lb {
    transform: translateY(-22px);
    font-size: 14px;
    background-color: #fff;
    padding: 0 4px;
  }  
  .form-control:valid {
    border: 2px solid #00ed17;
  }
  .form-control:valid + .lb {
    transform: translateY(-19px);
    font-size: 14px;
    color: #00ed17;
    background-color: #fff;
    border-radius: 12px;
    padding: 0 4px;
  }
  .form-control:invalid {
    /*border: 2px solid red;*/
    box-shadow: 0 0 0 0;
  }
  .actions {
    width: 200%;
    display: flex;
    justify-content: center;
  }
  .btn {
    height: 42px;
    padding: 0 20px;
    font-size: 16px;
    border: 0;
    margin: 10px;
    border-radius: 7px;
    background-color: #d2d2d240;
    /*background-color: #f6f6f6;*/
    cursor: pointer;
    box-shadow: 0 1px 2px 1px #00000020;
  }
/*  .btn:hover {
    background-color: #e1e1e1;
  }*/
  .btn:active {
    /*background-color: #f5f5f5;*/
    background-color: #d2d2d250;
    box-shadow: 0 0 2px 1px #00000020;
  }
  .btn-primary {
    background-color: #fc9a22;
    color: #fff;
  }
  .btn-primary:active {
    background-color: #ed8200;
  }
  @media (max-width: 567.98px) {
    form.inscricao {
      grid-template-columns: 100%;
      grid-gap: 10px;
    }
    .form-control {
      position: absolute;
      width: calc(100% - 60px) !important;
    }
    .buttons {
      width: 100% !important;
    }
  }
  @media (max-width: 991.98px) {

    .form-control {
      position: absolute;
      width: calc((100vw - 105px)/2);
    }
    .buttons {
      width: 200%;
      justify-content: space-between;
    }
    .buttons .btn {
      margin: 10px 0;
    }
  }
</style>