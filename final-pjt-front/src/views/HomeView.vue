<template>
    <div id="carousel" class="carousel slide">
        <div class="carousel-inner">
            <div class="orange carousel-item active">
                1
            </div>
            <div class="brown carousel-item">
                1
            </div>
            <div class="congobrown carousel-item ">
                1
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.carousel {
    height: 600px;
}
.carousel-inner {
    height: 100%;
}
.carousel-item {
    height: 100%;
}
</style>