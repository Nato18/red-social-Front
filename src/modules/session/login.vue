<template>
    <div class="h-screen grid grid-cols-2 ">
        <div class="flex justify-center items-center bg-white">
            <div class="flex justify-center items-center">
                <h1 class="text-xl">Estas Iniciando Sesion en Z  </h1>
            </div>
        </div>
        <div class="flex justify-center items-center bg-purple-600">
            <div class="bg-white rounded-lg py-5 px-10 w-2/4">
                <h3 class="text-center font-bold text-lg pb-5">Iniciar Sesion</h3>
                <div >
                    <div class="flex flex-col ">
                        <label class="font-bold mb-2" for="">Correo Electronico</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="correo" type="text" placeholder="Ingresa tu Correo Electronico">
                    </div>
                    <div class="flex flex-col mt-4">
                        <label class="font-bold" for="">Contraseña</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="pass" type="password" placeholder="ingresa tu contraseña">
                    </div>
                    <div class="mt-4">
                      <router-link to="/register" class="text-purple-500">
                          ¿No tienes una cuenta?
                      </router-link>
                  </div>
                    <div class="mt-10"  v-if="msg != ''">
                        <p class="bg-red-600 text-white text-center py-3">{{ msg }}</p>
                    </div>
                    <div class="flex justify-center mt-10 mb-5">
                        <button @click="login()" class="bg-purple-400 text-white py-2 px-5 rounded-lg font-bold" type="button">Iniciar Sesion</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
  </template>
  
  <script>
  import ApiService from '../../service/api';
  
  export default {
    data(){
        return{
            correo: '',
            pass: '',
            msg: ''
        }
    },
    methods:{
  
        async login(){
            let dataLogin= {correo: this.correo, pass: this.pass};
            const response = await ApiService.login(dataLogin);
            console.log(response);
            if(response.sucess){
                localStorage.setItem("jwt_token", response.token);
                const userDataJSON = JSON.stringify(response.userData);
                localStorage.setItem("userData", userDataJSON);
                this.$router.push("/home");
            }else{
                this.msg = response.data;
            }
  
        } 
    }
    
  }
  </script>