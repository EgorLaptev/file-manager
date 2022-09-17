<template>
    <div class="context">
        <button class="context__button" @click="makeDir"> Добавить папку </button>
    </div>
</template>

<script>
import ExplorerModel from "@/models/ExplorerModel";

export default {
    name: "ContextMenu",
    props: ['file', 'closeContextMenu'],
    methods: {
        makeDir() {
            ExplorerModel.makeDir(this.file.path+'/new folder')
        }
    }
}
</script>

<style scoped>

.context {
    position: absolute;
    bottom: -130px;
    left: -20px;
    width: 160px;
    background: #f8f8f8;
    overflow: hidden;
    border-radius: 8px;
    z-index: 1000;
}

.context__button {
    background: transparent;
    border: none;
    width: 100%;
    color: blue;
    border-radius: 0;
}

.context__button:hover {
    background-color: #f0f0f0;
}

.context__button.danger {
    color: red
}

</style>