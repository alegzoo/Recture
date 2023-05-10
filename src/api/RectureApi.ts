import status from "http-status";

export class RectureApi {

    public static BASE_API_URL: string = "https://api.recture.study/";

    public static async signIn(email: string, password: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await fetch(this.pathToUrl("auth/signin"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async signOut(signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("auth/signout"), {
            method: "POST",
            credentials: "include",
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async signUp(email: string, firstName: string, lastName: string, organization: string | null, password: string, userType: UserType, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        if (organization != null) formData.append("organization", organization);
        formData.append("password", password);
        formData.append("userType", userType);

        const response = await fetch(this.pathToUrl("auth/signup"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async requestPasswordReset(email: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("email", email);

        const response = await fetch(this.pathToUrl("auth/password/reset"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async resetPassword(password: string, code: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("password", password);
        formData.append("code", code);

        const response = await fetch(this.pathToUrl("auth/password/reset"), {
            method: "PUT",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async resendVerificationLink(email: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("email", email);

        const response = await fetch(this.pathToUrl("auth/verify"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async verifyEmail(code: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("code", code);

        const response = await fetch(this.pathToUrl("auth/verify"), {
            method: "PUT",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async refreshToken(signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("auth/refreshtoken"), {
            method: "POST",
            credentials: "include",
            signal: signal
        });

        return new ApiResult<null>(response.status);
    }

    public static async validateAuthentication(signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("auth/authenticated"), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.status === status.UNAUTHORIZED) return await this.refreshToken(signal);
        else return new ApiResult<null>(response.status);
    }

    public static async getAccountInfo(signal: AbortSignal | null = null): Promise<ApiResult<IAccount>> {
        const response = await fetch(this.pathToUrl("account"), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IAccount;
            return new ApiResult<IAccount>(response.status, data);
        } else {
            return new ApiResult<IAccount>(response.status);
        }
    }

    public static async getUserInfo(userId: number, signal: AbortSignal | null = null): Promise<ApiResult<IPublicUserInfo>> {
        const response = await fetch(this.pathToUrl("users/"+userId), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPublicUserInfo;
            return new ApiResult<IPublicUserInfo>(response.status, data);
        } else {
            return new ApiResult<IPublicUserInfo>(response.status);
        }
    }

    public static async getStudentsByClass(classId: number, page: number, pageSize: number, signal: AbortSignal | null = null): Promise<ApiResult<IPage<IPublicUserInfo>>> {
        let urlParams = new URLSearchParams();

        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());

        const response = await fetch(this.pathToUrl("classes/"+classId+"/students", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPage<IPublicUserInfo>;
            return new ApiResult<IPage<IPublicUserInfo>>(response.status, data);
        } else {
            return new ApiResult<IPage<IPublicUserInfo>>(response.status);
        }
    }

    public static async getStudentsBySubject(subjectId: number, page: number, pageSize: number, signal: AbortSignal | null = null): Promise<ApiResult<IPage<IPublicUserInfo>>> {
        let urlParams = new URLSearchParams();

        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());

        const response = await fetch(this.pathToUrl("subjects/"+subjectId+"/students", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPage<IPublicUserInfo>;
            return new ApiResult<IPage<IPublicUserInfo>>(response.status, data);
        } else {
            return new ApiResult<IPage<IPublicUserInfo>>(response.status);
        }
    }

    public static async getRecordings(page: number, pageSize: number, sort: IRecordingSort, query: string | null = null,
                                classIds: number[] | null = null, subjectIds: number[] | null = null, topicIds: number[] | null = null,
                                visibilityFilter: RecordingVisibilityFilter | null = null, signal: AbortSignal | null = null): Promise<ApiResult<IPage<IRecording>>> {
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
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPage<IRecording>;
            return new ApiResult<IPage<IRecording>>(response.status, data);
        } else {
            return new ApiResult<IPage<IRecording>>(response.status);
        }

    }

    public static async getRecording(id: number, signal: AbortSignal | null = null): Promise<ApiResult<IRecording>> {
        const response = await fetch(this.pathToUrl("recordings/"+id), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IRecording;
            return new ApiResult<IRecording>(response.status, data);
        } else {
            return new ApiResult<IRecording>(response.status);
        }
    }

    public static async getClasses(signal: AbortSignal | null = null): Promise<ApiResult<IClass[]>> {
        const response = await fetch(this.pathToUrl("classes"), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IClass[];
            return new ApiResult<IClass[]>(response.status, data);
        } else {
            return new ApiResult<IClass[]>(response.status);
        }
    }

    public static async getSubjects(signal: AbortSignal | null = null): Promise<ApiResult<ISubject[]>> {
        const response = await fetch(this.pathToUrl("subjects"), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ISubject[];
            return new ApiResult<ISubject[]>(response.status, data);
        } else {
            return new ApiResult<ISubject[]>(response.status);
        }
    }

    public static async getTopics(classId: number, subjectId: number, signal: AbortSignal | null = null): Promise<ApiResult<ITopic[]>> {
        let urlParams = new URLSearchParams();

        urlParams.append("classId", classId.toString());
        urlParams.append("subjectId", subjectId.toString());

        const response = await fetch(this.pathToUrl("topics", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ITopic[];
            return new ApiResult<ITopic[]>(response.status, data);
        } else {
            return new ApiResult<ITopic[]>(response.status);
        }
    }

    public static async getTimetable(signal: AbortSignal | null = null): Promise<ApiResult<ITimetable>> {
        const response = await fetch(this.pathToUrl("lessons/timetable"), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ITimetable;
            
            return new ApiResult<ITimetable>(response.status, data);
        } else {
            return new ApiResult<ITimetable>(response.status);
        }
    }

    public static async getLessons(signal: AbortSignal | null = null): Promise<ApiResult<ILesson[]>> {
        const response = await fetch(this.pathToUrl("lessons"), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ILesson[];

            return new ApiResult<ILesson[]>(response.status, data);
        } else {
            return new ApiResult<ILesson[]>(response.status);
        }
    }

    public static async getCommentsByRecording(page: number, pageSize: number, recordingId: number, signal: AbortSignal | null = null): Promise<ApiResult<IPage<IComment>>> {
        let urlParams = new URLSearchParams();
        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());

        urlParams.append("recordingId", recordingId.toString());

        const response = await fetch(this.pathToUrl("comments", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPage<IComment>;
            
            return new ApiResult<IPage<IComment>>(response.status, data);
        } else {
            return new ApiResult<IPage<IComment>>(response.status);
        }
    }

    public static async getRepliesByComment(page: number, pageSize: number, commentId: number, signal: AbortSignal | null = null): Promise<ApiResult<IPage<ICommentReply>>> {
        let urlParams = new URLSearchParams();
        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());

        const response = await fetch(this.pathToUrl("comments/"+commentId+"/replies", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPage<ICommentReply>;
            
            return new ApiResult<IPage<ICommentReply>>(response.status, data);
        } else {
            return new ApiResult<IPage<ICommentReply>>(response.status);
        }
    }

    public static async getInvitations(page: number, pageSize: number, signal: AbortSignal | null = null): Promise<ApiResult<IPage<IInvitation>>> {
        let urlParams = new URLSearchParams();

        urlParams.append("page", page.toString());
        urlParams.append("size", pageSize.toString());

        const response = await fetch(this.pathToUrl("invitations", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPage<IInvitation>;
            return new ApiResult<IPage<IInvitation>>(response.status, data);
        } else {
            return new ApiResult<IPage<IInvitation>>(response.status);
        }
    }

    public static async getPoliciesByTeacher(teacherId: number, signal: AbortSignal | null = null): Promise<ApiResult<IPolicy[]>> {
        let urlParams = new URLSearchParams();

        urlParams.append("teacherId", teacherId.toString());

        const response = await fetch(this.pathToUrl("policies", urlParams), {
            method: "GET",
            credentials: "include",
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPolicy[];
            return new ApiResult<IPolicy[]>(response.status, data);
        } else {
            return new ApiResult<IPolicy[]>(response.status);
        }
    }

    public static async renameClass(classId: number, name: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("name", name);

        const response = await fetch(this.pathToUrl("classes/"+classId), {
            method: "PUT",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async renameSubject(subjectId: number, name: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("name", name);

        const response = await fetch(this.pathToUrl("subjects/"+subjectId), {
            method: "PUT",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async renameTopic(topicId: number, name: string, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("name", name);

        const response = await fetch(this.pathToUrl("topics/"+topicId), {
            method: "PUT",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async updateTimetable(daysOfWeek: boolean[], lessonsPerDay: number, firstLessonNumber: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        let formData = new FormData();
        formData.append("daysOfWeek", daysOfWeek.join(","));
        formData.append("lessonsPerDay", lessonsPerDay.toString());
        formData.append("firstLessonNumber", firstLessonNumber.toString());

        const response = await fetch(this.pathToUrl("lessons/timetable"), {
            method: "PUT",
            credentials: "include",
            body: formData,
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async removeStudentFromClass(classId: number, userId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("classes/"+classId+"/students/"+userId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async removeStudentFromSubject(subjectId: number, userId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("subjects/"+subjectId+"/students/"+userId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteClass(classId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("classes/"+classId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteSubject(subjectId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("subjects/"+subjectId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteTopic(topicId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("topics/"+topicId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteLesson(lessonId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("lessons/"+lessonId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteComment(commentId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("comments/"+commentId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteReply(replyId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("comments/replies/"+replyId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deleteInvitation(invitationId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("invitations/"+invitationId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async deletePolicy(policyId: number, signal: AbortSignal | null = null): Promise<ApiResult<null>> {
        const response = await fetch(this.pathToUrl("policies/"+policyId), {
            method: "DELETE",
            credentials: "include",
            signal: signal
        });

        return new ApiResult(response.status);
    }

    public static async createRecording(file: File, lessonId: number, topicId: number, title: string, description: string | null, published: boolean, commentsAllowed: boolean, recordingTimestamp: number | null, signal: AbortSignal | null = null): Promise<ApiResult<IRecording>> {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("lessonId", lessonId.toString());
        formData.append("topicId", topicId.toString());
        formData.append("title", title.toString());
        if (description != null) formData.append("description", description.toString());
        formData.append("published", published.toString());
        formData.append("commentsAllowed", commentsAllowed.toString());
        if (recordingTimestamp != null) formData.append("recordingDate", recordingTimestamp.toString());

        const response = await fetch(this.pathToUrl("recordings"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IRecording;
            
            return new ApiResult<IRecording>(response.status, data);
        } else {
            return new ApiResult<IRecording>(response.status);
        }
    }

    public static async createClass(name: string, signal: AbortSignal | null = null): Promise<ApiResult<IClass>> {
        let formData = new FormData();
        formData.append("name", name);

        const response = await fetch(this.pathToUrl("classes"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IClass;
            
            return new ApiResult<IClass>(response.status, data);
        } else {
            return new ApiResult<IClass>(response.status);
        }
    }

    public static async createSubject(name: string, signal: AbortSignal | null = null): Promise<ApiResult<ISubject>> {
        let formData = new FormData();
        formData.append("name", name);

        const response = await fetch(this.pathToUrl("subjects"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ISubject;
            
            return new ApiResult<ISubject>(response.status, data);
        } else {
            return new ApiResult<ISubject>(response.status);
        }
    }

    public static async createTopic(classId: number, subjectId: number, name: string, signal: AbortSignal | null = null): Promise<ApiResult<ITopic>> {
        let formData = new FormData();
        formData.append("classId", classId.toString());
        formData.append("subjectId", subjectId.toString());
        formData.append("name", name);

        const response = await fetch(this.pathToUrl("topics"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ITopic;
            
            return new ApiResult<ITopic>(response.status, data);
        } else {
            return new ApiResult<ITopic>(response.status);
        }
    }

    public static async createLesson(dayOfWeek: DayOfWeek, lessonNumber: number, lessonColor: string, classId: number, subjectId: number, signal: AbortSignal | null = null): Promise<ApiResult<ILesson>> {
        let formData = new FormData();
        formData.append("dayOfWeek", dayOfWeek.toString());
        formData.append("lessonNumber", lessonNumber.toString());
        formData.append("lessonColor", lessonColor);
        formData.append("classId", classId.toString());
        formData.append("subjectId", subjectId.toString());

        const response = await fetch(this.pathToUrl("lessons"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ILesson;
            
            return new ApiResult<ILesson>(response.status, data);
        } else {
            return new ApiResult<ILesson>(response.status);
        }
    }

    public static async createComment(recordingId: number, content: string, signal: AbortSignal | null = null): Promise<ApiResult<IComment>> {
        let formData = new FormData();
        formData.append("recordingId", recordingId.toString());
        formData.append("content", content);

        const response = await fetch(this.pathToUrl("comments"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IComment;
            
            return new ApiResult<IComment>(response.status, data);
        } else {
            return new ApiResult<IComment>(response.status);
        }
    }

    public static async createCommentReply(commentId: number, content: string, taggedReplyId: number | null, signal: AbortSignal | null = null): Promise<ApiResult<ICommentReply>> {
        let formData = new FormData();
        formData.append("commentId", commentId.toString());
        if (taggedReplyId != null) formData.append("taggedReplyId", taggedReplyId.toString());
        formData.append("content", content);

        const response = await fetch(this.pathToUrl("comments/"+commentId+"/replies"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as ICommentReply;
            
            return new ApiResult<ICommentReply>(response.status, data);
        } else {
            return new ApiResult<ICommentReply>(response.status);
        }
    }

    public static async createInvitation(classId: number, subjectId: number, uses: number | null, expirationTimestamp: number | null, signal: AbortSignal | null = null): Promise<ApiResult<IInvitation>> {
        let formData = new FormData();
        formData.append("classId", classId.toString());
        formData.append("subjectId", subjectId.toString());
        if (uses != null) formData.append("uses", uses.toString());
        if (expirationTimestamp != null) formData.append("expirationTimestamp", expirationTimestamp.toString());

        const response = await fetch(this.pathToUrl("invitations"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IInvitation;
            
            return new ApiResult<IInvitation>(response.status, data);
        } else {
            return new ApiResult<IInvitation>(response.status);
        }
    }

    public static async createPolicy(title: string, content: string, signal: AbortSignal | null = null): Promise<ApiResult<IPolicy>> {
        let formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        const response = await fetch(this.pathToUrl("policies"), {
            method: "POST",
            credentials: "include",
            body: formData,
            signal: signal
        });

        if (response.ok) {
            const data = await response.json() as IPolicy;
            
            return new ApiResult<IPolicy>(response.status, data);
        } else {
            return new ApiResult<IPolicy>(response.status);
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

export interface IPublicUserInfo {
    userId: number
    email: string
    userType: UserType
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
    commentsAllowed: boolean
    comments: number
    notifications: number
    quizAvailable: boolean
    teacherId: number
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
    sourceUrl: string
    mimeType: string
}

export interface IClass {
    classId: number
    name: string
}

export interface ISubject {
    subjectId: number
    name: string
}

export interface ITopic {
    topicId: number
    name: string
}

export interface ITimetable {
    daysOfWeek: boolean[]
    lessonsPerDay: number
    firstLessonNumber: number
}

export interface ILesson {
    lessonId: number
    dayOfWeek: DayOfWeek
    lessonNumber: number
    color: LessonColor
    className: string
    subjectName: string
    classId: number
    subjectId: number
}

export interface IComment {
    commentId: number
    recordingId: number
    userId: number
    userFirstName: string
    userLastName: string
    content: string
    creationTimestamp: number
    lastEditTimestamp: number | null
}

export interface ICommentReply {
    replyId: number
    recordingId: number
    parentCommentId: number
    userId: number
    userFirstName: string
    userLastName: string
    taggedReplyId: number | null
    taggedReplyUserId: number | null
    taggedReplyUserFirstName: string | null
    taggedReplyUserLastName: string | null
    content: string
    creationTimestamp: number
    lastEditTimestamp: number | null
}

export interface IInvitation {
    invitationId: number,
    code: string,
    link: string,
    className: string,
    subjectName: string,
    classId: number,
    subjectId: number,
    remainingUses: number | null,
    creationTimestamp: number,
    expirationTimestamp: number | null
}

export interface IPolicy {
    policyId: number,
    title: string,
    content: string
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