<script setup lang="ts">

const props = defineProps<{
    img: string | {
        mob: {
            default: string,
            webp: string
        },
        pc: {
            default: string,
            webp: string
        },
        alt: "string",
        noLazy?: boolean
    }
}>()
</script>

<template>

    <picture v-if="typeof img != 'string'">
        <source :srcset="img.mob.webp" media="(max-width: 479px)" type="image/webp" />
        <source :srcset="img.mob.default" media="(max-width: 479px)" />
        <source :srcset="img.pc.webp" type="image/webp" />
        <img :src="img.pc.default" alt="" v-if="img.noLazy" />
        <img :src="img.pc.default" alt="" v-else loading="lazy" />
    </picture>
    <img :src="img" alt="" v-else loading="lazy">
</template>
<style scoped>
@import "./style.scss"
</style>
