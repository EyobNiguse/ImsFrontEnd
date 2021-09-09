<template>
    <div>
        <div class="login-container">
        <div class="login">
           <h1>login</h1>
            <form  @submit.prevent="login">
                <input  v-model="Username"  type="text" placeholder="Enter Username" class="txt-input">
                <input  v-model="password" type="password" placeholder="*****" class="txt-input">
                <button class="btn-submit" type="submit">Login</button>
              
            </form>
        </div>
        <div class="display-picture">

        </div>
   
    </div>
    </div>
</template>
<script>
import Login from  "@/api_calls/Login.js";
export default {
    name:"Login",
    data(){
        return {
            Username:'',
            password:'',
        }
    },
    methods:{
        login(){
            const data  = {
                 "username":this.Username,
               "password":this.password
            }

            Login.login(data).then(res=>{
                this.$confirm(res.message,"SUCCESS","success").then(()=>{
                        localStorage.setItem("accessToken",res.data.access_token);
                        localStorage.setItem("username",res.data.EmployeeName);
                        localStorage.setItem("loginData", JSON.stringify(res.data));
                        console.log(res.data);
                        console.log(res);
                         if(res.data.AdminID){
                             this.$router.push("/Admin/status");
                              localStorage.setItem("username",res.data.AdminUsername);
                         }else{
                             this.$router.push("/dashboard/")
                         }
                })
               
            }).catch(err=>{
                this.$alert(err.response.data.message,"ERROR","error");
            })
        }
    }
}
</script>
<style scoped>
    *{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
.login-container{
 display: grid;
 grid-template-columns: 40% 60%;
 grid-template-rows: 100vh;
}
.login{
 grid-column:1;
 width:100%;
 padding:20%;
 margin-top:50px;
}
.login h1{
    text-align: center;
}
.display-picture{
    grid-column:2;
    background: url(../assets/images/background-main.png) no-repeat;
    background-size:cover;
    background-position: center;
} 
.txt-input{
    padding:25px;
    width:350px;
    border:none;
    display: block;
    margin:10px;
    cursor: pointer;
    border-bottom:2px solid rgb(11, 170, 96);
}
.btn-submit{
    margin:10px;
    width:350px;
    padding:25px;
    border:none;
    border-radius:15px;
    cursor:pointer;
    color:white;
    background: rgb(11, 170, 96);
    font-size:20px;
}
</style>