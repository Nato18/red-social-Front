<template>
    <headerApp></headerApp>
    <publication></publication>
</template>
<script>
import headerApp from './layouts/header.vue';
import Publication from './layouts/publication.vue';

export default{
    components: {
        headerApp,
        Publication
    }
}
</script>