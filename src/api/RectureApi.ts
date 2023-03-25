import status from "http-status";

export class RectureApi {

    //public static BASE_API_URL: string = "http://recture.study:81/";
    public static BASE_API_URL: string = "http://api.recture.study/";

    public static async signIn(email: string, password: string): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await fetch(this.pathToUrl("auth/signin"), {
            method: "POST",
            credentials: "include",
            body: formData
        });

        return new ApiResult<null>(response.status);
    }

    public static async signOut(): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("auth/signout"), {
            method: "POST",
            credentials: "include"
        });

        return new ApiResult<null>(response.status);
    }

    public static async getAccountInfo(): Promise<ApiResult<IAccount>> {
        const response = await fetch(this.pathToUrl("account"), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as IAccount;
            return new ApiResult<IAccount>(response.status, data);
        } else {
            return new ApiResult<IAccount>(response.status);
        }
    }

    public static async getRecordings(page: number, pageSize: number, sort: IRecordingSort, query: string | null = null,
                                classIds: number[] | null = null, subjectIds: number[] | null = null, topicIds: number[] | null = null,
                                visibilityFilter: RecordingVisibilityFilter | null = null): Promise<ApiResult<IPage<IRecording>>> {
        let urlParams = new URLSearchParams();

        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());
        urlParams.append("sort", sort.sortKey.toString()+","+sort.sortOrder.toString());
        if (query != null) urlParams.append("query", query as string);
        if (classIds != null) urlParams.append("classIds", (classIds as number[])?.join(","));
        if (subjectIds != null) urlParams.append("subjectIds", (subjectIds as number[])?.join(","));
        if (topicIds != null) urlParams.append("topicIds", (topicIds as number[])?.join(","));
        if (visibilityFilter != null) urlParams.append("visibilityFilter", visibilityFilter);

        const response = await fetch(this.pathToUrl("recordings", urlParams), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as IPage<IRecording>;
            return new ApiResult<IPage<IRecording>>(response.status, data);
        } else {
            return new ApiResult<IPage<IRecording>>(response.status);
        }

    }

    public static async getRecording(id: number): Promise<ApiResult<IRecording>> {
        const response = await fetch(this.pathToUrl("recordings/"+id), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as IRecording;
            return new ApiResult<IRecording>(response.status, data);
        } else {
            return new ApiResult<IRecording>(response.status);
        }
    }

    public static async getClasses(): Promise<ApiResult<IClass[]>> {
        const response = await fetch(this.pathToUrl("classes"), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as IClass[];
            return new ApiResult<IClass[]>(response.status, data);
        } else {
            return new ApiResult<IClass[]>(response.status);
        }
    }

    public static async getSubjects(): Promise<ApiResult<ISubject[]>> {
        const response = await fetch(this.pathToUrl("subjects"), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as ISubject[];
            return new ApiResult<ISubject[]>(response.status, data);
        } else {
            return new ApiResult<ISubject[]>(response.status);
        }
    }

    public static async getTopics(classId: number, subjectId: number): Promise<ApiResult<ITopic[]>> {
        let urlParams = new URLSearchParams();

        urlParams.append("classId", classId.toString());
        urlParams.append("subjectId", subjectId.toString());

        const response = await fetch(this.pathToUrl("topics", urlParams), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as ITopic[];
            return new ApiResult<ITopic[]>(response.status, data);
        } else {
            return new ApiResult<ITopic[]>(response.status);
        }
    }

    public static async getTimetable(): Promise<ApiResult<ITimetable>> {
        const response = await fetch(this.pathToUrl("lessons/timetable"), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as ITimetable;
            
            return new ApiResult<ITimetable>(response.status, data);
        } else {
            return new ApiResult<ITimetable>(response.status);
        }
    }

    public static async getLessons(): Promise<ApiResult<ILesson[]>> {
        const response = await fetch(this.pathToUrl("lessons"), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json() as ILesson[];

            return new ApiResult<ILesson[]>(response.status, data);
        } else {
            return new ApiResult<ILesson[]>(response.status);
        }
    }

    private static pathToUrl(path: string, params: URLSearchParams | null = null): string {
        let url = RectureApi.BASE_API_URL + path;
        if (params != null) url += "?" + params;
        return url;
    }

}

export class ApiResult<T> {

    private _success: boolean;
    private _statusCode: number;
    private _data: T | null;

    constructor(statusCode: number, data: T | null = null) {
        this._statusCode = statusCode;
        this._success = status[`${this._statusCode}_CLASS`] === status.classes.SUCCESSFUL;
        this._data = data;
    }

    public get success() : boolean {
        return this._success;
    }

    public get statusCode() : number {
        return this._statusCode;
    }
    
    public get data() : T | null {
        return this._data;
    } 

}

export interface IPage<T> {
    currentPage: number
    pages: number
    data: T[]
}

export interface IAccount {
    userId: number
    email: string
    userType: UserType
    emailConfirmed: boolean
    firstName: string
    lastName: string
    bio: string | null
    organization: string | null
    avatar: string
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
    topicId: number
    topicName: string
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

export interface ITimetable {
    daysOfWeek: boolean[],
    lessonsPerDay: number,
    firstLessonNumber: number
}

export interface ILesson {
    lessonId: number,
    dayOfWeek: DayOfWeek,
    lessonNumber: number,
    color: LessonColor,
    className: string,
    subjectName: string,
    classId: number,
    subjectId: number
}

export interface IRecordingSort {
    sortKey: RecordingSortKey,
    sortOrder: SortOrder
}

export type UserType = "TEACHER" | "STUDENT";

export enum DayOfWeek {
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6
}

export type LessonColor =
    "mustard" |
    "aqua" |
    "steel_blue" |
    "red" |
    "gray" |
    "rose" |
    "melon" |
    "blush" |
    "crystal_blue" |
    "canary" |
    "orchid";

export enum RecordingVisibilityFilter {
    ShowAll = "SHOW_ALL",
    ShowPrivateOnly = "SHOW_PRIVATE_ONLY",
    ShowPublicOnly = "SHOW_PUBLIC_ONLY"
}

export enum RecordingSortKey {
    ByRecordingDate = "recordingDate"
}

export enum SortOrder {
    Ascending = "ASC",
    Descending = "DESC"
}