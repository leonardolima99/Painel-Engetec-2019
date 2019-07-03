<template>
  <div class="entrar">
    <form @submit.prevent="redirect">
      <h2 class="center">Área restrita</h2>
      <div class="group-form">
        <input class="form-control" type="text" id="user" placeholder="Usuario">
        <label class="lb user" for="user">Usuario</label>
      </div>
      <div class="group-form">
        <input class="form-control" type="text" id="pass" placeholder="Senha">
        <label class="lb pass" for="pass">Senha</label>
      </div>
      <div class="actions">
        <button class="btn btn-primary" @click="redirect">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  import router from '../router.js'
  export default {
    name: 'entrar',
    methods: {
      redirect() {
        router.push({ name: 'Home' })
      }
    }
  }
</script>

<style scoped>
  .entrar {
    display: flex;
    justify-content: center;
    min-height: 230px;
  }
  .group-form {
    margin: 10px auto 0;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .form-control {
    height: 40px;
    width: 300px;
    border: 1px solid #00000030;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
    color: #00000080;
  }
  .form-control:not(:placeholder-shown) + .lb {
    display: block;
  }
  .lb {
    display: none;
    position: absolute;
    margin-left: 10px;
    margin-top: -44px;
    /*background-color: #fff;*/
    user-select: none;
    color: #00000080;
    font-size: 14px;
    border-radius: 12px;
    cursor: text;
    z-index: 2;
  }
  .pass::after {
    position: absolute;
    content: '';
    height: 2px;
    width: 45px;
    margin-left: -42px;
    margin-top: 10px;
    background-color: #fff;
    z-index: -2;
  }
  .user::after {
    position: absolute;
    content: '';
    height: 2px;
    width: 54px;
    margin-left: -51px;
    margin-top: 10px;
    z-index: -1;
    background-color: #fff;
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
  .actions {
    display: flex;
    justify-content: center;
  }
  .center {
    text-align: center;
  }
  @media (max-width: 567.98px) {
   .input {
      height: 40px;
      width: 100%;
    } 
  }
</style>