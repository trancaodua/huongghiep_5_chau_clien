<template>
    <div class="container">
        <div class="card-wrapper">
            <div class="card" :class="{ disable: !profile.enable }" v-for="profile in profiles" :key="profile.id">
                <div class="img">
                    <img :src="profile.avatar" :alt="profile.name" draggable="false">
                </div>
                <h5 v-if="profile.fields">{{ profile.fields.join(', ') }} <span v-if="profile.countries">({{
                    profile.countries.join(', ') }})</span></h5>
                <span>{{ profile.name }} </span>
                <p>{{ profile.description }} </p>
                <router-link :to="`/profile/${profile._id}`" class="detail-btn"><i class="fas fa-eye"></i> View
                    Profile</router-link>
                <router-link v-if="isAdmin" :to="`/admin/profile/${profile._id}`" class="detail-btn"
                    style="margin-top: 0;"><i class="fa-solid fa-pen"></i> Edit
                    Profile</router-link>
                <ul class="social-container">
                    <li v-if="profile.facebook">
                        <a :href="profile.facebook" target="blank"><i class="fa-brands fa-facebook"></i></a>
                    </li>
                    <li v-if="profile.instagram">
                        <a :href="profile.instagram" target="blank"><i class="fa-brands fa-instagram"></i></a>
                    </li>
                    <li v-if="profile.skype">
                        <a :href="profile.skype" target="blank"> <i class="fa-brands fa-skype"></i></a>
                    </li>
                    <li v-if="profile.twitter">
                        <a :href="profile.twitter" target="blank"> <i class="fa-brands fa-twitter"></i></a>
                    </li>
                </ul>
            </div>
        </div>
        <button v-if="isShowLoadMore" @click="handleLoadMore" class="more-btn"><i class="fa-solid fa-arrow-down"></i> Load
            More</button>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const store = useStore();
        const profiles = computed(() => store.getters["profiles/profiles"]);
        const route = useRoute();

        const handleLoadMore = async () => {
            store.commit('profiles/setCurrentPage', store.getters['profiles/currentPage'] + 1);
            try {
                store.commit('setLoading', true);
                store.dispatch('profiles/get', { isAdmin: route.name.includes('admin') });
            }
            finally {
                store.commit('setLoading', false);
            }
        }

        const isShowLoadMore = computed(() => {
            return store.getters['profiles/currentPage'] < store.getters['profiles/pages'];
        })

        const isAdmin = computed(() => store.getters['isAdmin']);

        const fetchProfile = async () => {
            store.commit('profiles/resetProfile', null);
            await store.dispatch('profiles/get', { isAdmin: route.name.includes('admin') });
        }

        fetchProfile();

        return {
            profiles,
            handleLoadMore,
            isShowLoadMore,
            isAdmin
        }
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 1rem;
    margin-bottom: 5rem;
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
    box-shadow: 0.8rem 0.8rem 2rem #ddd, -0.8rem -0.8rem 2rem #eee;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.2rem;
}

.card.disable {
    background-color: #d1caca;
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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
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
