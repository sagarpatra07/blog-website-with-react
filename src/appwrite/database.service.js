import config from '../config/config';
import { Client, ID, TablesDB, Query } from 'appwrite';

export class DatabaseService{
    client = new Client();
    database;

    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.database = new TablesDB(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            await this.database.createRow(
                config.appWriteDatabaseId,
                config.appWriteTableId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){ // slug is the specific row id
        try {
            return await this.database.updateRow(
                config.appWriteDatabaseId,
                config.appWriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: updatePost :: error", error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteRow(
                config.appWriteDbId,
                config.appWriteTableId,
                slug
            )
            return true; //handle in frontend
        } catch (error) {
            console.log("Appwrite Error :: deletePost :: error", error);
            return false;
        }
    }

    //get a single post with unique id
    async getPost(slug){
        try {
            return await this.database.getRow(
                config.appWriteDbId,
                config.appWriteTableId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Erroe :: getPost :: error", error);
            return false;
        }
    }

    //get all posts which are in active status
    async getAllPost(){
        try {
            return await this.database.listRows(
                config.appWriteDbId,
                config.appWriteTableId,
                [
                    Query.equal('status', ['active'])
                ]
            )
        } catch (error) {
            console.log("Appwrite Error :: getAllPost :: error", error);
            return false;
        }
    }


}

const dbService = new DatabaseService();
export default dbService;