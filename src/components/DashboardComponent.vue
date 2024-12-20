<template>
    <div>
        <div class="button-container">
            <h1>Dashboard</h1>
            <button @click="handleLogout">Log Out</button>
        </div>
        <h3>Product Crud</h3>
    </div>
    <div>
        <IndexComponent />
    </div>
</template>

<script setup>
import IndexComponent from './Product/IndexComponent.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
 const handleLogout = async () => {
    const url = 'http://127.0.0.1:8000/api/logout'
    const token = localStorage.getItem('token')
    try{
        const response = await fetch(url,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        if (!response.ok) {
            alert(response.message);
        }
        if (response.ok) {
            localStorage.removeItem('token')
            router.push('/');
        }
    }catch (error) {
        console.log('Error Occured', error);
    }
 }
</script>

<style>
.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    padding: 0 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20%;
    cursor: pointer;
  }  
</style>