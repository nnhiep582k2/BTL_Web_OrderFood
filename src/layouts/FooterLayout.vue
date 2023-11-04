<template>
    <div class="footer">
        <div class="footer-title">Receive Event Notifications</div>
        <p class="input">
            <BaseTextBox
                width="580px"
                placeholder="Enter your email"
                v-model:model-value="emailValue"
                :type="TextBoxType.hasButton"
            />
        </p>
        <div class="wrapper d-flex">
            <BaseListFooter
                v-for="(item, index) in DataListFooter"
                :key="index"
                :title="item.title"
                :datas="item.datas"
                @on-click="handleClickItem(item, $event)"
            />
        </div>
        <div class="d-flex link">
            <BaseIcon :type="IconType.success"
                ><i class="fa-brands fa-facebook-f"></i
            ></BaseIcon>
            <BaseIcon :type="IconType.success"
                ><i class="fa-brands fa-twitter"></i
            ></BaseIcon>
            <BaseIcon :type="IconType.success"
                ><i class="fa-brands fa-instagram"></i
            ></BaseIcon>
            <BaseIcon :type="IconType.success"
                ><i class="fa-brands fa-youtube"></i
            ></BaseIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import BaseListFooter from '@/components/BaseListFooter.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import { DataListFooter } from '@/mocks/ListFooter';
import { TextBoxType } from '@/enums/TextBoxType';
import { ref } from 'vue';
import { IconType } from '@/enums/IconType';
import { useRouter } from 'vue-router';

const router = useRouter();
const emailValue = ref<string>('');

const handleClickQuickLink = (item: any) => {
    if (item == 'Menu')
        router.push({
            name: `${item.toLowerCase()}`,
            params: {
                item: 'all',
            },
        });
    else router.push({ path: `/${item.toLowerCase()}` });
};

const handleClickExtraLink = (item: any) => {
    if (item == 'Login')
        router.push({
            path: '/login',
        });
    else
        router.push({
            path: '/register',
        });
};

const handleClickItem = (item: any, e: any) => {
    switch (item.title) {
        case 'Our Menu':
            console.log(e);
            router.push({
                name: 'menu',
                params: {
                    item: e,
                },
            });
            break;
        case 'Quick Links':
            handleClickQuickLink(e == 'Book A Table' ? 'Table' : e);
            break;
        case 'Extra Links':
            console.log(e);
            handleClickExtraLink(e);
            break;
        default:
            break;
    }
};
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 530px;
    padding: 30px 80px;
    background-color: var(--color-background);
    .footer-title {
        font-weight: 500;
        font-size: 25px;
        margin-bottom: 16px;
    }
    .input {
        margin-bottom: 16px;
    }
    .wrapper {
        width: 100%;
        justify-content: space-between;
    }
    .link {
        margin: 50px 0 0;
    }
}
</style>
