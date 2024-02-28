<template>
    <div class="container">
        <h2>Mentor Messages</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mentor Profile</th>
                <th>Created At</th>
                <th>Message</th>
            </tr>
            <colgroup>
                <col style="width:15%">
                <col style="width:15%">
                <col style="width:15%">
                <col style="width:15%">
                <col style="width:40%">
            </colgroup>
            <tbody>
                <tr v-for="message in messages" :key="message._id">
                    <td>
                        <p>{{ message.name }}</p>
                    </td>
                    <td>
                        <p>{{ message.email }}</p>
                    </td>
                    <td>
                        <p><router-link :to="`/profile/${message.profile}`">View Profile</router-link></p>
                    </td>
                    <td>
                        <p>{{ fomatDate(message.createdAt) }}</p>
                    </td>
                    <td>
                        <p>{{ message.message }}</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <paginate v-model="page" :page-count="pages" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'"
            :container-class="'paginate'">
        </paginate>
    </div>
</template>

<script>
import apiService from '@/app/apiService';
import { ref } from 'vue';
import Paginate from "vuejs-paginate-next";

export default {
    components: {
        Paginate
    },
    setup() {
        const limit = ref(15);
        const page = ref(1);
        const pages = ref(1);
        const messages = ref([]);

        const fetchMessages = async () => {
            try {
                const { data } = await apiService.get(`/api/message/get?limit=${limit.value}&page=${page.value}&type=mentor`);
                messages.value = data.messages;
                pages.value = data.pages;
            } catch (error) {
                console.log(error);
            }
        }

        const clickCallback = () => {
            fetchMessages();
        }
        const fomatDate = (date) => {
            const dua = new Date(date);
            return `${dua.getDay()}/${dua.getMonth()}/${dua.getFullYear()}`;
        }
        fetchMessages();
        return {
            messages,
            limit,
            page,
            pages,
            clickCallback,
            fomatDate
        }
    },
    compatConfig: { MODE: 3 }
}
</script>

<style >
.container {
    width: 100%;
    padding: 2rem;
}

table {
    table-layout: fixed;
    width: 100%;
    margin-top: 10px;
}

table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
}

p {
    width: 100%;
    word-break: break-all;
    overflow-wrap: "break-all";
}

.paginate {
    margin-top: 1rem;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 2px;
}

.paginate .page-link {
    padding: 5px;
    background-color: #1F9F96;
    color: #fff;
    width: 42px;
    cursor: pointer;
    display: block;
}

.page-item.active .page-link {
    cursor: not-allowed;
    background-color: #8c9190;
}
</style>
