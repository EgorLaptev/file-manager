import BaseModel from "@/models/BaseModel";

export default class ExplorerModel {

    static imgMimes = ['png', 'jpeg', 'jpg', 'bmp', 'svg', 'webp', 'ico']

    static async readDir(path) {
        const data = await BaseModel.fetchData('readdir', 'POST', { path }).then(data => JSON.parse(data));
        return data.sort(file => file.type !== 'd') // folders first
    }
    static rename(path, renameTo) {
        BaseModel.fetchData('rename', 'POST', { path, renameTo })
    }
    static remove(path) {
        BaseModel.fetchData('remove', 'POST', { path })
    }
    static move(path, moveTo) {
        console.log(path, moveTo)
        BaseModel.fetchData('move', 'POST', { path, moveTo })
    }
    static archive(path, compressTo) {
        BaseModel.fetchData('archive', 'POST', { path, compressTo })
    }
    static unarchive(path, extTo) {
        BaseModel.fetchData('archive', 'POST', { path, extTo })
    }
    static upload(path, upload) {
        BaseModel.fetchData('upload', 'POST', { path, upload })
    }
    static download(path) {
        BaseModel.fetchData('download', 'POST', { path })
            .then(resp => console.log(resp));
    }
    static makeFile(path) {
        BaseModel.fetchData('mkfile', 'POST', { path })
    }
    static makeDir(path) {
        BaseModel.fetchData('mkdir', 'POST', { path })
    }
    static copy(path, copyTo) {
        BaseModel.fetchData('copy', 'POST', { path, copyTo })
    }
}