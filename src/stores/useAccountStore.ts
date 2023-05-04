import { IAccount, RectureApi } from "@/api/RectureApi";
import { defineStore } from "pinia"

export interface IAccountStore {
    userId: number | null
    email: string | null
    userType: string | null
    emailConfirmed: boolean | null
    firstName: string | null
    lastName: string | null
    bio: string | null
    organization: string | null
    avatar: string | null
}

export const useAccountStore = defineStore("accountStore", {
    state: () : IAccountStore => ({
        userId: null as number | null,
        email: null as string | null,
        userType: null  as string | null,
        emailConfirmed: null as boolean | null,
        firstName: null  as string | null,
        lastName: null  as string | null,
        bio: null as string | null,
        organization: null as string | null,
        avatar: null as string | null
    }),
    getters: {
        fullName: state => (state.firstName != null && state.lastName != null) ? (state.firstName+" "+state.lastName) : null
    },
    actions: {
        loadData(account: IAccount) {
            this.userId = account.userId;
            this.email = account.email;
            this.userType = account.userType;
            this.emailConfirmed = account.emailConfirmed;
            this.firstName = account.firstName;
            this.lastName = account.lastName;
            this.bio = account.bio;
            this.organization = account.organization;
            this.avatar = account.avatar;
        },
        fetchData() {
            RectureApi.getAccountInfo().then((response) => {
                if (response.success && response.data != null) {
                    this.loadData(response.data);
                }
            }).catch(reason => {
                //TODO: Maybe log error
            });
        }
    }
});