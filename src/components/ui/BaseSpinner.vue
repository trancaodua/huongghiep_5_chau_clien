<template>
  <div class="spinner">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.spinner {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.loader {
  width: 2.5rem;
  height: 2.5rem;
  border: 0.4rem solid #1F9F96;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>