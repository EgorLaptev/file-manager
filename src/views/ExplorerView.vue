<template>
    <section class="explorer" @dragover="onUpload"  @dragend="offUpload" @dragleave="offUpload" @contextmenu="">
        <input type="file" @change="uploadFile" class="fileInput" :class="{'fileInput_active': uploadAvailable}" v-show="uploadAvailable">
        <div class="explorer__container container">
            <input class="explorer__breadcrumbs" v-model="path" @change="readDir">
            <section class="explorer__grid">
                <FileItem :file="{name: '..', type: 'd', path: path.split('/').slice(0, -1).join('/')}" :readDir="readDir"/>
                <FileItem v-for="file in files" :file="file" :readDir="readDir"/>
            </section>
        </div>
    </section>
 </template>

<script>

import FileItem from "@/components/FileItem";
import ContextMenu from "@/components/ContextMenu";
import ExplorerModel from "@/models/ExplorerModel";

export default {
    data() {
        return {
            uploadAvailable: false,
            path: 'C:/openserver/domains/file-manager',
            files: [],
            contextMenu: {
                isFile: false,
                show: false,
                x: 0,
                y: 0,
                file: { path: null, name: null }
            }
        }
    },
    name: "ExplorerView",
    components: {ContextMenu, FileItem},
    mounted() {
        this.readDir()
    },
    methods: {
        async readDir(path = this.path) {
            if (path === '') return false;
            this.path = typeof path === 'string' ? path : this.path ;
            this.files = await ExplorerModel.readDir(this.path);
        },
        uploadFile(e) {
            BaseModel.fetchData('upload', 'POST', { path: 'C:/openserver/domains/file-manager', upload: e.target.files[0] })
                .then(resp => console.log(resp))
            this.uploadAvailable = false;
        },
        openContextMenu(e) {
            this.contextMenu.isFile = e.target.className.startsWith('item')
            this.contextMenu.show = true;
            this.contextMenu.x = e.clientX;
            this.contextMenu.y = e.clientY;
            this.contextMenu.file.path = e.currentTarget.dataset.path ?? this.path
            this.contextMenu.file.name = e.currentTarget.dataset.name ?? this.contextMenu.file.name
            console.log(this.contextMenu.file.name);
        },
        closeContextMenu() { this.contextMenu.show = false },
        onUpload() { this.uploadAvailable = true },
        offUpload() { this.uploadAvailable = false }
    }
}
</script>

<style>



.fileInput {
    background: blue;
    left: 0;
    width: 100%;
    opacity: 0;
    height: 100%;
    position: fixed;
}

.fileInput_active {
    opacity: .1;
}

.explorer {
    height: 100%;
}

.explorer__container {
    padding-top: 80px !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.container {
    height: 100%;
    width: 100%;
    max-width: 1400px;
    padding: 16px;
    margin: 0 auto;
}

.explorer__breadcrumbs {
    font-size: 16px;
    width: 100%;
    border: none;
    outline: none
}

.explorer__grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    grid-gap: 16px;
    padding: 32px 0 8px 0;
}

@media screen and (max-width: 1000px) {
    .explorer__container {
        width: auto;
    }
}


</style>