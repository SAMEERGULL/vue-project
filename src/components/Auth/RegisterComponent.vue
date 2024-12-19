<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <div>
        <label for="password_confirmation">Confirm Password</label>
        <input
          type="password"
          id="password_confirmation"
          v-model="password_confirmation"
          required
          placeholder="Confirm your password"
        />
      </div>
      <div>
        <button type="submit" :disabled="loading">Register</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p>Have an account? Click on <a href="/">Login</a> button</p>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterComponent',
  setup() {
    const router = useRouter()
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const error = ref(null)
    const loading = ref(false)

    const passwordMatch = computed(() => password.value === password_confirmation.value)

    const handleRegister = async () => {
      error.value = null
      loading.value = true

      if (!passwordMatch.value) {
        error.value = 'Passwords do not match.'
        loading.value = false
        return
      }

      try {
        const response = await registerApi(username.value, email.value, password.value, password_confirmation.value)
        console.log('Registration successful:', response)
        router.push('/') // Redirect to login page or another route
      } catch (err) {
        error.value = err.message || 'An error occurred during registration.'
      } finally {
        loading.value = false
      }
    }

    const registerApi = async (username, email, password, password_confirmation) => {
      // const url = `${import.meta.env.VUE_APP_BASE_URL}register`
      const url = 'http://127.0.0.1:8000/api/register'
      console.log(url)

      const body = JSON.stringify({ name: username, email, password, password_confirmation })

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
          body: body, 
        })
        console.log(response);
        
        if (!response.ok) {
          throw new Error('Failed to register. Please try again.')
        }

        const result = await response.json()
        console.log(result);
        
        return result
      } catch (error) {
        throw new Error(error.message || 'An error occurred.')
      }
    }

    return {
      username,
      email,
      password,
      password_confirmation,
      error,
      loading,
      passwordMatch,
      handleRegister,
    }
  },
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 12px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
