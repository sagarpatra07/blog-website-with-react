import config from '../config/config';
import { Client, Storage, ID } from "appwrite";

export class StorageService {
    client = new Client();
    storage;

    constructor(){
        if (config.appWriteUrl && config.appWriteProjectId) {
            this.client
                .setEndpoint(config.appWriteUrl)
                .setProject(config.appWriteProjectId);
        }
        this.storage = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            if (!config.appWriteBucketId) return false;
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {   
            if (!config.appWriteBucketId || !fileId) return false;
            await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Error :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        if (!fileId) return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
        if (typeof fileId === "string" && (fileId.startsWith("http://") || fileId.startsWith("https://"))) {
            return fileId;
        }
        try {
            if (!config.appWriteBucketId) return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
            return this.storage.getFilePreview(
                config.appWriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite Error :: filePreview :: error", error);
            return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
        }
    }
}

const storageService = new StorageService();
export default storageService;
