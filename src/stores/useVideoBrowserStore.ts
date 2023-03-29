import { defineStore } from "pinia"

import { useAccountStore } from '@/stores/useAccountStore';
import { IClass, IRecording, IRecordingSort, ISubject, ITopic, RecordingSortKey, RecordingVisibilityFilter, RectureApi, SortOrder } from "@/api/RectureApi";

export const useVideoBrowserStore = defineStore("videoBrowserStore", {
    state: () => ({
        welcomeText: {
            phrases: {
                "primary": [
                    "Welcome back, %name!",
                    "Hello, %name!"
                ],
                "secondary": [
                    "Let's share what you know with the world!",
                    "What will you share with the world today?"
                ]
            },
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
        recordingVisibilityFilter: RecordingVisibilityFilter.ShowAll as RecordingVisibilityFilter,
        recordingSort: { sortKey: RecordingSortKey.ByRecordingDate, sortOrder: SortOrder.Descending } as IRecordingSort,
        searchQuery: "" as string | null,

        classesLoading: false as boolean,
        subjectsLoading: false as boolean,
        topicsLoading: false as boolean,
        recordingsLoading: false as boolean
    }),
    getters: {
        welcomeTextPrimaryDisplay: (state) => {
            if (state.welcomeText.primary?.length > 0) {
                return state.welcomeText.primary;
            } else {
                return "\u00A0";
            }
        },
        welcomeTextSecondaryDisplay: (state) => {
            if (state.welcomeText.secondary?.length > 0) {
                return state.welcomeText.secondary;
            } else {
                return "\u00A0";
            }
        }
    },
    actions: {
        generateWelcomeText() {
            this.welcomeText.templates.primary = this.welcomeText.phrases.primary[Math.floor(Math.random()*this.welcomeText.phrases.primary.length)];
            this.welcomeText.templates.secondary = this.welcomeText.phrases.secondary[Math.floor(Math.random()*this.welcomeText.phrases.secondary.length)];
            this.formatWelcomeText();
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
        
        fetchRecordings(page: number, pageSize: number = 20) {
            this.recordings = [];
            this.recordingsLoading = true;

            //TODO: Test out!!!
            let classIds = [] as number[];
            this.selectedClasses.forEach(selectedClass => classIds.push(selectedClass.classId));

            let subjectIds = [] as number[];
            if (this.selectedSubject != null) subjectIds.push(this.selectedSubject.subjectId);

            let topicIds = [] as number[];
            this.selectedTopics.forEach(selectedTopic => topicIds.push(selectedTopic.topicId));

            RectureApi.getRecordings(page, pageSize, this.recordingSort, this.searchQuery, classIds, subjectIds, topicIds, this.recordingVisibilityFilter).then(result => {
                this.recordingsLoading = false;

                if (result.success && result.data != null) {
                    const page = result.data;
                    this.recordings = page.data;
                }
            }).catch(reason => {
                this.recordingsLoading = false;
            });
        },

        fetchClassesAndSubjects() {
            this.classes = [];
            this.subjects = [];
            this.topics = [];
            this.selectedClasses = [];
            this.selectedSubject = null;
            this.selectedTopics = [];

            this.classesLoading = true;
            this.subjectsLoading = true;

            RectureApi.getClasses().then(result => {
                this.classesLoading = false;
                if (result.success && result.data != null) {
                    this.classes = result.data;
                }
            }).catch(reason => {
                this.classesLoading = false;
            });

            RectureApi.getSubjects().then(result => {
                this.subjectsLoading = false;
                if (result.success && result.data != null) {
                    this.subjects = result.data;
                    if (this.subjects.length > 0) {
                        //TODO: Test out!
                        this.selectedSubject = this.subjects[0];
                    }
                }
            }).catch(reason => {
                this.subjectsLoading = false;
            });
        },

        fetchTopics() {
            this.topics = [];
            this.selectedTopics = [];

            if (this.selectedSubject != null && this.selectedClasses.length == 1) {
                this.topicsLoading = true;
                RectureApi.getTopics(this.selectedClasses[0].classId, this.selectedSubject.subjectId).then(result => {
                    this.topicsLoading = false;
                    if (result.success && result.data != null) {
                        this.topics = result.data;
                    }
                }).catch(reason => {
                    this.topicsLoading = false;
                });
            }
        }
    }
});