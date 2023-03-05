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

    public static getRecordings(page: number, pageSize: number, sort: IRecordingSort, query: string | null = null,
                                classIds: number[] | null = null, subjectIds: number[] | null = null, topicIds: number[] | null = null,
                                visibilityFilter: RecordingVisibilityFilter | null = null): Promise<Response> {
        let urlParams = new URLSearchParams();

        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());
        urlParams.append("sort", sort.sortKey.toString());
        urlParams.append("direction", sort.sortOrder.toString());
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

    public static getRecording(id: number): Promise<Response> {
        return fetch(this.pathToUrl("recordings/"+id), {
            method: "GET",
            credentials: "include"
        });
    }

    public static getClasses(): Promise<Response> {
        return fetch(this.pathToUrl("classes"), {
            method: "GET",
            credentials: "include"
        });
    }

    public static getSubjects(): Promise<Response> {
        return fetch(this.pathToUrl("subjects"), {
            method: "GET",
            credentials: "include"
        });
    }

    public static getTopics(classId: number, subjectId: number): Promise<Response> {
        let urlParams = new URLSearchParams();

        urlParams.append("classId", classId.toString());
        urlParams.append("subjectId", subjectId.toString());

        return fetch(this.pathToUrl("topics", urlParams), {
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
    published: boolean
    notifications: number
    classId: number
    className: string
    subjectId: number
    subjectName: string
    uploadTimestamp: number
    recordingTimestamp: number
    sources: IMediaSource[]
    thumbnail: string
}

export interface IMediaSource {
    sourceUrl: string,
    mimeType: string
}

export interface IClass {
    classId: number,
    name: string
}

export interface ISubject {
    subjectId: number,
    name: string
}

export interface ITopic {
    topicId: number,
    name: string
}

export interface IRecordingSort {
    sortKey: RecordingSortKey,
    sortOrder: SortOrder
}

export enum RecordingVisibilityFilter {
    SHOW_ALL = "SHOW_ALL",
    SHOW_PRIVATE_ONLY = "SHOW_PRIVATE_ONLY",
    SHOW_PUBLIC_ONLY = "SHOW_PUBLIC_ONLY"
}

export enum RecordingSortKey {
    BY_RECORDING_DATE = "recordingDate"
}

export enum SortOrder {
    ASCENDING = "ASC",
    DESCENDING = "DESC"
}