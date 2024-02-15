<template>
    <div class="container">
        <!-- <base-spinner v-if="isLoading"></base-spinner> -->
        <form @submit.prevent="submit">
            <h2>Login</h2>
            <p class="error-form-text" v-if="formError">{{ formError }}</p>
            <div class="control-form" :class="{ invalid: email.error }">
                <label for="email">Email Address*</label>
                <input type="email" name="email" v-model.trim="email.value" @blur="clearValidity(email)">
                <p class="error-text" v-if="email.error">{{ email.error }}</p>
            </div>
            <div class="control-form" :class="{ invalid: password.error }">
                <label for="password">Password*</label>
                <input type="password" name="password" v-model.trim="password.value" @blur="clearValidity(password)">
                <p class="error-text" v-if="password.error">{{ password.error }}</p>
            </div>
            <div class="control-form" :class="{ invalid: confirmPassword.error }">
                <label for="confirmPassword">Confirm Password*</label>
                <input type="confirmPassword" name="confirmPassword" v-model.trim="confirmPassword.value"
                    @blur="clearValidity(confirmPassword)">
                <p class="error-text" v-if="confirmPassword.error">{{ confirmPassword.error }}</p>
            </div>
            <button>Create</button>
            <p class="text">
                Do have an account?
                <router-link to="/login">Login</router-link>
            </p>
            <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
        </form>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default {

    setup() {
        const email = reactive({ value: null, error: null });
        const password = reactive({ value: null, error: null });
        const confirmPassword = reactive({ value: null, error: null });
        const formError = ref(null);
        const isLoading = ref(true);

        const store = useStore();

        const submit = async () => {
            //validation
            formError.value = null;
            if (!email.value) {
                email.error = 'Email is required!';
            }

            if (!password.value || password.value.length < 6) {
                password.error = 'Password is required and should be min 6 characters long';
            }

            if (!confirmPassword.value || confirmPassword.value != password.value) {
                confirmPassword.error = 'Confirm password not match!';
            }
            try {
                await store.dispatch('auth/signup', { email: email.value, password: password.value });
            }
            catch (error) {
                formError.value = error;
            }
        }
        const clearValidity = (input) => {
            input.error = null;
        }

        return {
            email,
            password,
            confirmPassword,
            submit,
            clearValidity,
            formError,
            isLoading
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
    outline: none;
    padding: 0.5rem;
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

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}

.error-form-text{
    color: red;
}

.error-text {
    margin-top: 0.5rem;
    font-size: 0.8rem;
}
</style>