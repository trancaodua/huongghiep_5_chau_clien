<template>
    <div class="container">
        <div class="card-wrapper">
            <div class="card" v-for="profile in profiles" :key="profile.id">
                <div class="img">
                    <img src="@/assets/logo.jpg" alt="{{profile.name}}" draggable="false">
                </div>
                <h5>{{ profile.field }} <span>({{ profile.country }})</span></h5>
                <span>{{ profile.name }} </span>
                <p>{{ profile.description }} </p>
                <button class="detail-btn"><i class="fas fa-eye"></i> View Profile</button>
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
        </div>
        <button class="more-btn"><i class="fa-solid fa-arrow-down"></i> Load More</button>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    setup() {
        const store = useStore();
        const profiles = computed(() => store.getters["profiles/profiles"]);

        return {
            profiles
        }
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 1rem;
}

.card-wrapper {
    max-width: 900px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    grid-template-rows: repeat(auto-fit, auto);
    gap: 2rem;
}

.card {
    border-radius: 0.5rem;
    /* border: 2px solid #e1e1e1; */
    box-shadow: 0.8rem 0.8rem 2rem #ddd, -0.8rem -0.8rem 2rem #eee;
    /* background-color: #eee; */
    padding: 0.8rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.2rem;
}

.card .img {
    background-color: #E2EEFF;
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card .img img {
    width: 6.8rem;
    height: 6.8rem;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #fff;
}

.card h5 {
    font-size: 1.2rem;
    font-family: "Poppins", sans-serif;
    color: #222F5A;
    margin: 0px;
}

.card span {
    font-size: 1rem;
    color: rgb(86, 88, 114);
    font-family: "Rubik", sans-serif
}

.card p {
    color: rgb(86, 88, 114);
    font-size: 0.8rem;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-style: italic;
}

.detail-btn {
    background: #1F9F96;
    border: none;
    height: 2rem;
    width: 8rem;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
    margin: 1rem 0;
    cursor: pointer;
}

.more-btn {
    background: #1F9F96;
    border: none;
    height: 2rem;
    width: 8rem;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 2rem;
    margin-top: 1rem;
    cursor: pointer;
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

@media screen and (max-width: 600px) {
    .card-wrapper {
        grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    .card-wrapper {
        gap: 1rem;
    }
}
</style>
