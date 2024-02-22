<template>
    <div class="control-form">
        <label>Certificate</label>
        <label class="upload-image">
            <input type="file" name="image" accept="image/*" hidden @change="handleImage" />

            Click to uplad Image
            <i class="fa-solid fa-upload"></i>
        </label>
        <div class="image-container">
            <div class="preview-container" :key="index" v-for="(certificate, index) in certificateInput.value">
                <img class="preview-image" :src="certificate">
                <button class="remote-btn" @click="handleRemove(certificate)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    props: ['handleImage', 'certificateInput', 'handleRemove'],
    setup() {

    },
}
</script>

<style scoped>
.control-form label {
    font-family: "Rubik", sans-serif;
    font-weight: normal;
    font-style: normal;
    color: #565872;
    font-size: 1.2em;
    line-height: 1.8rem;
}

.control-form .upload-image {
    font-size: 1rem;
    font-style: italic;
    color: #1F9F96;
    cursor: pointer;
}

.image-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
}

.preview-container {
    position: relative;
}

.preview-image {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    object-position: center;
}

.remote-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #1F9F96;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
}
</style>

