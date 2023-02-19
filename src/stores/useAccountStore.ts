import { IAccount, RectureApi } from "@/api/RectureApi";
import { defineStore } from "pinia"

export const useAccountStore = defineStore("accountStore", {
    state: () => ({
        userId: null as number | null,
        email: null as string | null,
        userType: null  as string | null,
        emailConfirmed: null as boolean | null,
        firstName: null  as string | null,
        lastName: null  as string | null,
        bio: null as string | null
    }),
    actions: {
        loadData(account: IAccount) {
            this.userId = account.userId;
            this.email = account.email;
            this.userType = account.userType;
            this.emailConfirmed = account.emailConfirmed;
            this.firstName = account.firstName;
            this.lastName = account.lastName;
            this.bio = account.bio;
        },
        fetchData() {
            RectureApi.getAccountInfo().then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        this.loadData(data as IAccount);
                    });
                }
            });
        }
    }
});