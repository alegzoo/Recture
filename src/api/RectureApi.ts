export class RectureApi {

    private static BASE_API_URL: string = "http://recture.study:81/";

    public static signIn(email: string, password: string): Promise<Response> {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        return fetch(this.pathToUrl("auth/signin"), {
            method: "POST",
            credentials: "include",
            body: formData
        });
    }

    public static signOut(): Promise<Response> {
        return fetch(this.pathToUrl("auth/signout"), {
            method: "POST",
            credentials: "include"
        });
    }

    public static getAccountInfo(): Promise<Response> {
        return fetch(this.pathToUrl("account"), {
            method: "GET",
            credentials: "include"
        });
    }

    private static pathToUrl(path: string): string {
        return RectureApi.BASE_API_URL + path;
    }

}

export interface IAccount {
    userId: number
    email: string
    userType: string
    emailConfirmed: boolean
    firstName: string
    lastName: string
    bio: string
}