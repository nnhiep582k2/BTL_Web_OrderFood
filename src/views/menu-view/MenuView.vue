<template>
    <div class="menu-section">
        <div class="heading">
            <span>Menu</span>
            <h3>Our Special <Dfn></Dfn>Dishes</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <BaseTextBox
                        v-model:model-value="foodObj.name"
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
                    <!-- Hiển thị danh sách currentPageItems -->
                    <BaseEmpty />
                </div>
                <div v-if="calculatePages > 1" class="action-row">
                    <button v-if="pageNum != 0" class="action-btn">
                        {{ '<' }}
                    </button>
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
                    <button
                        v-if="pageNum != calculatePages - 1"
                        class="action-btn"
                    >
                        {{ '>' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- <QuickView v-if="showQuickView" :food="sendId">
            <button class="btn">X</button>
        </QuickView> -->
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import { reactive, ref, computed } from 'vue';
import BaseEmpty from '@/components/BaseEmpty.vue';

/**----------interface----------*/
interface IFoodObj {
    name: string;
    category: string;
    status: [];
    price: string;
    type: string;
}

/**----------variable----------*/
const foodObj = reactive<IFoodObj>({
    name: '',
    category: '',
    status: [],
    price: '',
    type: '',
});

const showQuickView = ref<Boolean>(false);
const showDropDown = ref<Boolean>(false);
const endId = ref<string | null>(null);
const perPage = ref<Number>(6);
const pageNum = ref<Number>(0);
const previousCategoryClicked = ref<String>('');
const previousPriceClicked = ref<String>('');
const previousTypeClicked = ref<String>('');

/**----------computed----------*/
const filterFoods = computed(() => {
    return Array;
});
const currentPageItems = computed(() => {});

const calculatePages = computed(() => {
    return 0;
});
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
