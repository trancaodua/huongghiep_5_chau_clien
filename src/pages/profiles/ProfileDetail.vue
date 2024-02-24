<template>
    <div class="container">
        <div class="hero-contianer">
            <div class="hero-avatar">
                <img :src="profile.avatar" :alt="profile.name">
            </div>
            <div class="info-container">
                <h4>More Info About Me</h4>
                <p>{{ profile.description }}</p>
                <ul>
                    <li><i class="fa fa-user-circle"></i> {{ profile.name }}</li>
                    <li><i class="fa fa-location-arrow"></i> {{ profile.address }}</li>
                    <li><i class="fa-solid fa-earth-americas"></i>{{ profile.countries.join(',') }}</li>
                    <li><i class="fa-solid fa-cake-candles"></i> {{ new Date().getFullYear() - new
                        Date(profile.birthday).getFullYear() }}</li>
                    <li><i class="fa-solid fa-venus-mars"></i> {{ profile.gender == 0 ? "Male" : "Female" }}</li>
                    <li><i class="fa-brands fa-facebook"></i> {{ profile.facebook }}</li>
                    <li><i class="fa-brands fa-instagram"></i> {{ profile.instagram }}</li>
                    <li><i class="fa-brands fa-skype"></i> {{ profile.skype }}</li>
                    <li><i class="fa-brands fa-twitter"></i> {{ profile.twitter }}</li>
                </ul>
                <div class="hireme-btn">
                    <button type="button" @click="scrollToCotactForm">Hire
                        Me</button>
                </div>
            </div>
        </div>
        <div class="skills-container">
            <h4>My Skills and Competencies</h4>
            <div class="skill-container" v-for="skill in profile.skills" :key="skill.name">
                <p>{{ skill.name }}</p>
                <div class="value-container">
                    <div class="skill-progress" :style="{ width: `${skill.value}%` }">
                        <span>{{ skill.value }}%</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="certificates-container">
            <h4>Certificates</h4>
            <div class="certificate-container">
                <img v-for="item in profile.certificate" :src="item" :alt="item" :key="item">
            </div>
        </div>
        <div class="educations-container">
            <h4>My Experience and Education</h4>
            <div class="education-button-container">
                <button :class="{ 'active': isShowExperience }" @click="setShowExperience(true)" class="education-button"><i
                        class="fa fa-briefcase"></i>EXPERIENCE</button>
                <button :class="{ 'active': !isShowExperience }" @click="setShowExperience(false)"
                    class="education-button"><i class="fa fa-graduation-cap"></i>EDUCATION</button>
            </div>
            <div class="educatition-icon">
                <i v-if="isShowExperience" class="fa fa-briefcase"></i>
                <i v-else class="fa fa-graduation-cap"></i>
            </div>
            <div v-if="isShowExperience">
                <div class="education-container" v-for="item in profile.experience" :key="item.title">
                    <div class="title-icon"><i class="fa-regular fa-circle-dot"></i></div>
                    <div class="time">
                        <span>{{ `${getFormattedDate(item.from)} - ${getFormattedDate(item.to)}` }}</span>
                    </div>
                    <div class="description">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="education-container" v-for="item in profile.education" :key="item.title">
                    <div class="title-icon"><i class="fa-regular fa-circle-dot"></i></div>
                    <div class="time">
                        <span>{{ `${getFormattedDate(item.from)} - ${getFormattedDate(item.to)}` }}</span>
                    </div>
                    <div class="description">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-container" ref="contactEl">
            <h4>Get In Touch</h4>
            <form>
                <input placeholder="Name*:">
                <input placeholder="Email*:">
                <textarea rows="6" aceholder="Message*:" />
                <button>Send</button>
            </form>
        </div>
    </div>
</template>

<script>
import apiService from '@/app/apiService';
import { reactive, ref } from 'vue';

export default {
    props: ['id'],
    setup(props) {
        const profile = reactive({
            address: 'asaa',
            avatar: null,
            birthday: null,
            certificate: [],
            countries: [],
            description: null,
            education: null,
            experience: [],
            facebook: null,
            instagram: null,
            skype: null,
            twitter: null,
            fields: [],
            gender: null,
            name: null,
            skills: []
        });
        const isShowExperience = ref(true);
        const contactEl = ref(null);

        const getProfile = async () => {
            try {
                const { data } = await apiService.get(`/api/profile/${props.id}`);
                for (const property in data) {
                    profile[property] = data[property];
                }

                profile.age
            }
            catch (error) {
                console.log(error);
            }
        }

        const setShowExperience = value => {
            isShowExperience.value = value;
        }

        const scrollToCotactForm = () => {
            contactEl.value.scrollIntoView({ behavior: 'smooth' });
        }

        function getFormattedDate(date) {
            date = new Date(date);
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            return day + '/' + month + '/' + year;
        }

        getProfile();

        return {
            profile,
            getProfile,
            isShowExperience,
            setShowExperience,
            contactEl,
            scrollToCotactForm,
            getFormattedDate
        }
    }
}
</script>

<style scoped>
.container {
    font-family: 'Josefin Sans', sans-serif;
}

.container h4 {
    font-size: 1.8rem;
    display: inline-block;
    padding-bottom: 20px;
    position: relative;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 500;
    line-height: 1.1;
}


.hero-contianer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    margin: 5rem 2rem;
}

.hero-avatar img {
    width: 100%;
}

.info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 2rem;
}

.info-container p {
    text-align: justify;
    line-height: 1.8;
    margin: 0;
    margin-bottom: 2rem;
    font-size: 1rem;
    color: #000
}

.info-container ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-template-rows: repeat(auto-fit, auto);
    gap: 0.5rem;
}

.info-container li {
    text-align: left;
    font-style: italic;
    font-size: 0.9rem;
}

.info-container i {
    color: #1fa298;
}

.skills-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 5rem;
}

.skill-container {
    width: 80%;
}

.value-container {
    width: 100%;
    height: 1rem;
    background: #f4f4f4;
    position: relative;
}

.skill-progress {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #1fa298;
}


.value-container span {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: #fff;
    font-style: italic;
    font-size: 0.9rem;
}

.educations-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 5rem 0;
}

.title-icon {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    color: #1fa298;
}

.education-container::after {
    content: '';
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #eee;
}

.education-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    gap: 2rem;
    padding: 2rem;
}

.education-container .time {
    grid-area: time;
    text-align: left;
}

.time span {
    background: #1fa298;
    font-size: 11px;
    font-weight: 600;
    padding: 7px 18px;
    color: #fff;
    border-radius: 20px;
}

.education-container .description {
    grid-area: description;
    text-align: right;
}


.education-container:nth-child(odd) {
    grid-template-areas: "description time";
}

.education-container:nth-child(even)>.time {
    text-align: right;
}


.education-container:nth-child(even)>.description {
    text-align: left;
}

.education-container:nth-child(even) {
    grid-template-areas: "time description";
}

.educatition-icon {
    color: #1fa298;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    border: 2px solid #eee;
    font-size: 25px;
}

.description h5 {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-family: 'Josefin Sans', sans-serif;
    margin-bottom: 1rem;
}

.description p {
    margin: 0;
    font-size: 1rem;
    color: #000;
    font-weight: 400;
    font-family: 'Muli', sans-serif;
}

.education-button-container {
    margin-bottom: 20px;
}

.education-button {
    width: 150px;
    padding: 10px;
    border: none;
    outline: none;
    background: #444;
    color: #fff;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
}

.education-button.active {
    background: #121212;
}

.education-button i {
    margin-right: 10px;
}

.education-button:nth-child(1) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.education-button:nth-child(2) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.certificates-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

.certificate-container {
    max-width: 400px;
}

.certificate-container img {
    width: 100%;
}


@media screen and (max-width:800px) {
    .hero-contianer {
        grid-template-rows: auto auto;
        grid-template-columns: auto;
    }

    .certificates-container {
        margin: 1rem;
    }

    .education-container {
        padding: 1rem 0;
    }

    .info-container {
        margin: 2rem 0;
    }
}

.hero-avatar {
    max-width: 500px;
    margin: auto;
}

.hireme-btn {
    width: 100%;
    margin: 2rem auto;
}

.hireme-btn button {
    padding: 0.5rem 1rem;
    background: #1fa298;
    border-color: #1fa298;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 1.5rem;
    cursor: pointer;
}

.contact-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: center;
    background-image: url('../../assets/contact.jpg');
    background-size: cover;
    padding: 2rem 0;
}

.contact-container h4 {
    color: #f4f4f4;
}

.contact-container form {
    width: 100%;
    margin: 0 5rem;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: center;
    gap: 2rem;
    max-width: 700px;
}

.contact-container input,
textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 0;
    background: rgba(20, 20, 20, 0.5);
    border: 1px solid rgba(250, 250, 250, 0.2);
    color: #eee;
    outline: none;
}

.contact-container button {
    border: 1px solid #1fa298;
    background: #1fa298;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #eee;
    padding: 10px;
    cursor: pointer;
    width: 100%;
}
</style>


