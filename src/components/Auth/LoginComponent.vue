<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
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
        <button type="submit" :disabled="loading">Login</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p>
        Don't have an account? Click on <RouterLink to="/register">Register</RouterLink> to create
        one
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginComponent',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const loading = ref(false)

    const handleSubmit = async () => {
      error.value = null
      loading.value = true

      try {
        const response = await fakeLoginApi(email.value, password.value)
        console.log('Login successful:', response)
        router.push('/dashboard')
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const fakeLoginApi = async (email, password) => {
      const url = 'http://127.0.0.1:8000/api/login'

      const body = JSON.stringify({ email, password })

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        })
        console.log(response)

        if (!response.ok) {
          throw new Error('Failed to login. Please try again.')
        }

        const result = await response.json()
        localStorage.setItem('user_id', result.user.id)
        localStorage.setItem('token', result.access_token)
        console.log(result)

        return result
      } catch (error) {
        throw new Error(error.message || 'An error occurred.')
      }
    }

    return {
      email,
      password,
      error,
      loading,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.login-container {
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
