<template>
  <div class="edit-product">
    <h2>Edit Product</h2>
    <form @submit.prevent="submitEdit">
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
        <label for="image">Image URL</label>
        <input type="file" @change="handleImageUpload"  id="image" />
      </div>
      <div class="button-container">
        <button type="submit">Update Product</button>
        <button type="button" @click="close">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  product: Object,
})

const emit = defineEmits()

const name = ref('')
const sku = ref('')
const price = ref('')
const image = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    image.value = file
  }else {
    image.value = props.product.image
  }
}

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      name.value = newProduct.name
      sku.value = newProduct.sku
      price.value = newProduct.price
      image.value = newProduct.image
    }
  },
  { immediate: true },
)

//   const user_id = localStorage.getItem('user_id')
console.log('product Data', props.product)

const submitEdit = async () => {
  // const updatedProduct = {
  //   name: name.value,
  //   sku: sku.value,
  //   price: price.value,
  //   image: null,
  //   _method: 'PUT',
  // }
  const updatedProduct = new FormData();
  updatedProduct.append('name',name.value);
  updatedProduct.append('sku',sku.value);
  updatedProduct.append('price',price.value);
  updatedProduct.append('_method','PUT');
  const token = localStorage.getItem('token')
  if (image.value instanceof File) {
    updatedProduct.append('image', image.value)
    // updatedProduct.image = image.value
  } else if (image.value) {
    updatedProduct.append('image',image.value)
    // updatedProduct.image = image.value
  }
  console.log(updatedProduct);
  console.log(updatedProduct.name);
  console.log(updatedProduct.sku);
  console.log(updatedProduct.price);
  console.log(updatedProduct._method);
  console.log(updatedProduct.image);
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${props.product.id}`, {
      method: 'POST',
      headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json'
            },
      body: JSON.stringify(updatedProduct),
    })

    if (response.ok) {
      const data = await response.json()
      emit('updateProduct', data)
      emit('close')
    }
  } catch (error) {
    console.error('Error updating product:', error)
  }
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.edit-product {
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

input {
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
