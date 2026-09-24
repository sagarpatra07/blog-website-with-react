import config from '../config/config';
import { Client, ID, Account } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (config.appWriteUrl && config.appWriteProjectId) {
            this.client
                .setEndpoint(config.appWriteUrl)
                .setProject(config.appWriteProjectId);
        }
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return await this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({email, password}){
        try {
            // Delete existing session if any to avoid session collision
            try {
                await this.account.deleteSession('current');
            } catch (e) {
                // Ignore if no active session
            }
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
            return false;
        }
    }

    async getCurrentUser(){
        try {
            if (!config.appWriteUrl || !config.appWriteProjectId) {
                return null;
            }
            return await this.account.get();
        } catch (error) {
            // 401 error is expected for guests without an active session
            return null;
        }
    }
}

const authService = new AuthService();
export default authService;