<template>
    <div class="menu-section p-x-80">
        <div class="heading">
            <span class="menu-title">Menu</span>
            <h3>Our Special Dishes</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <BaseTextBox
                        v-model:model-value="foodObj.name"
                        width="100%"
                        placeholder="Search.."
                    />
                </div>

                <div class="row filter-drop-down">
                    <p>
                        Filter<span v-if="showDropDown">x</span
                        ><span v-else>v</span>
                    </p>
                </div>

                <div class="row filter-heading">
                    <h1>Status</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input
                                type="button"
                                name="cbStatus"
                                id="bsStatus"
                                value="Best Seller"
                                hidden
                            />
                            <label
                                for="bsStatus"
                                class="d-flex justify-content-between"
                                >Best Seller
                                <button
                                    class="unselect-btn"
                                    value="Best Seller"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="cbStatus"
                                id="ooStatus"
                                value="Online Only"
                                hidden
                            />
                            <label
                                for="ooStatus"
                                class="d-flex justify-content-between"
                                >Online Only
                                <button
                                    class="unselect-btn"
                                    value="Online Only"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="cbStatus"
                                id="soStatus"
                                value="Sale Off"
                                hidden
                            />
                            <label
                                for="soStatus"
                                class="d-flex justify-content-between"
                                >Sale Off
                                <button class="unselect-btn" value="Sale Off">
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="cbStatus"
                                id="sdStatus"
                                value="Seasonal Dishes"
                                hidden
                            />
                            <label
                                for="sdStatus"
                                class="d-flex justify-content-between"
                                >Seasonal Dishes
                                <button
                                    class="unselect-btn"
                                    value="Seasonal Dishes"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="cbStatus"
                                id="ndStatus"
                                value="New Dishes"
                                hidden
                            />
                            <label
                                for="ndStatus"
                                class="d-flex justify-content-between"
                                >New Dishes
                                <button class="unselect-btn" value="New Dishes">
                                    X
                                </button></label
                            >
                        </li>
                    </ul>
                    <hr />
                </div>

                <div class="row filter-heading">
                    <h1>Price</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="rtfPrice"
                                value="2,5"
                                hidden
                            />
                            <label
                                for="rtfPrice"
                                class="d-flex justify-content-between"
                                >$2 - $5
                                <button class="unselect-btn">X</button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="rftPrice"
                                value="5,10"
                                hidden
                            />
                            <label
                                for="rftPrice"
                                class="d-flex justify-content-between"
                                >$5 - $10
                                <button class="unselect-btn">X</button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="rttPrice"
                                value="10,12"
                                hidden
                            />
                            <label
                                for="rttPrice"
                                class="d-flex justify-content-between"
                                >$10 - $12
                                <button class="unselect-btn">X</button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="mtPrice"
                                value="12"
                                hidden
                            />
                            <label
                                for="mtPrice"
                                class="d-flex justify-content-between"
                                >{{ '>' }} $12
                                <button class="unselect-btn">X</button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="ltPrice"
                                value="2"
                                hidden
                            />
                            <label
                                for="ltPrice"
                                class="d-flex justify-content-between"
                                >{{ '<' }} $2
                                <button class="unselect-btn">X</button></label
                            >
                        </li>
                    </ul>
                    <hr />
                </div>

                <div class="row filter-heading">
                    <h1>Type</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input
                                type="button"
                                name="rType"
                                id="mType"
                                value="meat"
                                hidden
                            />
                            <label
                                for="mType"
                                class="d-flex justify-content-between"
                                >meat<button class="unselect-btn">
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rType"
                                id="vType"
                                value="vegan"
                                hidden
                            />
                            <label
                                for="vType"
                                class="d-flex justify-content-between"
                                >vegan<button class="unselect-btn">
                                    X
                                </button></label
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-sm-8 p-r-0">
                <div class="row">
                    <div class="menu-tabs">
                        <input
                            type="button"
                            id="allFilterFoodBtn"
                            name="allFilterFoodBtn"
                            value="all"
                            class="menu-tab-item"
                        />
                        <input
                            type="button"
                            id="tacoFilterFoodBtn"
                            name="tacoFilterFoodBtn"
                            class="menu-tab-item"
                            value="taco"
                        />
                        <input
                            type="button"
                            id="burritoFilterFoodBtn"
                            name="burritoFilterFoodBtn"
                            class="menu-tab-item"
                            value="burrito"
                        />
                        <input
                            type="button"
                            id="nachosFilterFoodBtn"
                            name="nachosFilterFoodBtn"
                            class="menu-tab-item"
                            value="nachos"
                        />
                        <input
                            type="button"
                            id="sidesFilterFoodBtn"
                            name="sidesFilterFoodBtn"
                            class="menu-tab-item"
                            value="sides"
                        />
                        <input
                            type="button"
                            id="dessertFilterFoodBtn"
                            name="dessertFilterFoodBtn"
                            class="menu-tab-item"
                            value="dessert"
                        />
                        <input
                            type="button"
                            id="drinkFilterFoodBtn"
                            name="drinkFilterFoodBtn"
                            class="menu-tab-item"
                            value="drink"
                        />
                    </div>
                </div>

                <div class="row box-container">
                    <BaseEmpty v-if="!currentPageItems.length" />

                    <!-- Hiển thị danh sách currentPageItems -->
                    <div
                        v-else
                        v-for="(f, index) in currentPageItems"
                        :key="index"
                    >
                        <div class="box">
                            <a href="" class="fas fa-heart"></a>
                            <div class="image">
                                <img
                                    :src="`/src/assets/images/template/${f?.food_src}`"
                                    alt=""
                                />
                            </div>
                            <div class="content">
                                <h3>{{ f?.food_name }}</h3>
                                <div class="stars">
                                    <div
                                        v-for="s in Math.floor(
                                            parseFloat(f?.food_star)
                                        )"
                                        :key="s"
                                        class="d-inline"
                                    >
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div
                                        v-if="
                                            parseFloat(f?.food_star) -
                                                Math.floor(
                                                    parseFloat(f?.food_star)
                                                ) ==
                                            0.5
                                        "
                                        class="d-inline"
                                    >
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span> ({{ f?.food_vote }}) </span>
                                </div>
                                <div class="desc">
                                    <p>{{ f?.food_desc }}</p>
                                </div>
                                <div class="price">
                                    ${{
                                        parseFloat(f?.food_price) -
                                        parseFloat(f?.food_discount)
                                    }}
                                    <span
                                        v-if="
                                            parseFloat(f?.food_discount) != 0.0
                                        "
                                        >${{ parseFloat(f?.food_price) }}</span
                                    >
                                </div>
                                <BaseButton
                                    class="btn"
                                    :type="ButtonType.success"
                                    @click="() => addItem(index)"
                                    text="Add to cart"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="calculatePages > 1" class="action-row">
                    <BaseButton
                        v-if="pageNum != 0"
                        :type="ButtonType.success"
                        text="<"
                        class="action-btn"
                    />
                    <div
                        v-for="(p, i) in calculatePages"
                        :key="i"
                        class="d-inline"
                    >
                        <span v-if="i == pageNum" class="highlight">{{
                            i + 1
                        }}</span>
                        <span v-else>{{ i + 1 }}</span>
                    </div>

                    <BaseButton
                        v-if="pageNum != calculatePages - 1"
                        :type="ButtonType.success"
                        text=">"
                        class="action-btn"
                    />
                </div>
            </div>
        </div>

        <QuickView v-if="showQuickView" :food="sendId">
            <BaseButton
                class="btn"
                text="X"
                :type="ButtonType.success"
                @click="closeView"
            />
        </QuickView>
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import { reactive, ref, computed } from 'vue';
import BaseEmpty from '@/components/BaseEmpty.vue';
import BaseButton from '@/components/BaseButton.vue';
import QuickView from './QuickView.vue';
import { ButtonType } from '@/enums/ButtonType';

window.scrollTo(0, 0);

document.title = 'Menu | Orod - Order Food';

interface IFoodObj {
    name: string;
    category: string;
    status: [];
    price: string;
    type: string;
}

interface IcurrentPageItems {
    food_src: string;
    food_name: string;
    food_star: string;
    food_vote: string;
    food_desc: string;
    food_price: string;
    food_discount: string;
}

const foodObj = reactive<IFoodObj>({
    name: '',
    category: '',
    status: [],
    price: '',
    type: '',
});

const showQuickView = ref<boolean>(false);
const showDropDown = ref<boolean>(false);
const endId = ref<string | null>(null);
const sendId = ref<string | undefined>();
const perPage = ref<number>(6);
const pageNum = ref<number>(0);
const previousCategoryClicked = ref<string>('');
const previousPriceClicked = ref<string>('');
const previousTypeClicked = ref<string>('');

const filterFoods = computed(() => {
    return Array;
});

const currentPageItems = computed<IcurrentPageItems[]>(() => {
    return [
        {
            food_src: '',
            food_name: '',
            food_star: '2',
            food_vote: '',
            food_desc: '',
            food_price: '',
            food_discount: '',
        },
        {
            food_src: '',
            food_name: '',
            food_star: '5',
            food_vote: '',
            food_desc: '',
            food_price: '',
            food_discount: '',
        },
    ];
});

const calculatePages = computed(() => {
    return 10;
});

const addItem = (index: Number) => {
    showQuickView.value = true;
};
const closeView = () => {
    showQuickView.value = false;
};
</script>

<style lang="scss" scoped>
@import url(./MenuStyle.scss);
</style>
