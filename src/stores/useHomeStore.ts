import { defineStore } from "pinia"

export const useHomeStore = defineStore("homeStore", {
    state: () => ({
        sidebarVisible: true as boolean
    })
});