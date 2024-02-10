<template>
    <footer>
        <div class="copyring-contaner">
            <div class="logo"><router-link :to="{ name: 'home' }"><img src="@/assets/logo.jpg"></router-link></div>
            <p>Create professional-looking resumes and easy to use in a fraction of the time. The greatest online resume
                builder can provide you a significant advantage in the job market.</p>
        </div>
        <div class="menu-container">2</div>
        <div class="contact-contianer">3</div>
    </footer>
</template>
<style scoped>
footer {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1 auto;
    background-color: #F8F9FE;
    padding:5rem;
}

.copyring-contaner .logo{
    width:10rem;
}

.logo img{
width: 100%;
}

</style>