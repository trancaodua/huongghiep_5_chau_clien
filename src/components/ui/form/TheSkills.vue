<template>
    <div class="control-form">
        <label>Skill*</label>
        <div class="container">
            <div class="wrapper">
                <label>Name</label>
                <input type="text" v-model.trim="name" />
            </div>
            <div class="wrapper">
                <label>Value</label>
                <input type="number" v-model="value" />
            </div>
            <button @click="handleAdd()" type="button">Add</button>
        </div>

        <div v-for="skill in skillsInput.value" :key="skill.name">
            <span><i class="fa-solid fa-circle-check"></i>: {{ skill.name }}: {{ skill.value }}% </span>
            <button @click="handleRemoveSkill(skill)" type="button">Remove</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: ['skillsInput', 'handleAddSkill', 'handleRemoveSkill'],
    setup(props) {
        const value = ref(null);
        const name = ref(null);
        const handleAdd = async () => {
            await props.handleAddSkill(name.value, value.value);
            value.value = null;
            name.value = null;
        }
        return {
            name,
            value,
            handleAdd
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
}

.control-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}

.control-form input {
    outline: none;
    border: 1px solid #1F9F96;
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2rem;
    height: auto;
    border-radius: none;
    outline: none;
    padding: 0.5rem;
}

.control-form label {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2em;
    line-height: 1.8rem;
}

.control-form button {
    margin: 0.2rem;
    border: none;
    background-color: #1F9F96;
    color: #fff;
    padding: 0.2rem;
    cursor: pointer;
}

.wrapper {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.wrapper label {
    font-size: 1rem;
    margin-right: 0.5rem;
}

.preview-contaier {
    position: relative;
}
</style>