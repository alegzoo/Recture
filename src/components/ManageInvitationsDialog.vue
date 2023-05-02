<template>
    <v-dialog :model-value="modelValue" width="1000" persistent>
        <v-card class="manage-dialog-v-card">
            <v-card-title>
                <h2 class="pa-5">MANAGE INVITATIONS</h2>
            </v-card-title>
            <v-card-text>
                <v-row v-show="tableItems != null">
                    <v-col>
                        <v-table v-show="tableItems?.length !== 0" class="w-100 rows-items-manage-timetable" fixed-header>
                            <thead>
                                <tr>
                                    <th class="rows-items-manage-timetable">Subject</th>
                                    <th class="rows-items-manage-timetable">Class</th>
                                    <th class="rows-items-manage-timetable">Code</th>
                                    <th class="rows-items-manage-timetable">Expires</th>
                                    <th class="rows-items-manage-timetable">Remaining uses</th>
                                    <th class="rows-items-manage-timetable">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <InvitationRow v-for="item in tableItems" :key="item.invitationId" :invitation="item" @revoke="() => showRevokeDialog(item)"/>
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
    <ConfirmationDialog v-model="confirmationDialogVisible" :title="'REVOKE INVITATION'" :message="'Are you sure you want to revoke this invitation? This action is irreversible.'" positiveButtonText="Revoke" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
    <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
        <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
    </v-overlay>
</template>

<style lang="scss" setup>
    th {
        text-align: left;
    }

    th:last-child {
        text-align: right !important;
    }
</style>

<script lang="ts" setup>
    import { RectureApi, ApiResult, IInvitation } from '@/api/RectureApi';
    import { ref, computed, watch, onMounted } from 'vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import InvitationRow from './InvitationRow.vue';
    import MessageDialog from './MessageDialog.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const tableItems = ref<(IInvitation)[] | null>([]);
    const page = ref<number>(0);
    const totalPages = ref<number | undefined>(undefined);

    const confirmationDialogVisible = ref<boolean>(false);
    
    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    const selectedInvitation = ref<IInvitation | null>(null);

    let fetchAbortController = new AbortController();

    watch(() => [props.modelValue], () => {
        if (props.modelValue === true) {
            totalPages.value = undefined;
            page.value = 1;
            loadInvitations();
        }
    });
    watch(page, () => {
        loadInvitations();
    });
    onMounted(() => {
        totalPages.value = undefined;
        page.value = 1;
        loadInvitations();
    });

    function loadInvitations() {
        fetchAbortController.abort();
        fetchAbortController = new AbortController();

        tableItems.value = [];

        loadingOverlayVisible.value = true;

        RectureApi.getInvitations(page.value-1, 10, fetchAbortController.signal).then(result => {
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

    function showRevokeDialog(item: IInvitation) {
        selectedInvitation.value = item;
        confirmationDialogVisible.value = true;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;

        const invitation = selectedInvitation.value;
        if (invitation == null) return;

        loadingOverlayVisible.value = true;

        RectureApi.deleteInvitation(invitation.invitationId).then(result => {
            if (result.success) {
                if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== invitation);
            } else {
                errorDialogMessage.value = "Failed to revoke invitation.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to revoke invitation.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
            selectedInvitation.value = null;
        });
    }
</script>