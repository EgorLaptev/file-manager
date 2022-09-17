<template>
    <div class="item" :data-path="file.path" :data-name="file.name" @contextmenu.prevent="showMenu = true">
        <img v-if="file.type === 'd'" src="../assets/images/folder.svg" alt="Папка" class="item__image" @click="readDir(file.path)">
        <img v-else src="../assets/images/file.svg" alt="Файл" class="item__image">
        <input class="item__name" v-model="file.name" @change="rename">
        <ContextMenu :file="file" v-show="showMenu" :readDir="readDir" :closeMenu="closeMenu"/>
        <div class="context-wrap" @click="showMenu=false" @contextmenu="showMenu=false" v-show="showMenu"/>
    </div>
</template>

<script>
import ExplorerModel from "@/models/ExplorerModel";
import ContextMenu from "@/components/ContextMenu";

export default {
    data() {
        return {
            showMenu: false
        }
    },
    name: "FileItem",
    components: {ContextMenu},
    props: ['file', 'readDir'],
    methods: {
        closeMenu() {
            this.showMenu = false;
        },
        rename() {
            const renameTo = this.file.path.split('/').slice(0, -1).join('/') + '/' + this.file.name
            ExplorerModel.rename(this.file.path, renameTo)
            this.file.path = renameTo;
        }
    }
}
</script>

<style scoped>

.context-wrap {
    position: fixed;
    inset: 0;
    cursor: default;
    z-index: 100;
}

.item {
    position: relative;
    border-radius: 8px;
    padding: 8px;
    width: 120px;
    height: 120px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}

.item__active,
.item:hover {
    background: #ededed;
}

.item__image {
    margin-bottom: 16px;
}

.item__name {
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;
    color: #858585;
    border: none;
    outline: none;
    text-align: center;
    background: transparent;
    white-space: nowrap;
}

</style>