import { defineStore } from "pinia"

import { useAccountStore } from '@/stores/useAccountStore';
import { IClass, IRecording, ISubject, ITopic, RecordingSort, RecordingVisibilityFilter, RectureApi, SortOrder } from "@/api/RectureApi";

export const useVideoBrowserStore = defineStore("videoBrowserStore", {
    state: () => ({
        welcomeText: {
            primary: "",
            secondary: "",
            templates: {
                primary: "",
                secondary: ""
            }
        },
        subjects: [] as ISubject[],
        classes: [] as IClass[],
        topics: [] as ITopic[],
        recordings: [] as IRecording[]
    }),
    actions: {
        generateWelcomeText() {
            fetch("/src/assets/welcome_text_phrases.json").then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        this.welcomeText.templates.primary = data.primary[Math.floor(Math.random()*data.primary.length)];
                        this.welcomeText.templates.secondary = data.secondary[Math.floor(Math.random()*data.secondary.length)];
                        this.formatWelcomeText();
                    });
                }
            });
        },
        formatWelcomeText() {
            const accountStore = useAccountStore();
            let name = accountStore.firstName != null ? accountStore.firstName : "user";
            this.welcomeText.primary = this.welcomeText.templates.primary.replace("%name", name);
            this.welcomeText.secondary = this.welcomeText.templates.secondary.replace("%name", name);
        },
        clearWelcomeText() {
            this.welcomeText.primary = "";
            this.welcomeText.secondary = "";
            this.welcomeText.templates.primary = "";
            this.welcomeText.templates.secondary = "";
        },
        /*fetchRecordings(page: number, pageSize: number = 20, sort: RecordingSort = RecordingSort.BY_RECORDING_DATE,
                        sortDirection: SortOrder = SortOrder.DESCENDING, query: string | null = null,
                        classIds: number[] | null = null,subjectIds: number[] | null = null, topicIds: number[] | null = null,
                        visibilityFilter: RecordingVisibilityFilter | null = null) {
            this.recordings = [];
            RectureApi.getRecordings(page, pageSize, sort, sortDirection, query, classIds, subjectIds, topicIds, visibilityFilter).then(response => {
                if (response.ok) {
                    response.json().then((data) => {
                        this.recordings = data.data as IRecording[];
                    })
                }
            });
        },*/
        
        //TODO: Use the real method instead of the one created for testing
        fetchRecordings(page: number, pageSize: number = 20, sort: RecordingSort = RecordingSort.BY_RECORDING_DATE,
            sortDirection: SortOrder = SortOrder.DESCENDING, query: string | null = null,
            classIds: number[] | null = null,subjectIds: number[] | null = null, topicIds: number[] | null = null,
            visibilityFilter: RecordingVisibilityFilter | null = null) {
            this.recordings = [];
            for (let i = 0; i < pageSize; i++) {
                this.recordings.push({
                    recordingId: i,
                    title: "Definičný obor",
                    description: "test",
                    notifications: 0,
                    classId: 0,
                    className: "IV.A",
                    subjectId: 0,
                    subjectName: "INF",
                    uploadTimestamp: Math.floor(Date.now()/1000),
                    recordingTimestamp: Math.floor(Date.now()/1000),
                    sources: [
                        {
                            sourceUrl: "https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_15MB_MP4.mp4",
                            mimeType: "video/mp4"
                        }
                    ],
                    thumbnail: "https://source.unsplash.com/random/384x216?sig="+i
                });
            }
        },

        /*fetchClassesAndSubjects() {
            this.classes = [];
            this.subjects = [];

            RectureApi.getClasses().then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.classes = data as IClass[];
                    });
                }
            });

            RectureApi.getSubjects().then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.subjects = data as ISubject[];
                    });
                }
            });
        },*/

        //TODO: Use the real method instead of the one created for testing
        fetchClassesAndSubjects() {
            this.classes = [
                {classId: 0, name: "I.A"}, {classId: 1, name: "II.B"}, {classId: 2, name: "III.C"}, {classId: 3, name: "oktáva"}
            ];

            this.subjects = [
                {subjectId: 0, name: "MAT"},{subjectId: 1, name: "INF"}
            ];
        },

        fetchTopics(classId: number, subjectId: number) {
            this.topics = [];
            RectureApi.getTopics(classId, subjectId).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.topics = data as ITopic[];
                    });
                }
            });
        }
    }
});