import { useAccountStore } from "./useAccountStore";
import { useVideoBrowserStore } from "./useVideoBrowserStore";

export class Stores {

    public static resetAllStores() {
        //TODO: Either reset all stores here or find out how to do this in a better way
        const accountStore = useAccountStore();
        const videoBrowserStore = useVideoBrowserStore();

        accountStore.$reset();
        videoBrowserStore.$reset();
    }

}