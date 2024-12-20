<template>
  <div class="create-product">
    <h2>Create Product</h2>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">Product Name</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div>
        <label for="sku">SKU</label>
        <input type="text" v-model="sku" id="sku" required />
      </div>
      <div>
        <label for="price">Price</label>
        <input type="number" v-model="price" id="price" required />
      </div>
      <div>
        <label for="image">Image Upload</label>
        <input type="file" @change="handleImageUpload" id="image" />
      </div>

      <div class="button-container">
        <button type="button" @click="close">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits()

const name = ref('')
const sku = ref('')
const price = ref('')
const image = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    image.value = file
  }
}
const token = localStorage.getItem('token')

const user_id = localStorage.getItem('user_id')
const submitProduct = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('sku', sku.value)
  formData.append('price', price.value)
  formData.append('image', image.value)
  formData.append('user_id', user_id)

  try {
    const response = await fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: formData,
    })
    console.log(response);
    
    if (response.ok) {
      alert('Product created successfully!')
      emit('close')
    } else {
      alert('Error creating product')
    }
  } catch (error) {
    console.error('Error creating product:', error)
  }
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.create-product {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='number'] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input[type='file'] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type='button'] {
  background-color: #ccc;
}

button:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
