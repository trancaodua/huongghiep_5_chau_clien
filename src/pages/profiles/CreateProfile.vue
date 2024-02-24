<template>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <h2>{{ profileId ? 'Edit Profile' : 'Create Profile' }}</h2>
            <p class="error-form-text" v-if="formError">{{ formError }}</p>
            <div class="control-form" :class="{ invalid: nameInput.error }">
                <label>Name*</label>
                <input type="text" name="name" v-model.trim="nameInput.value" />
                <p class="error-text" v-if="nameInput.error">{{ nameInput.error }}</p>
            </div>
            <div class="control-form" :class="{ invalid: birthdayInput.error }">
                <label>Birthday*</label>
                <datepicker class="datepicker" v-model="birthdayInput.value" :upperLimit="new Date()"
                    :inputFormat="'dd-MM-yyyy'" />
                <p class="error-text" v-if="birthdayInput.error">{{ birthdayInput.error }}</p>
            </div>
            <div class="control-form" :class="{ invalid: gendersInput.error }">
                <label>Gender*</label>
                <div class="checkbox-control">
                    <label class="check_container" v-for="gender in genders" :key="gender.id">
                        {{ gender.name }}
                        <input type="radio" :value="gender.id" v-model="gendersInput.value">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <p class="error-text" v-if="gendersInput.error">{{ gendersInput.error }}</p>
            </div>

            <div class="control-form" :class="{ invalid: imageInput.error }">
                <label>Avatar*</label>
                <label class="upload-image">
                    <input type="file" name="image" accept="image/*" hidden @change="handleImage" />

                    Click to uplad Image
                    <i class="fa-solid fa-upload"></i>
                </label>
                <p class="error-text" v-if="imageInput.error">{{ imageInput.error }}</p>
                <img v-if="previewImage" class="preview-image" :src="previewImage">
            </div>

            <div class="control-form" :class="{ invalid: descriptionInput.error }">
                <label>Description*</label>
                <textarea rows="4" name="description" v-model.trim="descriptionInput.value"></textarea>
                <p class="error-text" v-if="descriptionInput.error">{{ descriptionInput.error }}</p>
            </div>
            <div class="control-form" :class="{ invalid: countriesInput.error }">
                <label>Countries*</label>
                <p class="error-text" v-if="countriesInput.error">{{ countriesInput.error }}</p>
                <div class="checkbox-control">
                    <label class="check_container" v-for="country in countries" :key="country.name">
                        {{ country.name }}
                        <input type="checkbox" :value="country.name" v-model="countriesInput.value">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="control-form" :class="{ invalid: fieldsInput.error }">
                <label>Major*</label>
                <p class="error-text" v-if="fieldsInput.error">{{ fieldsInput.error }}</p>
                <div class="checkbox-control">
                    <label class="check_container" v-for="field in fields" :key="field.name">
                        {{ field.name }}
                        <input type="checkbox" :value="field.name" v-model="fieldsInput.value">
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>

            <the-skills :handleRemoveSkill="handleRemoveSkill" :skillsInput="skillsInput"
                :handleAddSkill="handleAddSkill"></the-skills>

            <the-certificate :handleRemove="handleRemoveCertificate" :handleImage="handleAddCertificate"
                :certificateInput="certificateInput"></the-certificate>
            <the-education :handleAdd="handleAddEducation" :educationInput="educationInput"
                :handleRemove="handleRemoveEducation" title="Education">
            </the-education>
            <the-education :handleAdd="handleAddExperience" :educationInput="experienceInput"
                :handleRemove="handleRemoveExperience" title="Experience">
            </the-education>

            <div class="control-form">
                <label>Facebook</label>
                <input type="url" name="facebookInput" v-model.trim="facebookInput.value" />
            </div>
            <div class="control-form">
                <label>Instagram</label>
                <input type="url" name="instagramInput" v-model.trim="instagramInput.value" />
            </div>
            <div class="control-form">
                <label>Skype</label>
                <input type="text" name="skypeInput" v-model.trim="skypeInput.value" />
            </div>
            <div class="control-form">
                <label>Twitter</label>
                <input type="url" name="twitterInput" v-model.trim="twitterInput.value" />
            </div>
            <button>
                {{ profileId ? 'Update' : 'Create' }}
            </button>
        </form>
    </div>
</template>
<script>
import { ref, computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import Datepicker from 'vue3-datepicker';
import TheSkills from '@/components/ui/form/TheSkills.vue';
import TheCertificate from '@/components/ui/form/TheCertificate.vue';
import TheEducation from '@/components/ui/form/TheEducationExperience.vue';
import apiService from '@/app/apiService';

export default {
    props: ['id'],
    components: {
        Datepicker,
        TheSkills,
        TheCertificate,
        TheEducation
    },
    setup(props) {
        const store = useStore()
        const previewImage = ref(null);
        const nameInput = reactive({ value: null, error: null });
        const descriptionInput = reactive({ value: null, error: null });
        const imageInput = reactive({ value: null, error: null });
        const countriesInput = reactive({ value: [], error: null })
        const fieldsInput = reactive({ value: [], error: null })
        const gendersInput = reactive({ value: null, error: null })
        const birthdayInput = reactive({ value: null, error: null });
        const facebookInput = reactive({ value: null, error: null });
        const instagramInput = reactive({ value: null, error: null });
        const skypeInput = reactive({ value: null, error: null });
        const twitterInput = reactive({ value: null, error: null });
        const formError = ref(null);
        const skillsInput = reactive({ value: [], error: null });
        const certificateInput = reactive({ value: [], error: null });
        const educationInput = reactive({ value: [], error: null });
        const experienceInput = reactive({ value: [], error: null });

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        const countries = computed(() => store.getters['countries/countries']);

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
                // await store.dispatch('profiles/uploadImage', { image: previewImage.value });
            } catch (err) {
                console.log(err);
            }
        }

        const handleSubmit = async () => {
            formError.value = null;
            store.commit('setLoading', true);
            console.log(skillsInput.value);
            try {

                let error = false;
                if (!nameInput.value) {
                    nameInput.error = 'Name is required!';
                    error = true;
                }
                else {
                    nameInput.error = null;
                }

                if (!birthdayInput.value) {
                    birthdayInput.error = 'Birthday is required!';
                    error = true;
                } else {
                    birthdayInput.error = null;
                }
                if (gendersInput.value === null) {
                    console.log(gendersInput.value);
                    gendersInput.error = 'Gender is required!';
                    error = true;
                }
                else {
                    nameInput.error = null;
                }

                if (!imageInput.value) {
                    imageInput.error = 'Avatar is required!';
                    error = true;
                }
                else {
                    imageInput.error = null;
                }

                if (!descriptionInput.value) {
                    descriptionInput.error = 'Description is required!';
                    error = true;
                }
                else {
                    descriptionInput.error = null;
                }

                if (!countriesInput.value || countriesInput.value.length <= 0) {
                    countriesInput.error = 'Country is required!';
                    error = true;
                }
                else {
                    countriesInput.error = null;
                }

                if (!fieldsInput.value || fieldsInput.value.length <= 0) {
                    fieldsInput.error = 'Major is required!';
                    error = true;
                }
                else {
                    fieldsInput.error = null;
                }


                if (error) return;

                const payload = {
                    name: nameInput.value,
                    description: descriptionInput.value,
                    avatar: imageInput.value,
                    countries: countriesInput.value,
                    fields: fieldsInput.value,
                    gender: gendersInput.value,
                    birthday: birthdayInput.value,
                    facebook: facebookInput.value,
                    instagram: instagramInput.value,
                    skype: skypeInput.value,
                    twitter: twitterInput.value,
                    skills: skillsInput.value,
                    certificate: certificateInput.value,
                    education: educationInput.value,
                    experience: experienceInput.value
                };

                if (profileId.value) payload.id = profileId.value;
                await store.dispatch('profiles/create', payload);
            } catch (error) {
                formError.value = error;
            } finally {
                store.commit('setLoading', false);
            }
        }

        const handleAddSkill = async (name, value) => {
            if (name && value) {
                if (skillsInput.value.some(skill => skill.name === name)) return;
                skillsInput.value.push({ name: name, value: value });
            }
        }

        const handleRemoveSkill = async (skill) => {
            skillsInput.value = skillsInput.value.filter(skillsInput.value.indexOf(skill), 1);
        }

        const handleAddCertificate = async (e) => {
            try {
                const file = e.target.files[0];
                const base = await toBase64(file);
                certificateInput.value.push(base);

            } catch (err) {
                console.log(err);
            }
        }

        const handleRemoveCertificate = async (certificate) => {
            certificateInput.value.splice(certificateInput.value.indexOf(certificate), 1);
        }


        const handleAddEducation = async (education) => {
            if (educationInput.value.some(item => item.title === education.title)) return;

            educationInput.value.unshift({ ...education });
        }

        const handleRemoveEducation = async (education) => {
            educationInput.value.splice(educationInput.value.indexOf(education), 1);
        }

        const handleAddExperience = async (experience) => {
            if (experienceInput.value.some(item => item.title === experience.title)) return;
            experienceInput.value.unshift({ ...experience });
        }

        const handleRemoveExperience = async (experience) => {
            experienceInput.value.splice(experienceInput.value.indexOf(experience), 1);
        }

        const profileId = computed(() => { return props.id; });
        watch(profileId, () => {
            if (profileId.value) {
                fetchProfiles();
            }
            else {
                nameInput.value = null;
                descriptionInput.value = null;
                imageInput.value = null;
                countriesInput.value = [];
                fieldsInput.value = [];
                gendersInput.value = null;
                birthdayInput.value = null;
                facebookInput.value = null;
                instagramInput.value = null;
                skypeInput.value = null;
                twitterInput.value = null;
                skillsInput.value = [];
                certificateInput.value = [];
                educationInput.value = [];
                experienceInput.value = [];
            }

        })
        const fetchProfiles = async () => {
            if (!profileId.value) return;
            try {

                const { data } = await apiService.get(`api//user/profile/${profileId.value}`);
                nameInput.value = data.name;
                descriptionInput.value = data.description;
                imageInput.value = data.avatar;
                countriesInput.value = data.countries;
                fieldsInput.value = data.fields;
                gendersInput.value = data.gender;
                birthdayInput.value = new Date(data.birthday);
                facebookInput.value = data.facebook;
                instagramInput.value = data.instagram;
                skypeInput.value = data.skype;
                twitterInput.value = data.twitter;
                skillsInput.value = data.skills;
                certificateInput.value = data.certificate;
                educationInput.value = data.education.map(item => { return { ...item, from: new Date(item.from), to: new Date(item.to) } });
                experienceInput.value = data.experience.map(item => { return { ...item, from: new Date(item.from), to: new Date(item.to) } });
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchProfiles();

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
            gendersInput,
            birthdayInput,
            facebookInput,
            instagramInput,
            skypeInput,
            twitterInput,
            formError,
            skillsInput,
            handleAddSkill,
            handleRemoveSkill,
            certificateInput,
            handleAddCertificate,
            handleRemoveCertificate,
            handleAddEducation,
            educationInput,
            handleRemoveEducation,
            experienceInput,
            handleAddExperience,
            handleRemoveExperience,
            profileId
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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
    font-size: 1.2em;
    line-height: 1.8rem;
}

.control-form input,
textarea {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2rem;
    height: 3rem;
    width: 100%;
    border: 1px solid #1F9F96;
    border-radius: none;
    outline: none;
    padding: 0.5rem;
}

.control-form input,
textarea {
    height: auto;
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

.error-form-text {
    color: red;
}

.error-text {
    margin-top: 0.5rem;
    font-size: 0.8rem;
}

/* The container */
.checkbox-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-bottom: 1rem;
}

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
.check_container input[type="checkbox"],
input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 50%;
    left: 0;
    height: 1.1rem;
    width: 1.1rem;
    background-color: #eee;
    transform: translateY(-50%);
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

label.check_container {
    font-size: 1rem;
}

.control-form .upload-image {
    font-size: 1rem;
    font-style: italic;
    color: #1F9F96;
    cursor: pointer;
}

.preview-image {
    width: 12rem;
    height: 12rem;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
}

.error-form-text {
    color: red;
}

.error-text {
    margin-top: 0.5rem;
    font-size: 0.8rem;
}
</style>

<style>
.v3dp__datepicker {

    width: auto;
}

.v3dp__datepicker input {
    width: auto;
    border: 1px solid #1F9F96;
    border-radius: none;
    outline: none;
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2rem;
    height: auto;
    padding: 0.5rem
}
</style>