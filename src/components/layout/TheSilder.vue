<template>
    <div id="slider" class="slider">
        <div class="control-container">
            <div class="wrapper" ref="wrapperEl">
                <div class="items" ref="itemsEl" :style="{ 'transform': transform }">
                    <div class="slide"> <img src="@/assets/banner.jpg"></div>
                    <div class="slide video-container">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/EVrUrERwwD8?si=2m_s0RKrd1Tmd4Iw"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <a @click="slidePrev" class="control prev fa-solid fa-angle-left"></a>
            <a @click="slideNext" class="control next fa-solid fa-angle-right"></a>
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
export default {
    setup() {
        const itemsEl = ref(null);
        const wrapperEl = ref(null);
        const sliderIndex = ref(0);
        const sliderWidth = ref(0);
        const interVal = ref(null);

        onMounted(() => {

            if (wrapperEl.value) {
                sliderWidth.value = wrapperEl.value.offsetWidth;
            }

            interVal.value = setInterval(() => {
                slide(++sliderIndex.value);
            }, 4000);

        })

        onUnmounted(() => {
            clearInterval(interVal.value);
        })

        const transform = computed(function () {
            return `translateX(-${sliderWidth.value * sliderIndex.value}px)`;
        })

        const slide = (index) => {

            sliderIndex.value = index;
            if (sliderIndex.value < 0) {
                sliderIndex.value = 1;
            } else if (sliderIndex.value > 1) {
                sliderIndex.value = 0;
            }
        }
        const slideNext = () => {
            clearInterval(interVal.value);
            slide(++sliderIndex.value);
            interVal.value = setInterval(() => {
                slide(++sliderIndex.value);
            }, 4000);
        }

        const slidePrev = () => {
            clearInterval(interVal.value);
            slide(--sliderIndex.value);
            interVal.value = setInterval(() => {
                slide(++sliderIndex.value);
            }, 4000);
        }

        window.addEventListener('resize', () => {
            if (wrapperEl.value) {
                sliderWidth.value = wrapperEl.value.offsetWidth;
            }
        });

        return {
            itemsEl,
            wrapperEl,
            transform,
            sliderIndex,
            slideNext,
            slidePrev,
            sliderWidth,
            slide,
            interVal
        }
    },
    mounted() {

    }
}
</script>
<style scoped>
.slider {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    position: relative;
}

.control-container {
    width: 100%;
    max-width: 1100px;
    position: relative;
}

.wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    box-shadow: 0.8rem 0.8rem 2rem #ddd, -0.8rem -0.8rem 2rem #eee;
}

.items {
    /* display: flex; */
    display: grid;
    width: 200%;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    /* transform: translateX(-300px); */
    transition: transform 0.5s ease-in-out;
}

.slide {
    display: block;
    width: 100%;
    height: auto;
    flex-shrink: 0;
}

.slide img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
}

.control {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #1F9F96;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    z-index: 10;
    cursor: pointer;
}

.control.prev {
    left: 0;
    transform: translateY(-50%) translateX(-50%);
}

.control.next {
    right: 0;
    transform: translateY(-50%) translateX(50%);
}

.no-transition {
    transition: none;
}

.video-container {
    position: relative;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>