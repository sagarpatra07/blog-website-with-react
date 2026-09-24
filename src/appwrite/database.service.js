import config from '../config/config';
import { Client, ID, Databases, Query } from 'appwrite';

export class DatabaseService {
    client = new Client();
    databases;

    constructor(){
        if (config.appWriteUrl && config.appWriteProjectId) {
            this.client
                .setEndpoint(config.appWriteUrl)
                .setProject(config.appWriteProjectId);
        }
        this.databases = new Databases(this.client);
    }

    normalizeDocument(doc) {
        if (!doc) return doc;
        return {
            ...doc,
            featuredImage: doc.featuredImage || doc.featuredimage || "",
            userId: doc.userId || doc.userid || ""
        };
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const documentId = slug ? slug.substring(0, 36) : ID.unique();
            const res = await this.databases.createDocument(
                config.appWriteDbId,
                config.appWriteTableId,
                documentId,
                {
                    title,
                    content,
                    featuredimage: featuredImage || "",
                    status: status || "active",
                    userid: userId || "user-1"
                }
            );
            return this.normalizeDocument(res);
        } catch (error) {
            console.log("Appwrite Error :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            const res = await this.databases.updateDocument(
                config.appWriteDbId,
                config.appWriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredImage || "",
                    status: status || "active",
                }
            );
            return this.normalizeDocument(res);
        } catch (error) {
            console.log("Appwrite Error :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDbId,
                config.appWriteTableId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite Error :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            if (!config.appWriteDbId || !config.appWriteTableId) return false;
            const res = await this.databases.getDocument(
                config.appWriteDbId,
                config.appWriteTableId,
                slug
            );
            return this.normalizeDocument(res);
        } catch (error) {
            console.log("Appwrite Error :: getPost :: error", error);
            return false;
        }
    }

    async getAllPost(queries = [Query.equal('status', 'active')]){
        try {
            if (!config.appWriteDbId || !config.appWriteTableId) return false;
            const res = await this.databases.listDocuments(
                config.appWriteDbId,
                config.appWriteTableId,
                queries
            );
            if (res && res.documents) {
                res.documents = res.documents.map(doc => this.normalizeDocument(doc));
            }
            return res;
        } catch (error) {
            console.log("Appwrite Error :: getAllPost :: error", error);
            return false;
        }
    }
}

const dbService = new DatabaseService();
export default dbService;