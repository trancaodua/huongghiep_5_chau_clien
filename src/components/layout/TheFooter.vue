<template>
    <footer>
        <div class="copyring-contaner">
            <div class="logo"><router-link :to="{ name: 'home' }"><img src="@/assets/logo.jpg"></router-link></div>
            <p>Create professional-looking resumes and easy to use in a fraction of the time. The greatest online resume
                builder can provide you a significant advantage in the job market.</p>
        </div>
        <div class="contact-contianer">
            <h3>Connect with me</h3>
            <form @submit.prevent="submitMessage">
                <label style="width:auto" v-if="notify">{{ notify }}</label>
                <div class="form-control">
                    <label for="name">Name</label>
                    <input v-model.trim="name" type="text" placeholder="Enter your name" name="name">
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input v-model.trim="email" type="email" placeholder="Enter your email" name="email">
                </div>
                <div class="form-control">
                    <label for="email">Message</label>
                    <textarea v-model.trim="message" placeholder="Message" name="message" />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
        <div class="menu-wrapper">
            <ul class="menu-container">
                <li><router-link class="link" :to="{ name: 'home' }">Home</router-link> </li>
                <li><router-link class="link" :to="{ name: 'contact' }">Create Profile</router-link> </li>
                <li><router-link class="link" :to="{ name: 'register' }">Register</router-link> </li>
            </ul>
            <ul class="social-container">
                <li>
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                </li>
                <li>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </li>
                <li>
                    <a href="#"> <i class="fa-brands fa-skype"></i></a>
                </li>
                <li>
                    <a href="#"> <i class="fa-brands fa-twitter"></i></a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import apiService from '@/app/apiService';

export default {
    setup() {
        const name = ref(null);
        const email = ref(null);
        const message = ref(null);
        const store = useStore();
        const notify = ref(null);

        const submitMessage = async () => {
            try {
                if (!name.value || !email.value || !message.value) {
                    return;
                }

                store.commit('setLoading', true);
                await apiService.post('/api/message/create', {
                    name: name.value,
                    email: email.value,
                    message: message.value
                })
                name.value = null;
                email.value = null;
                message.value = null;
                notify.value = 'Send Message is successfully.';
            }
            catch (error) {
                notify.value = error;
            }
            finally {
                store.commit('setLoading', false);
            }
        }

        return {
            submitMessage,
            name,
            email,
            message,
            notify
        }
    },
}
</script>


<style scoped>
footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1 auto;
    background-color: #F8F9FE;
    padding: 3rem;
}

.copyring-contaner {
    border-right: 1px solid #1F9F96;
}

.copyring-contaner .logo {
    width: 10rem;
}

.copyring-contaner p {
    color: #1F9F96;
    font-family: "Rubik", sans-serif;
    font-size: 1rem;
    line-height: 2rem;
    text-align: left;
    padding: 2rem;
}

.logo img {
    width: 100%;
}

.menu-wrapper {
    padding: 1rem;
}

.menu-container {
    list-style: none;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    padding-bottom: 1rem;
}

.menu-container .link {
    color: #1F9F96;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
}

.social-container {
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
}

.social-container a {
    font-size: 1rem;
    color: #1F9F96;
    border-radius: 50%;
    padding: 0.2rem;
    border: 1px solid #1F9F96;
}

.contact-contianer {
    width: 100%;
    padding: 1rem;
    border-right: 1px solid #1F9F96;
}

.contact-contianer form {
    width: 100%;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-control {
    display: grid;
    grid-template-columns: auto 1fr;
}

.contact-contianer form input,
textarea {
    height: 45px;
    background: #fff;
    border-radius: 30px;
    padding: 0 20px;
    border: none;
    outline: none;
}

.contact-contianer form label {
    margin: auto;
    color: #1F9F96;
    width: 5rem;
}

.contact-contianer form button {
    width: 5rem;
    height: 2rem;
    border: none;
    background-color: #1F9F96;
    color: #fff;
    cursor: pointer;
    border-radius: 0.4rem;
}

.contact-contianer h3 {
    margin-bottom: 1rem;
    color: #1F9F96;
}

@media screen and (max-width:800px) {
    footer {
        grid-template-columns: auto;
        grid-auto-rows: repeat(3, auto);
    }

    .copyring-contaner,
    .contact-contianer {
        border: none;
        /* border-bottom: 1px solid #1F9F96; */
    }
}

/* @media screen and (max-width:800px) {
    footer {
        grid-template-columns: repeat(2, auto);
        grid-auto-rows: repeat(2, auto);
    }

} */
</style>