<template>
    <vue-basic-alert :duration="300" :closeIn="300" ref="alert" />
    <div class="table-responsive">
        <table class="table colored-header datatable project-list">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td v-for="header in headers" :key="header">
                        {{ item[header] }}
                    </td>
                    <td class="action">
                        <BaseButton
                            v-for="(btn, i) in buttonAction"
                            :key="i"
                            :type="btn.type"
                            :text="btn.text"
                            @click="
                                handleActionClick(
                                    btn.text,
                                    item[headers[0]],
                                    item[headers[1]]
                                )
                            "
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { ref, type PropType } from "vue";
import BaseButton from "./BaseButton.vue";
import { ButtonType } from "@/enums/ButtonType";
import Swal from "sweetalert2";
import http from "@/services/http/http";
import { useStore } from "vuex";
import { SET_LOADING } from "@/stores/storeConstants";
import { router } from '@/router';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const props = defineProps({
    headers: {
        type: Array as PropType<string[]>,
        required: true,
    },
    items: {
        type: Array as PropType<any[]>,
        required: true,
    },
});
const alert = ref();
const buttonAction = [
    {
        text: "Add",
        type: ButtonType.success,
    },
    {
        text: "Edit",
        type: ButtonType.information,
    },
    {
        text: "Delete",
        type: ButtonType.warning,
    },
];

const handleActionClick = (action: string, item: any, data: string) => {
    if (action === "Add") {
    } else if (action === "Edit") {
    } else if (action === "Delete") {
        Swal.fire({
            title: `Are you sure you want to delete this ${data}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (await handleDelete(item)) {
                    Swal.fire("Deleted!", "Delete successfully.", "success");
                    window.location.reload()
                }
            }
        });
    }
};

const handleDelete = async (id: string) => {
    try {
        store.dispatch(SET_LOADING, true);
        const { data } = (await http.delete("/Auth/deleteById/" + id)).data;
        store.dispatch(SET_LOADING, false);
        return data;
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    }
};
</script>

<style scoped lang="scss">
.table-responsive {
    margin-top: 10px;
}

.project-list > tbody > tr > td {
    padding: 12px 8px;
    border: 1px solid #ccc;
}

.project-list > tbody > tr > td .avatar {
    width: 22px;
    border: 1px solid #dee2e6;
}

.table thead th {
    vertical-align: bottom;
    border: 1px solid #dee2e6;
}

.table td,
.table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

.action {
    display: flex;
    column-gap: 2px;
    height: 100%;
}
</style>
