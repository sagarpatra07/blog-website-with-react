import config from '../config/config';
import { Client, Storage, ID } from "appwrite";

export class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.storage = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {   
            return await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Error :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        try {
            await this.storage.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: filePreview :: error, erroe");
        }
    }
}

const storageService = new StorageService();
export default storageService;
