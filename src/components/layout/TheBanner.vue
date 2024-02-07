<template>
     <div class="container">
          <img src="@/assets/banner.jpg">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/EVrUrERwwD8?si=yrcuZPrksuS4bBiF"
               title="YouTube video player" frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowfullscreen></iframe>
     </div>
</template>

<style scoped>
.container {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 2rem;
}

img {
     width: 560px;
     height: 315px;
}
</style>