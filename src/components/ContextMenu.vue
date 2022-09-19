<template>
    <Transition>
        <div class="context">
            <button class="context__button danger" @click="remove"> Удалить </button>
            <button v-show="file.type==='f'" class="context__button" @click="download"> Скачать </button>
            <button class="context__button" @click="archive"> Архивировать </button>
            <button v-show="file.type==='a' || ['gz', 'tar', 'zip', 'rar', '7zip', '7z'].includes(file.ext)" class="context__button" @click="unarchive"> Разархивировать </button>
            <input class="context__button" placeholder="Добавить папку" @keydown.enter="makeDir">
            <input class="context__button" placeholder="Добавить файл" @keydown.enter="makeFile">
            <input class="context__button" placeholder="Переместить &rightleftharpoons;" @keydown.enter="move">
        </div>
    </Transition>
</template>

<script>
import ExplorerModel from "@/models/ExplorerModel";

export default {
    name: "ContextMenu",
    props: ['file', 'closeMenu', 'readDir'],
    methods: {
        remove(e) {
            document.querySelector(`div[data-path='${this.file.path}']`).remove();
            ExplorerModel.remove(this.file.path);
            this.closeMenu();
        },
        async download() { },
        archive() {
            ExplorerModel.archive(this.file.path, this.file.path+'.zip')
            this.readDir();
            this.closeMenu();
        },
        unarchive() {
            ExplorerModel.unarchive(this.file.path, this.file.path.split('/').slice(0,-1).join('/'));
            this.readDir();
            this.closeMenu();
        },
        move(e) {
            ExplorerModel.move(this.file.path, this.file.path.split('/').slice(0, -1).join('/') + '/' + e.target.value + '/' + this.file.name)
            this.readDir();
            e.target.value = null
            this.closeMenu();
        },
        makeDir(e) {
            ExplorerModel.makeDir(this.file.path.split('/').slice(0,-1).join('/')+'/'+e.target.value);
            e.target.value = null;
            this.readDir();
            this.closeMenu();
        },
        makeFile(e) {
            ExplorerModel.makeFile(this.file.path.split('/').slice(0,-1).join('/')+'/'+e.target.value);
            e.target.value = null;
            this.readDir();
            this.closeMenu();
        }
    }
}
</script>

<style scoped>

.v-enter-active,
.v-leave-active {
    transition: all .2s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(95%) !important;
    opacity: 0;
}

.context {
    position: absolute;
    bottom: 0;
    transform: translateY(105%);
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
    height: 40px;
    text-align: center;
    outline: none;
    font-size: 16px;
}

.context__button:focus::placeholder {
    color: blue;
    opacity: 0;
}

.context__button:hover {
    background-color: #f0f0f0;
}

.context__button.danger {
    color: red
}
.context__button.danger:hover {
    background-color: #fdeded;
}

</style>