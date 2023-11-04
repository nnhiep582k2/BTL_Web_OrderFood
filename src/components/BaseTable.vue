<template>
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
                            v-for="(btn, index) in buttonAction"
                            :key="index"
                            :type="btn.type"
                            :text="btn.text"
                            @click="handleActionClick(item.text, item)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import BaseButton from './BaseButton.vue';
import { ButtonType } from '@/enums/ButtonType';

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

const buttonAction = [
    {
        text: 'Add',
        type: ButtonType.success,
    },
    {
        text: 'Edit',
        type: ButtonType.information,
    },
    {
        text: 'Delete',
        type: ButtonType.warning,
    },
];

const handleActionClick = (action: string, item: any) => {
    if (action === 'Add') {
    } else if (action === 'Edit') {
    } else if (action === 'Delete') {
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
    align-items: center;
    justify-content: center;
    column-gap: 2px;
}
</style>
