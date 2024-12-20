<template>
    <div>
        <EditComponent
          v-if="isEditProductVisible"
          :product="selectedProduct"
          @close="isEditProductVisible = false"
          @updateProduct="updateProduct"
        />
      <div v-else class="header">
        <h2 class="products-title">Products</h2>
        <button @click="createProduct" class="create-button">Create Product</button>
      </div>
  
      <CreateComponent v-if="isCreateProductVisible" @close="isCreateProductVisible = false" />
  
  
      <table v-else class="product-table">
        <thead>
          <tr>
            <th>Custom ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="products.length > 0">
          <tr v-for="(product, index) in products" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.price }}</td>
            <td>
              <img :src={image} alt="Product Image" class="product-image" />
            </td>
            <td>
              <button @click="editProduct(product)">Edit</button>
              <button @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="no-products-message">No products available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import CreateComponent from './CreateComponent.vue';
  import EditComponent from './EditComponent.vue';
  
  const products = ref([]);
  const isCreateProductVisible = ref(false);
  const isEditProductVisible = ref(false);
  const selectedProduct = ref(null); 
  
  const token = localStorage.getItem('token')
  const fetchProducts = async () => {
    const url = `http://127.0.0.1:8000/api/products`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
      });
      const data = await response.json();
      products.value = data;
    } catch (error) {
      console.error('There was an error fetching the products:', error);
    }
  }
  
 
onMounted(fetchProducts);

watch([isCreateProductVisible, isEditProductVisible], () => {
  if (!isCreateProductVisible.value && !isEditProductVisible.value) {
    fetchProducts();
  }
});

  const createProduct = () => {
    isCreateProductVisible.value = true;
  };
  
  const editProduct = (product) => {
    selectedProduct.value = product; 
    isEditProductVisible.value = true; 
  };
  
  const image = fetch(`http://127.0.0.1;8000/api/product.image`,{
    headers:{
      Authorization: `bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  console.log(image);
  
  const deleteProduct = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await fetch(`http://127.0.0.1:8000/api/products/${id}`, { 
       method: 'DELETE',
       headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
       });
      products.value = products.value.filter(product => product.id !== id); 
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };
  
  const updateProduct = (updatedProduct) => {
    const index = products.value.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      products.value[index] = updatedProduct; // Update the product in the list
    }
  };
  </script>
  
  <style scoped>
  /* Styles for the product table and other elements */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .products-title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .create-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .create-button:hover {
    background-color: #0056b3;
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .product-table th,
  .product-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .product-table th {
    background-color: #f4f4f4;
  }
  
  .product-image {
    width: 50px;
    height: auto;
  }
  
  button {
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .no-products-message {
    text-align: center;
    font-size: 18px;
    color: #888;
    grid-column: span 6;
  }
  </style>
  