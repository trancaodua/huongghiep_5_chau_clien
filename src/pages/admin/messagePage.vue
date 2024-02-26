<template>
    <div style="width:100%">
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
            </tr>
            <colgroup>
                <col style="width:20%">
                <col style="width:20%">
                <col style="width:60%">
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
                        <p>{{ message.message }}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import apiService from '@/app/apiService';
import { ref } from 'vue';

export default {
    setup() {
        const limit = ref(15);
        const page = ref(1);
        const messages = ref([]);

        const fetchMessages = async () => {
            try {
                const { data } = await apiService.get(`/api/message/get?limit=${limit.value}&page=${page.value}`);
                messages.value = data.messages;
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
        return {
            messages,
            limit,
            page,
        }
    },
    compatConfig: { MODE: 3 }
}
</script>

<style >
table {
    table-layout: fixed;
    width: 100%;
}

table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
}

p {
    width: 100%;
    word-break:break-all;
    overflow-wrap: "break-all";
}
</style>
