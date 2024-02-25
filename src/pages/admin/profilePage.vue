<template>
    <h5 class="span">Profiles</h5>
    <the-search></the-search>
    <the-profiles></the-profiles>
</template>
<script>
import TheSearch from '@/components/layout/TheSearch.vue';
import TheProfiles from '@/components/layout/TheProfiles.vue';

export default {
    components: {
        TheSearch,
        TheProfiles
    },
    setup() {

    },
}
</script>
