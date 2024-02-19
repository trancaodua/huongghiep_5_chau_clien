<template>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <div class="form-control">
                <input class="query" type="text" placeholder="Search" v-model.trim="query">
                <button class="query_btn" type="submit"> <i class="fas fa-search"></i></button>
            </div>
            <div class="filter" @click="toggleShowFilter(true)"><i class="icon fa-solid fa-sliders"></i></div>
            <div v-show="isShowFilter" class="filter_container">
                <h3>Quốc gia</h3>
                <div class="checkbox-control">
                    <label class="check_container" v-for="country in countries" :key="country.name">
                        {{ country.name }}
                        <input type="checkbox" :value="country.name" v-model="countriesInput">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <h3>Lĩnh vực</h3>
                <div class="checkbox-control">
                    <label class="check_container" v-for="field in fields" :key="field.name">
                        {{ field.name }}
                        <input type="checkbox" :value="field.name" v-model="fieldsInput">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <h3>Giới tính</h3>
                <div class="checkbox-control">
                    <label class="check_container" v-for="gender in genders" :key="gender.id">
                        {{ gender.name }}
                        <input type="checkbox" :value="gender.id" v-model="gendersInput">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <button type="button" class="faq-toggle" @click="toggleShowFilter(false)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const isShowFilter = ref(false);
        const query = ref(null);
        const countriesInput = ref([]);
        const fieldsInput = ref([]);
        const gendersInput = ref([]);
        const store = useStore();
        const countries = computed(() => {
            return store.getters['countries/countries'];
        })
        const fields = computed(() => {
            return store.getters['fields/fields'];
        })

        const genders = computed(() => {
            return store.getters['genders/genders'];
        })

        const toggleShowFilter = (isShow) => {
            isShowFilter.value = isShow;
        }

        const handleSubmit = async () => {
            try {
                const payload = {};
                if (query.value) {
                    payload.query = query.value;
                }

                if (countriesInput.value && countriesInput.value.length > 0) {
                    payload.countries = countriesInput.value;
                }

                if (fieldsInput.value && fieldsInput.value.length > 0) {
                    payload.fields = fieldsInput.value;
                }


                if (gendersInput.value && gendersInput.value.length > 0) {
                    payload.genders = gendersInput.value;
                }

                await store.dispatch('profiles/get', payload);
            } catch (error) {
                console.log(error);
            }
        }
        return {
            countries,
            fields,
            genders,
            isShowFilter,
            toggleShowFilter,
            handleSubmit,
            query,
            countriesInput,
            fieldsInput,
            gendersInput
        }
    }
}
</script>


<style scoped>
.container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin-top: 2rem;
}

.container form {
    max-width: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    position: relative;
}

form .form-control {
    position: relative;
    flex-grow: 1;
}

form .query {
    background-color: #fff;
    border: 1px solid #1F9F96;
    font-size: 18px;
    padding: 1.2rem;
    padding-right: 3.1rem;
    height: 2rem;
    width: 100%;
    border-radius: 2rem;
    outline: none;
}

form .query_btn {
    height: 2rem;
    width: 2rem;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    color: #1F9F96;
}

form .filter {
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    color: #1F9F96;
    display: flex;
    align-items: center;
    justify-content: center;
}

form .filter_container {
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #9fa4a8;
    border-radius: 10px;
    padding: 2rem;
    overflow: hidden;
    box-shadow: 0 3px 6px rgb(0 0 0 / 10%), 0 3px 6px rgb(0 0 0 / 10%);
}

.faq-toggle {
    border-radius: 50%;
    border: 0;
    background-color: #1F9F96;
    font-size: 16px;
    padding: 0;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 2px;
    right: 2px;
    color: #fff;
    cursor: pointer;
}

.checkbox-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
}

/* The container */
.check_container {
    display: block;
    position: relative;
    padding-left: 1.5rem;
    cursor: pointer;
    font-size: 1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.check_container input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.1rem;
    width: 1.1rem;
    background-color: #eee;
}

/* On mouse-over, add a grey background color */
.check_container:hover input~.checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.check_container input:checked~.checkmark {
    background-color: #1F9F96;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.check_container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.check_container .checkmark:after {
    left: 0.35rem;
    top: 0.1rem;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.filter_container h3 {
    text-align: left;
    margin: 0.5rem 0;
    color: #1F9F96;
}
</style>