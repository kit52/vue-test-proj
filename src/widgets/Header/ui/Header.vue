<script setup lang="ts">

import { LogoBlue } from '@/shared/assets/images/icons';
import data from '@/shared/data/dataBase.json'
import { RoutePath } from '@/shared/router';
</script>

<template>

    <header class="header container">
        <nav>
            <a href="/">
                <LogoBlue />
            </a>
            <div class="buttons">
                <div class="links">
                    <a href="https://test.poznanium.ru/player/index.html">Приступить к занятиям</a>
                    <a href="/about">О нас</a>
                    <a :href="RoutePath.login">Магазин</a>
                    <a :href="RoutePath.login">Корзина</a>
                </div>
            </div>
        </nav>
    </header>
</template>
<style scoped>
@import "./style.scss"
</style>
