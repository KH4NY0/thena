import config from '@/conf/config';
import {Client, Account, ID} from 'appwrite';

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

const appwriteClient = new Client()

appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient)

export class AppWriteServices {
    // create a new record of a user
    async createUserAccount({email, password, name}: CreateUserAccount) {
            try {
                const userAccount = await account.create(ID.unique(), email, password, name)
                if (userAccount) {
                    return this.login({email, password})
                } else {
                    return userAccount
                }
        } catch (error:any) {
                throw error
        }
    }

    async login({email, password}: LoginUserAccount) {
        try {
            return await account.createEmailPasswordSession(email, password)
        } catch (error:any) {
            throw error
        }
    }

    async isLoggedIn(): Promise<boolean> {

        try {
           const data =  await this.getCurrentUser();
           return Boolean(data)
        } catch (error) {}
        return false
    }

    async getCurrentUser() {
        try {

        } catch (error) {
            console.log("getcurrentUser error: ", error)
        }

    }

    async logout() {

    }


}

const appwriteService = new AppWriteServices()

export default appwriteService


