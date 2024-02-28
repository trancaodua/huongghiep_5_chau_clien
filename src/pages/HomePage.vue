<template>
    <the-slider></the-slider>
    <h4><i class="fa-solid fa-quote-left"></i> Hire a ProVA for any skill you need. Take a look at some of the virtual
        worker who possess incredible skills,
        abilities and experiences. <i class="fa-solid fa-quote-right"></i></h4>
    <!-- <div>
        <hr class="divider-section">
    </div> -->
    <h5 class="span">Our Menter</h5>
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

<style scoped>
h4 {
    text-align: center;
    color: #1F9F96;
    font-weight: 700;
    padding-left: 25px;
    padding-right: 25px;
    margin: 2rem auto;
    font-size: 1.2rem;
    line-height: 2rem;
    max-width: 500px;
    font-family: "Poppins", sans-serif;
}

h5 {
    text-align: center;
    color: #1F9F96;
    font-weight: 700;
    padding-left: 25px;
    padding-right: 25px;
    margin: 0.5rem auto;
    margin-top: 4rem;
    font-size: 1.2rem;
    line-height: 2rem;
    max-width: 500px;
    font-family: "Poppins", sans-serif;
}


.divider-section {
    height: 3px;
    background-color: #1F9F96;
    width: 50em;
    margin: 0 auto;
    background-image: -webkit-linear-gradient(left, white 2%, #1F9F96 50%, white 98%);
    border-top: 1px solid rgba(0, 0, 0, .1);
    overflow: visible;
}
</style>