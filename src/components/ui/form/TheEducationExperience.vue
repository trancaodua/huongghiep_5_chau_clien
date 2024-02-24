<template>
    <div class="control-form">
        <label>{{ title }}</label>
        <div class="container">
            <div class="wrapper">
                <label>From</label>
                <datepicker v-model="newEducation.from" :inputFormat="'dd/MM/yyyy'"></datepicker>
            </div>
            <div class="wrapper">
                <label>To</label>
                <datepicker v-model="newEducation.to" :inputFormat="'dd/MM/yyyy'"></datepicker>
            </div>
            <div class="wrapper">
                <label>Title</label>
                <input type="text" v-model.trim="newEducation.title" />
            </div>
            <div class="wrapper">
                <label>Description</label>
                <textarea rows=4 v-model.trim="newEducation.description"></textarea>
            </div>
            <button @click="add(newEducation)" type="button">Add</button>
        </div>
        <div>
            <div v-for="education in educationInput.value" :key="education.title">
                <p>
                    <i class="fa-solid fa-circle-check"></i>: {{ `${getFormattedDate(education.from)}-${getFormattedDate(education.to)} - ${education.title}:
                                        ${education.description}` }}
                </p>
                <button @click="handleRemove(education)" type="button">Remove</button>
            </div>
        </div>
    </div>
</template>
<script>
import Datepicker from 'vue3-datepicker';
import { reactive } from 'vue';

export default {
    props: ['educationInput', 'handleAdd', 'handleRemove', 'title'],
    components: {
        Datepicker
    },
    setup(props) {
        const newEducation = reactive({ from: null, to: null, title: null, description: null })
        const add = async () => {
            await props.handleAdd(newEducation);
            newEducation.to = null;
            newEducation.from = null;
            newEducation.title = null;
            newEducation.description = null;
        }

        function getFormattedDate(date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            return day + '/' + month + '/' + year;
        }
        return {
            newEducation,
            add,
            getFormattedDate
        }
    },
}
</script>

<style scoped>
.control-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}

label {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2em;
    line-height: 1.8rem;
}

.control-form input,
textarea {
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

.wrapper label {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2em;
    line-height: 1.8rem;
    width: 8rem;
    flex-shrink: 0;
}

.container {
    width: 100%;
}

.wrapper {
    padding: 0.5rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

p {
    color: rgb(86, 88, 114);
    font-size: 0.8rem;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-style: italic;
}

.control-form button {
    margin: 0.2rem;
    border: none;
    background-color: #1F9F96;
    color: #fff;
    padding: 0.2rem;
    cursor: pointer;
}
</style>
