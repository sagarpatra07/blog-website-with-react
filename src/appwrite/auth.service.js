import config from '../config/config';
import { Client, ID, Account } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl) //Appwrite endpoint
            .setProject(config.appWriteProjectId); //Project ID

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
           const userAccount =  await this.account.create(ID.unique, email, password, name);

           if(userAccount){
            //call another method on successful creation
            this.login({email, password});
           } else {
            return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

}

const authService = new AuthService(); //creating an instance of the AuthService class

export default authService; //exporting the instance of the AuthService class so that can be used directly in other files