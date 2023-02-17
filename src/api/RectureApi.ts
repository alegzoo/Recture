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

    public static getRecordings(page: number, pageSize: number, sort: RecordingSort, sortDirection: SortOrder, query: string | null = null,
                                classIds: number[] | null = null, subjectIds: number[] | null = null, topicIds: number[] | null = null,
                                visibilityFilter: RecordingVisibilityFilter | null = null): Promise<Response> {
        let urlParams = new URLSearchParams();

        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());
        urlParams.append("sort", sort.toString());
        urlParams.append("direction", sortDirection.toString());
        if (query != null) urlParams.append("query", query as string);
        if (classIds != null) urlParams.append("classIds", (classIds as number[])?.join(","));
        if (subjectIds != null) urlParams.append("subjectIds", (subjectIds as number[])?.join(","));
        if (topicIds != null) urlParams.append("topicIds", (topicIds as number[])?.join(","));
        if (visibilityFilter != null) urlParams.append("visibilityFilter", visibilityFilter);

        return fetch(this.pathToUrl("recordings", urlParams), {
            method: "GET",
            credentials: "include"
        });
    }

    private static pathToUrl(path: string, params: URLSearchParams | null = null): string {
        let url = RectureApi.BASE_API_URL + path;
        if (params != null) url += "?" + params;
        return url;
    }

}

export interface IAccount {
    userId: number
    email: string
    userType: string
    emailConfirmed: boolean
    firstName: string
    lastName: string
    bio: string | null
}

export interface IRecording {
    recordingId: number
    title: string
    description: string | null
    notifications: number
    classId: number
    className: string
    subjectId: number
    subjectName: string
    uploadTimestamp: number
    recordingTimestamp: number
    sources: string[]
    thumbnail: string
}

export interface IRecordingSearchParams {
    page: number,
    size: number,
    sort: RecordingSort,
    direction: number,
    query: string,
    
}

export enum RecordingVisibilityFilter {
    SHOW_ALL = "SHOW_ALL",
    SHOW_PRIVATE_ONLY = "SHOW_PRIVATE_ONLY",
    SHOW_PUBLIC_ONLY = "SHOW_PUBLIC_ONLY"
}

export enum RecordingSort {
    BY_RECORDING_DATE = "recordingDate"
}

export enum SortOrder {
    ASCENDING = "ASC",
    DESCENDING = "DESC"
}