<template>
    <div class="container">
        <form @submit.prevent="submit">
            <h2>Login</h2>
            <div class="control-form">
                <label for="email">Email Address*</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="control-form">
                <label for="password">Password*</label>
                <input type="password" name="password" v-model="password">
            </div>
            <button>Log In</button>
            <p class="text">
                Don't have an account?
                <router-link to="/register">Register</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {

    setup() {
        const email = ref(null);
        const password = ref(null);

        const store = useStore();

        const submit = () => {
            store.dispatch('auth/login', { email: email.value, password: password.value });
        }
        return {
            email,
            password,
            submit
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}

form {
    max-width: 40rem;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
}

form h2 {
    font-size: 2rem;
    font-family: "Poppins", sans-serif;
}

.control-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}

.control-form label {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.1rem;
    line-height: 1.8rem;
}

.control-form input {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2rem;
    height: 3rem;
    width: 100%;
    border: 1px solid #1574F6;
    border-radius: none;
}

form button {
    width: 5rem;
    height: 2rem;
    border: none;
    outline: none;
    color: white;
    background-color: #1F9F96;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.2rem;
    font-weight: bold;
}
</style>