
<template>
    <div class="container">
        <h3>Config Major</h3>
        <form @submit.prevent="handleSubmit">
            <div>
                <label>Name</label>
                <input type="text" v-model="newFieldName" name="name" />
                <button @click="addNew" type="button">Add New</button>
            </div>
            <div>
                <label class="check_container" v-for="field in fields" :key="field.name">
                    {{ field.name }}
                    <input type="checkbox" :value="field.name">
                    <span class="checkmark"></span>
                    <button @click="remove(field)" type="button">Remove</button>
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
        const newFieldName = ref(null);
        const fields = ref(store.getters['fields/fields']);

        const addNew = () => {
            if (newFieldName.value) {
                fields.value.push({ name: newFieldName.value });
                newFieldName.value = null;
            }
        }

        const remove = (field) => {
            fields.value = fields.value.filter(item => item != field);
        }

        const handleSubmit = async () => {
            try {
                await store.dispatch('fields/update', fields.value);
            } catch (error) {
                console.log(error);
            }
        }

        return {
            fields,
            newFieldName,
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
