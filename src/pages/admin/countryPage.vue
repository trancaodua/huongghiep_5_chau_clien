
<template>
    <div class="container">
        <h3>Config Country</h3>
        <form @submit.prevent="handleSubmit">
            <div>
                <label>Name</label>
                <input type="text" v-model="newCountryName" name="name" />
                <button @click="addNew" type="button">Add New</button>
            </div>
            <div>
                <label class="check_container" v-for="country in countries" :key="country.name">
                    {{ country.name }}
                    <input type="checkbox" :value="country.name">
                    <span class="checkmark"></span>
                    <button @click="remove(country)" type="button">Remove</button>
                </label>
            </div>
            <button>Submit</button>
        </form>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
    setup() {
        const store = useStore();
        const newCountryName = ref(null);
        const countries = ref(store.getters['countries/countries']);

        const addNew = () => {
            if (newCountryName.value) {
                countries.value.push({ name: newCountryName.value });
                newCountryName.value = null;
            }
        }

        const remove = (country) => {
            countries.value = countries.value.filter(item => item != country);
        }

        const handleSubmit = async () => {
            try {
                await store.dispatch('countries/update', countries.value);
            } catch (error) {
                console.log(error);
            }
        }

        return {
            countries,
            newCountryName,
            addNew,
            remove,
            handleSubmit
        }
    },
}
</script>

<style scoped>
.container {
    padding: 5rem;
}

.container form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px black solid;
    justify-content: center;
    align-items: center;
}

button {
    background-color: #1F9F96;
    color: #fff;
    border: none;
    padding: 4px;
    margin-left: 2px;
    margin-right: 8px;
    cursor: pointer;
    max-width: 200px;
}

input {
    outline: none;
}
</style>
