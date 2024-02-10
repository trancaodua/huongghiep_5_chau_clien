<template>
    <the-slider></the-slider>
    <the-search></the-search>
    <the-profiles></the-profiles>
</template>
<script>
import TheSlider from '@/components/layout/TheSilder.vue';
import TheSearch from '@/components/layout/TheSearch.vue';
import TheProfiles from '@/components/layout/TheProfiles.vue';

export default {
    components: {
        TheSlider,
        TheSearch,
        TheProfiles
    }
}
</script>