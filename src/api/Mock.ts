import { createServer, Model, Response } from "miragejs"
import { RectureApi, DayOfWeek, IAccount, IRecording, IMediaSource, IClass, ISubject, ITopic, ILesson, ITimetable, RecordingVisibilityFilter, IPage, UserType, IComment, ICommentReply } from "./RectureApi";

//TODO: Exclude both library and code from production
export function makeServer() {
    const mockModels = {
        account: Model.extend({userId: 0, email: "", userType: "TEACHER", emailConfirmed: false, firstName: "", lastName: "", bio: "", organization: "", avatar: ""} as IAccount),
        lesson: Model.extend({lessonId: 0, dayOfWeek: DayOfWeek.Monday, lessonNumber: 1, color: "mustard", className: "", subjectName: "", classId: 1, subjectId: 1} as ILesson),
        recording: Model.extend({recordingId: 0,
            title: "",
            description: "",
            published: false,
            notifications: 0,
            teacherId: 0,
            classId: 0,
            className: "",
            subjectId: 0,
            subjectName: "",
            topicId: 0,
            topicName: "",
            uploadTimestamp: 0,
            recordingTimestamp: 0,
            sources: [] as IMediaSource[],
            thumbnail: ""
        } as IRecording),
        class: Model.extend({classId: 0, name: ""} as IClass),
        subject: Model.extend({subjectId: 0, name: ""} as ISubject),
        topic: Model.extend({topicId: 0, name: ""} as ITopic),
        comment: Model.extend({commentId: 0, recordingId: 0, userId: 0, userFirstName: "", userLastName: "", content: "", creationTimestamp: 0, lastEditTimestamp: null} as IComment),
        commentReply: Model.extend({replyId: 0, recordingId: 0, parentCommentId: 0, userId: 0, userFirstName: "", userLastName: "", content: "", creationTimestamp: 0, lastEditTimestamp: null} as ICommentReply)
    };

    const mockFactories = {};

    let server = createServer<typeof mockModels, typeof mockFactories>({
        environment: "development",
  
        models: {
            account: Model,
            lesson: Model,
            recording: Model,
            class: Model,
            subject: Model,
            topic: Model,
            comment: Model,
            commentReply: Model
        },
  
        seeds(server) {
            server.create("account", {
                userId: 1,
                email: "jancislovy@gmail.com",
                userType: "TEACHER",
                emailConfirmed: true,
                firstName: "Jano",
                lastName: "Číslový",
                bio: "Ahoj. Volám sa Ján Číslový a som učiteľom informatiky a matematiky na škole GJAR. Okrem toho že rád vzdelávam a vyučujem, mám kopec voľnočasových aktivít pri ktorých si vetrám hlavu! Či už ide o horské bicyklovanie, alebo beh aj rád sledujem športy v televízii. Ak chceš držať krok s tým čo robím vo svojom voľnom čase, môžeš ma nájsť aj na instagrame pod menom @jan_cislovy. Prajem ti príjemné vzdelávanie. PS: Ak by si mal otázku ohľadom nejakej časti v nahrávke, naváhaj mi napísať!",
                organization: "GJAR",
                avatar: "/jano.png"
            } as IAccount);

            const class1 = server.create("class", {classId: 1, name: "I.A"} as IClass);
            const class2 = server.create("class", {classId: 2, name: "II.B"} as IClass);
            const class3 = server.create("class", {classId: 3, name: "III.C"} as IClass);
            const class4 = server.create("class", {classId: 4, name: "oktáva A"} as IClass);

            const subject1 = server.create("subject", {subjectId: 1, name: "MAT"} as ISubject);
            const subject2 = server.create("subject", {subjectId: 2, name: "INF"} as ISubject);

            server.create("lesson", {lessonId: 1, dayOfWeek: DayOfWeek.Monday, lessonNumber: 3, color: "mustard", className: class1.name, subjectName: subject1.name, classId: class1.classId, subjectId: subject1.subjectId} as ILesson);
            server.create("lesson", {lessonId: 1, dayOfWeek: DayOfWeek.Tuesday, lessonNumber: 2, color: "mustard", className: class1.name, subjectName: subject1.name, classId: class1.classId, subjectId: subject1.subjectId} as ILesson);
            server.create("lesson", {lessonId: 2, dayOfWeek: DayOfWeek.Friday, lessonNumber: 0, color: "mustard", className: class1.name, subjectName: subject1.name, classId: class1.classId, subjectId: subject1.subjectId} as ILesson);
            server.create("lesson", {lessonId: 3, dayOfWeek: DayOfWeek.Monday, lessonNumber: 4, color: 'aqua', className: class2.name, subjectName: subject2.name, classId: class2.classId, subjectId: subject2.subjectId} as ILesson);
            server.create("lesson", {lessonId: 4, dayOfWeek: DayOfWeek.Tuesday, lessonNumber: 3, color: 'aqua', className: class2.name, subjectName: subject2.name, classId: class2.classId, subjectId: subject2.subjectId} as ILesson);
            server.create("lesson", {lessonId: 5, dayOfWeek: DayOfWeek.Wednesday, lessonNumber: 6, color: 'aqua', className: class2.name, subjectName: subject2.name, classId: class2.classId, subjectId: subject2.subjectId} as ILesson);
            server.create("lesson", {lessonId: 6, dayOfWeek: DayOfWeek.Monday, lessonNumber: 5, color: "red", className: class3.name, subjectName: subject1.name, classId: class3.classId, subjectId: subject1.subjectId} as ILesson);
            server.create("lesson", {lessonId: 7, dayOfWeek: DayOfWeek.Tuesday, lessonNumber: 1, color: "red", className: class3.name, subjectName: subject1.name, classId: class3.classId, subjectId: subject1.subjectId} as ILesson);

            /*for (let day = DayOfWeek.Monday; day <= DayOfWeek.Sunday; day++) {
                for (let num = 0; num < 7; num++) {
                    server.create("lesson", {lessonId: (day+1)*(num+1), dayOfWeek: day, lessonNumber: num, color: "mustard", className: "I.A", subjectName: "MAT", classId: 1, subjectId: 1} as ILesson);
                }
            }*/

            const topics = [[{topicId: 1, name: "Funkcie"} as ITopic], //Subject ID 1
                            [{topicId: 2, name: "Python"} as ITopic, {topicId: 3, name: "Hardware"} as ITopic]] as ITopic[][]; //Subject ID 2

            topics.forEach(array => array.forEach(topic => server.create("topic", topic)));

            for (let i = 0; i < 50; i++) {
                const classes = server.schema.all("class").models as IClass[];
                const subjects = server.schema.all("subject").models as ISubject[];

                const recordingClass = classes[i%classes.length];
                const recordingSubject = subjects[Math.floor(i/(classes.length-1))%subjects.length];
                const matchingTopics = topics[recordingSubject.subjectId-1] as ITopic[];
                const recordingTopic = matchingTopics[i%matchingTopics.length];
                
                let title;
                if (recordingTopic.name == "Funkcie") title = "Definičný obor";
                else if (recordingTopic.name == "Python") title = "Modelovanie náhodných javov";
                else title = "Procesory";

                const account = server.schema.first("account")?.attrs;

                const recording = {
                    recordingId: i+1,
                    title: title,
                    description: i%2===0?"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.":null,
                    published: i%2 === 0,
                    notifications: i%5,
                    teacherId: account?.userId,
                    classId: recordingClass.classId,
                    className: recordingClass.name,
                    subjectId: recordingSubject.subjectId,
                    subjectName: recordingSubject.name,
                    topicId: recordingTopic.topicId,
                    topicName: recordingTopic.name,
                    uploadTimestamp: Math.floor(Date.now()/1000-i*(24*60*60)),
                    recordingTimestamp: Math.floor(Date.now()/1000-i*(24*60*60)),
                    sources: [
                        {
                            sourceUrl: "https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_15MB_MP4.mp4",
                            mimeType: "video/mp4"
                        }
                    ],
                    thumbnail: "https://source.unsplash.com/random/384x216?sig="+i
                } as IRecording;

                server.create("recording", recording);

                if ((i+1)%2===0) {
                    const comment = {
                        commentId: i+1,
                        recordingId: i+1,
                        userId: account?.userId,
                        userFirstName: account?.firstName,
                        userLastName: account?.lastName,
                        content: "A random comment.",
                        creationTimestamp: Math.floor(Date.now()/1000-i*(24*60*60))+10000,
                        lastEditTimestamp: null
                    } as IComment;

                    server.create("comment", comment);

                    if ((i+1)%3===0) {
                        const reply = {
                            replyId: i+1,
                            recordingId: i+1,
                            parentCommentId: i+1,
                            userId: account?.userId,
                            userFirstName: account?.firstName,
                            userLastName: account?.lastName,
                            content: "A random reply to a random comment.",
                            creationTimestamp: Math.floor(Date.now()/1000-i*(24*60*60))+600000,
                            lastEditTimestamp: null
                        } as ICommentReply;

                        server.create("commentReply", reply);
                    }
                }
            }

        },
  
        routes() {
            this.passthrough("*/welcome_text_phrases.json");

            this.post(RectureApi.BASE_API_URL+"/auth/signin", (schema, request) => {
                const body = (request.requestBody as any) as FormData;
                const email = body.get("email");
                const password = body.get("password");
                if (email == null || password == null) return new Response(400);
                else if (email === schema.first("account")?.attrs.email && password == "letmein123") return new Response(200);
                else return new Response(401);
            }, {timing: 1000});

            this.post(RectureApi.BASE_API_URL+"/auth/signout", (schema, request) => {
                return new Response(200);
            }, {timing: 200});

            this.post(RectureApi.BASE_API_URL+"/auth/refreshtoken", (schema, request) => {
                return new Response(200);
            }, {timing: 50});

            this.get(RectureApi.BASE_API_URL+"/auth/authenticated", (schema, request) => {
                return new Response(200);
            }, {timing: 50});

            this.get(RectureApi.BASE_API_URL+"/account", (schema) => {
                return schema.first("account")?.attrs as IAccount;
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/recordings", (schema, request) => {
                const params = request.queryParams;
                const recordings = [] as IRecording[];

                let page = 0;
                if (params.page != null) page = parseInt(params.page);

                let pageSize = 20;
                if (params.size != null) pageSize = parseInt(params.size);

                const classIds = [] as number[];
                const subjectIds = [] as number[];
                const topicIds = [] as number[];
                let searchQuery = null as string | null;

                if (params.query != null) searchQuery = params.query.trim().toUpperCase();

                if (params.classIds != null && params.classIds.length > 0) params.classIds.split(",").forEach(value => classIds.push(parseInt(value)));
                if (params.subjectIds != null && params.subjectIds.length > 0) params.subjectIds.split(",").forEach(value => subjectIds.push(parseInt(value)));
                if (params.topicIds != null && params.topicIds.length > 0) params.topicIds.split(",").forEach(value => topicIds.push(parseInt(value)));

                schema.all("recording").models.forEach(recording => {
                    if ((classIds.length === 0 || classIds.includes(recording.classId)) && (subjectIds.length == 0 || subjectIds.includes(recording.subjectId)) && 
                    (topicIds.length === 0 || topicIds.includes(recording.topicId)) && (params.visibilityFilter == null || (params.visibilityFilter == RecordingVisibilityFilter.ShowAll) || (params.visibilityFilter == RecordingVisibilityFilter.ShowPublicOnly && recording.published) || (params.visibilityFilter == RecordingVisibilityFilter.ShowPrivateOnly && !recording.published)) &&
                    (searchQuery == null || searchQuery.length === 0 || recording.title.toLocaleUpperCase().includes(searchQuery) || (recording.description != null && recording.description.toLocaleUpperCase().includes(searchQuery)))) {
                        recordings.push(recording);
                    }
                });

                if (params.sort != null && params.sort.split(",")[1] === "ASC") recordings.reverse();
                if (recordings.length > pageSize) recordings.slice(0, pageSize);
                
                return {
                    currentPage: page,
                    pages: Math.ceil(schema.all("recording").models.length/pageSize),
                    data: recordings
                } as IPage<IRecording>;
            }, {timing: 300});

            this.get(RectureApi.BASE_API_URL+"/recordings/:id", (schema, request) => {
                const id = parseInt(request.params.id);
                const recording = schema.findBy("recording", {"recordingId": id})?.attrs;
                if (recording != null) return recording;
                else return new Response(404);
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/classes", (schema) => {
                return schema.all("class").models;
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/subjects", (schema) => {
                return schema.all("subject").models;
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/topics", (schema, request) => {
                const params = request.queryParams;

                if (params.classId == null || params.subjectId == null) return new Response(400);

                const classId = parseInt(params.classId);
                const subjectId = parseInt(params.subjectId);

                const topics = [] as ITopic[];

                schema.all("topic").models.forEach(topic => {
                    const topicId = topic.topicId;
                    //TODO: Update if we change topics in mock backend
                    if (topicId == 1 && subjectId == 1) topics.push(topic);
                    else if (topicId > 1 && subjectId > 1) topics.push(topic);
                });

                return topics;
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/lessons/timetable", (schema) => {
                return {
                    daysOfWeek: [true, true, true, true, true, false, false],
                    lessonsPerDay: 7,
                    firstLessonNumber: 1
                } as ITimetable;
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/lessons", (schema) => {
                return schema.all("lesson").models;
            }, {timing: 200});

            this.get(RectureApi.BASE_API_URL+"/comments", (schema, request) => {
                const params = request.queryParams;

                if (params.recordingId == null) return new Response(400);

                const recordingId = parseInt(params.recordingId);
                return schema.all("comment").models.filter(comment => comment.recordingId === recordingId);
            }, {timing: 300});

            this.get(RectureApi.BASE_API_URL+"/comments/:id/replies", (schema, request) => {
                const commentId = parseInt(request.params.id);
                return schema.all("commentReply").models.filter(reply => reply.parentCommentId === commentId);
            }, {timing: 300});

            this.put(RectureApi.BASE_API_URL+"/classes/:id", (schema, request) => {
                const classId = parseInt(request.params.id);
                const body = (request.requestBody as any) as FormData;
                const name = body.get("name");
                if (name == null) return new Response(400);
                else {
                    const clazz = schema.findBy("class", {classId: classId});
                    if (!clazz) return new Response(404);
                    else {
                        clazz.update("name", name as string);

                        schema.where("lesson", {classId: classId}).update("className", clazz.name);
                        schema.where("recording", {classId: classId}).update("className", clazz.name);

                        return new Response(204);
                    }
                }
            }, {timing: 300});

            this.put(RectureApi.BASE_API_URL+"/subjects/:id", (schema, request) => {
                const subjectId = parseInt(request.params.id);
                const body = (request.requestBody as any) as FormData;
                const name = body.get("name");
                if (name == null) return new Response(400);
                else {
                    const subject = schema.findBy("subject", {subjectId: subjectId});
                    if (!subject) return new Response(404);
                    else {
                        subject.update("name", name as string);

                        schema.where("lesson", {subjectId: subjectId}).update("subjectName", subject.name);
                        schema.where("recording", {subjectId: subjectId}).update("subjectName", subject.name);

                        return new Response(204);
                    }
                }
            }, {timing: 300});

            this.del(RectureApi.BASE_API_URL+"/lessons/:id", (schema, request) => {
                const lessonId = parseInt(request.params.id);
                const lesson = schema.findBy("lesson", {lessonId: lessonId});
                if (lesson != null) {
                    lesson.destroy();
                    return new Response(200);
                } else {
                    return new Response(404);
                }
            }, {timing: 300});

            this.del(RectureApi.BASE_API_URL+"/classes/:id", (schema, request) => {
                const classId = parseInt(request.params.id);
                const clazz = schema.findBy("class", {classId: classId});
                if (clazz != null) {
                    clazz.destroy();
                    return new Response(200);
                } else {
                    return new Response(404);
                }
            }, {timing: 300});

            this.del(RectureApi.BASE_API_URL+"/subjects/:id", (schema, request) => {
                const subjectId = parseInt(request.params.id);
                const subject = schema.findBy("subject", {subjectId: subjectId});
                if (subject != null) {
                    subject.destroy();
                    return new Response(200);
                } else {
                    return new Response(404);
                }
            }, {timing: 300});
        }
    });
  
    return server;
}