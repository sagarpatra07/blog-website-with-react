import config from '../config/config';
import { Client, Storage, ID } from "appwrite";

const DUMMY_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";

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
        if (!fileId || typeof fileId !== "string" || fileId.trim() === "") {
            return DUMMY_IMAGE;
        }
        const trimmed = fileId.trim();
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
            return trimmed;
        }
        try {
            if (!config.appWriteBucketId) return DUMMY_IMAGE;
            const previewUrl = this.storage.getFilePreview(
                config.appWriteBucketId,
                trimmed
            );
            return previewUrl || DUMMY_IMAGE;
        } catch (error) {
            console.log("Appwrite Error :: filePreview :: error", error);
            return DUMMY_IMAGE;
        }
    }
}

const storageService = new StorageService();
export default storageService;
