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
                <tr v-for="item in currentPageItems" :key="item.id">
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

        <div v-if="calculatePages > 1" class="action-row">
                    <BaseButton
                        v-if="pageNum != 0"
                        :type="ButtonType.success"
                        text="<"
                        class="action-btn"
                        @click="() => previous()"
                    />
                    <div
                        v-for="(p, i) in calculatePages"
                        :key="i"
                        class="d-inline"
                    >
                        <span
                            v-if="i == pageNum"
                            class="highlight"
                            @click="set(i)"
                            >{{ i + 1 }}</span
                        >
                        <span v-else @click="set(i)">{{ i + 1 }}</span>
                    </div>

                    <BaseButton
                        v-if="pageNum != calculatePages - 1"
                        :type="ButtonType.success"
                        @click="() => next()"
                        text=">"
                        class="action-btn"
                    />
                </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, type PropType, computed } from "vue";
import BaseButton from "./BaseButton.vue";
import { ButtonType } from "@/enums/ButtonType";
import Swal from "sweetalert2";
import http from "@/services/http/http";
import { useStore } from "vuex";
import { SET_LOADING } from "@/stores/storeConstants";
import { router } from "@/router";
import { useRoute } from "vue-router";

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
    entity: {
        type: String,
        required: true,
    },
});
const alert = ref();
const perPage = ref<number>(4);
const pageNum = ref<number>(0);
const buttonAction = [
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
        router.push({ path: `/admin/create-${props.entity.toLowerCase()}` });
    } else if (action === "Edit") {
        router.push({
            path: `/admin/edit-${props.entity.toLowerCase()}`,
            query: { id: item },
        });
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
                    window.location.reload();
                }
            }
        });
    }
};

const currentPageItems = computed(() => {
    return props.items.slice(
        pageNum.value * perPage.value,
        pageNum.value * perPage.value + perPage.value
    );
});

const calculatePages = computed(() => {
    if (props.items.length % perPage.value != 0) {
        return Math.floor(props.items.length / perPage.value) + 1;
    } else {
        return props.items.length / perPage.value;
    }
});

const set = (val) => {
    pageNum.value = val;
};
const next = () => {
    pageNum.value = pageNum.value + 1;
};
const previous = () => {
    pageNum.value = pageNum.value - 1;
};



const handleDelete = async (id: string) => {
    try {
        store.dispatch(SET_LOADING, true);
        const { data } = (
            await http.delete(`/${props.entity}/deleteById/${id}`)
        ).data;
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
    min-height: 100%;
    width: 100px;
    padding: 10px;
    .base-button {
        width: 100%;

        &.warning {
            margin: 10px 0 0 0;
        }
    }
}

.action-row {
        padding-top: 30px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        .action-btn {
            background-color: var(--color-primary);
            padding: 3px;
            border: 2px solid var(--color-primary);
            border-radius: 30%;
            color: white;
        }
        span {
            margin-right: 15px;

            &:hover {
                cursor: pointer;
            }
            &.highlight {
                color: #f38609;
            }
            &:first-of-type {
                margin-left: 15px;
            }
        }
    }
</style>
