<template>
    <v-dialog :model-value="modelValue" width="800" persistent>
        <v-card class="manage-dialog-v-card">
            <v-card-title>
                <h2 class="pa-5">MEMBERS OF &quot;{{ group?.name }}&quot;</h2>
            </v-card-title>
            <v-card-text>
                <v-row v-show="tableItems != null">
                    <v-col>
                        <v-table v-show="tableItems?.length !== 0" class="w-100 rows-items-manage-timetable" fixed-header>
                            <thead>
                                <tr>
                                    <th class="text-left rows-items-manage-timetable">Name</th>
                                    <th class="text-right rows-items-manage-timetable">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <UserRow v-for="item in tableItems" :key="item.userId" :user-info="item" @kick="() => showKickDialog(item)"/>
                            </tbody>
                        </v-table>
                        <p v-show="tableItems?.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
                    </v-col>
                </v-row>
                <v-row v-show="tableItems == null">
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-progress-circular class="ma-auto" indeterminate size="48"/>
                    </v-col>
                    <v-spacer/>
                </v-row>
                <v-row>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-pagination v-model="page" :length="totalPages" density="comfortable" rounded="circle"/>
                    </v-col>
                    <v-spacer/>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn variant="text" @click="emit('update:modelValue', false)">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ConfirmationDialog v-model="confirmationDialogVisible" :title="'KICK USER &quot;'+selectedUserFullName+'&quot;'" :message="'Are you sure you want to remove &quot;'+selectedUserFullName+'&quot; from &quot;'+group?.name+'&quot;? This action is irreversible.'" positiveButtonText="Kick" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
    <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
        <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
    </v-overlay>
</template>

<style lang="scss" setup>
    .v-avatar {
        border: solid 2px black;
    }
</style>

<script lang="ts" setup>
    import { RectureApi, IClass, ISubject, IPublicUserInfo, ApiResult, IPage } from '@/api/RectureApi';
    import { ref, computed, watch, onMounted } from 'vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import MessageDialog from './MessageDialog.vue';
    import UserRow from './UserRow.vue';

    const props = defineProps<{
        modelValue?: boolean,
        group: IClass | ISubject | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const tableItems = ref<(IPublicUserInfo)[] | null>([]);
    const page = ref<number>(0);
    const totalPages = ref<number | undefined>(undefined);

    const confirmationDialogVisible = ref<boolean>(false);
    
    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    const selectedUser = ref<IPublicUserInfo | null>(null);
    const selectedUserFullName = computed<string | null>(() => selectedUser.value != null ? (selectedUser.value.firstName+" "+selectedUser.value.lastName) : null);

    let fetchAbortController = new AbortController();

    watch(() => [props.modelValue, props.group], () => {
        if (props.modelValue === true) {
            totalPages.value = undefined;
            page.value = 1;
            loadGroupMembers();
        }
    });
    watch(page, () => {
        loadGroupMembers();
    });
    onMounted(() => {
        totalPages.value = undefined;
        page.value = 1;
        loadGroupMembers();
    });

    function loadGroupMembers() {
        fetchAbortController.abort();
        fetchAbortController = new AbortController();

        tableItems.value = [];

        if (props.group != null) {
            //TODO: Add pagination
            loadingOverlayVisible.value = true;

            let promise = null as Promise<ApiResult<IPage<IPublicUserInfo>>> | null;
            if ((props.group as IClass).classId) {
                promise = RectureApi.getStudentsByClass((props.group as IClass).classId, page.value-1, 10, fetchAbortController.signal);
            } else if ((props.group as ISubject).subjectId) {
                promise = RectureApi.getStudentsBySubject((props.group as ISubject).subjectId, page.value-1, 10, fetchAbortController.signal);
            }

            if (promise != null) {
                promise.then(result => {
                    if (result.success && result.data != null) {
                        tableItems.value = result.data.data;
                        totalPages.value = result.data.pages;
                    } else tableItems.value = null;
                }).catch(reason => {
                    emit('update:modelValue', false);
                }).finally(() => {
                    loadingOverlayVisible.value = false;
                });
            }
        }

    }

    function showKickDialog(item: IPublicUserInfo) {
        selectedUser.value = item;
        confirmationDialogVisible.value = true;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;

        const user = selectedUser.value;
        if (user == null) return;

        loadingOverlayVisible.value = true;
        let promise = null as Promise<ApiResult<void>> | null;

        if ((props.group as IClass).classId) {
            const classId = (props.group as IClass).classId;
            promise = RectureApi.removeStudentFromClass(classId, user.userId);
        } else if ((props.group as ISubject).subjectId) {
            const subjectId = (props.group as ISubject).subjectId;
            promise = RectureApi.removeStudentFromSubject(subjectId, user.userId);
        }

        if (promise != null) {
            promise.then(result => {
                if (result.success) {
                    if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== user);
                } else {
                    errorDialogMessage.value = "Failed to kick user.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to kick user.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
                selectedUser.value = null;
            });
        } else {
            loadingOverlayVisible.value = false;
            selectedUser.value = null;
        }
    }
</script>