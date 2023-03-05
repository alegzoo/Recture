import { defineStore } from "pinia"

import { useAccountStore } from '@/stores/useAccountStore';
import { IClass, IRecording, IRecordingSort, ISubject, ITopic, RecordingSortKey, RecordingVisibilityFilter, RectureApi, SortOrder } from "@/api/RectureApi";

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
        classes: [] as IClass[],
        subjects: [] as ISubject[],
        topics: [] as ITopic[],
        selectedClasses: [] as IClass[],
        selectedSubject: null as ISubject | null,
        selectedTopics: [] as ITopic[],
        recordings: [] as IRecording[],
        recordingVisibilityFilter: RecordingVisibilityFilter.SHOW_ALL as RecordingVisibilityFilter,
        recordingSort: { sortKey: RecordingSortKey.BY_RECORDING_DATE, sortOrder: SortOrder.DESCENDING } as IRecordingSort
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
        /*fetchRecordings(page: number, pageSize: number = 20, query: string | null = null) {
            this.recordings = [];

            //TODO: Test out!!!
            let classIds = [] as number[];
            this.selectedClasses.forEach(selectedClass => classIds.push(selectedClass.classId));

            let subjectIds = [] as number[];
            if (this.selectedSubject != null) subjectIds.push(this.selectedSubject.subjectId);

            let topicIds = [] as number[];
            this.selectedTopics.forEach(selectedTopic => topicIds.push(selectedTopic.topicId));

            RectureApi.getRecordings(page, pageSize, this.recordingSort, query, classIds, subjectIds, topicIds, this.recordingVisibilityFilter).then(response => {
                if (response.ok) {
                    response.json().then((data) => {
                        this.recordings = data.data as IRecording[];
                    })
                }
            });
        },*/
        
        //TODO: Use the real method instead of the one created for testing
        fetchRecordings(page: number, pageSize: number = 20, query: string | null = null) {
            this.recordings = [];
            this.recordings = [];

            let classIds = [] as number[];
            this.selectedClasses.forEach(selectedClass => classIds.push(selectedClass.classId));

            let subjectIds = [] as number[];
            if (this.selectedSubject != null) subjectIds.push(this.selectedSubject.subjectId);

            let topicIds = [] as number[];
            this.selectedTopics.forEach(selectedTopic => topicIds.push(selectedTopic.topicId));

            for (let i = 0; i < pageSize; i++) {
                let recordingClass = this.classes[i%this.classes.length];
                let recordingSubject = this.subjects[Math.floor(i/(this.classes.length-1))%this.subjects.length];
                let recordingTopic = null;
                let title = "Test";
                let published = i%2 == 0;

                if (recordingSubject.name === "MAT") {
                    title = "Definičný obor";
                    recordingTopic = {
                        topicId: 0,
                        name: "Funkcie"
                    };
                } else if (recordingSubject.name === "INF") {
                    title = "Modelovanie náhodných javov";
                    recordingTopic = [{
                        topicId: 1,
                        name: "Python"
                    },
                    {
                        topicId: 2,
                        name: "Hardware"
                    }][(recordingClass.classId%3+i*3)%2];
                }

                if ((classIds.length == 0 || classIds.includes(recordingClass.classId)) && (subjectIds.length == 0 || subjectIds.includes(recordingSubject.subjectId)) && 
                (topicIds.length == 0 || (recordingTopic != null && topicIds.includes(recordingTopic.topicId))) && (this.recordingVisibilityFilter == RecordingVisibilityFilter.SHOW_ALL || (this.recordingVisibilityFilter == RecordingVisibilityFilter.SHOW_PUBLIC_ONLY && published) || (this.recordingVisibilityFilter == RecordingVisibilityFilter.SHOW_PRIVATE_ONLY && !published))) {
                    this.recordings.push({
                        recordingId: i,
                        title: title,
                        description: "test",
                        published: published,
                        notifications: 0,
                        classId: recordingClass.classId,
                        className: recordingClass.name,
                        subjectId: recordingSubject.subjectId,
                        subjectName: recordingSubject.name,
                        uploadTimestamp: Math.floor(Date.now()/1000-i*(24*60*60)),
                        recordingTimestamp: Math.floor(Date.now()/1000-i*(24*60*60)),
                        sources: [
                            {
                                sourceUrl: "https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_15MB_MP4.mp4",
                                mimeType: "video/mp4"
                            }
                        ],
                        thumbnail: "https://source.unsplash.com/random/384x216?sig="+i
                    });
                }

                if (this.recordingSort.sortOrder ==  SortOrder.ASCENDING) this.recordings.reverse();
            }
        },

        /*fetchClassesAndSubjects() {
            this.classes = [];
            this.subjects = [];
            this.topics = [];
            this.selectedClasses = [];
            this.selectedSubject = null;
            this.selectedTopics = [];

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
                        if (this.subjects.length > 0) {
                            //TODO: Test out!
                            this.selectedSubject = this.subjects[0];
                        }
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

            this.topics = [];
            this.selectedClasses = [];
            this.selectedSubject = this.subjects[0];
            this.selectedTopics = [];
        },

        /*fetchTopics() {
            //TODO: Test out!
            this.topics = [];
            this.selectedTopics = [];
            if (this.selectedSubject != null && this.selectedClasses.length == 1) {
                this.topics = [];
                RectureApi.getTopics(this.selectedClasses[0].classId, this.selectedSubject.subjectId).then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            this.topics = data as ITopic[];
                        });
                    }
                });
            }
        }*/

        //TODO: Use the real method instead of the one created for testing
        fetchTopics() {
            this.topics = [];
            if (this.selectedSubject != null && this.selectedClasses.length == 1) {
                if (this.selectedSubject.name == "MAT") {
                    this.topics = [{
                        topicId: 0,
                        name: "Funkcie"
                    }];
                } else if (this.selectedSubject.name == "INF") {
                    this.topics = [{
                        topicId: 1,
                        name: "Python"
                    },
                    {
                        topicId: 2,
                        name: "Hardware"
                    }];
                }
            }
        }
    }
});