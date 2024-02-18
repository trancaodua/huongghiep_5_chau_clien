<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label>Name</label>
                <input type="text" name="name" v-model="nameInput.value" />
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" v-model="descriptionInput.value" />
            </div>
            <div>
                <label>Avatar
                    <input type="file" name="image" accept="image/*" hidden @change="handleImage" />
                </label>
                <div v-if="previewImage">
                    <img :src="previewImage">
                </div>
            </div>
            <div>
                <label class="check_container" v-for="country in countries" :key="country.name">
                    {{ country.name }}
                    <input type="checkbox" :value="country.name" v-model="countriesInput.value">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <label class="check_container" v-for="field in fields" :key="field.id">
                    {{ field.name }}
                    <input type="checkbox" :value="field.id" v-model="fieldsInput.value">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <label class="check_container" v-for="gender in genders" :key="gender.id">
                    {{ gender.name }}
                    <input type="checkbox" :value="gender.id" v-model="gendersInput.value">
                    <span class="checkmark"></span>
                </label>
            </div>
            <button>
                Create
            </button>
        </form>
    </div>
</template>
<script>
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore()
        const previewImage = ref(null);
        const nameInput = reactive({ value: null, error: null });
        const descriptionInput = reactive({ value: null, error: null });
        const imageInput = reactive({ value: null, error: null });
        const countriesInput = reactive({ value: [1], error: null })
        const fieldsInput = reactive({ value: [], error: null })
        const gendersInput = reactive({ value: [], error: null })


        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        const countries = computed(() => store.getters['countries/countries']);
        console.log(countries);

        const fields = computed(() => {
            return store.getters['fields/fields'];
        })

        const genders = computed(() => {
            return store.getters['genders/genders'];
        })

        const handleImage = async (e) => {

            try {
                const file = e.target.files[0];
                imageInput.value = await toBase64(file);
                previewImage.value = window.URL.createObjectURL(file);
                await store.dispatch('profiles/uploadImage', { image: previewImage.value });
            } catch (err) {
                console.log(err);
            }
        }

        const handleSubmit = async () => {
            console.log(imageInput.value);
            await store.dispatch('profiles/create', {
                name: nameInput.value,
                description: descriptionInput.value,
                avatar: imageInput.value,
                countries: countriesInput.value,
                fields: fieldsInput.value,
                gender: gendersInput.value,
            });
        }

        return {
            handleImage,
            handleSubmit,
            previewImage,
            countries,
            fields,
            genders,
            nameInput,
            descriptionInput,
            imageInput,
            countriesInput,
            fieldsInput,
            gendersInput
        }
    }
}
</script>