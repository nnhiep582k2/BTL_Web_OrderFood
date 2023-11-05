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
                                @click="filterStatusBtn($event)"
                            />
                            <label
                                for="bsStatus"
                                class="d-flex justify-content-between"
                                >Best Seller
                                <button
                                    class="unselect-btn"
                                    value="Best Seller"
                                    @click="unselectStatusBtn($event)"
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
                                @click="filterStatusBtn($event)"
                            />
                            <label
                                for="ooStatus"
                                class="d-flex justify-content-between"
                                >Online Only
                                <button
                                    class="unselect-btn"
                                    value="Online Only"
                                    @click="unselectStatusBtn($event)"
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
                                @click="filterStatusBtn($event)"
                            />
                            <label
                                for="soStatus"
                                class="d-flex justify-content-between"
                                >Sale Off
                                <button
                                    class="unselect-btn"
                                    value="Sale Off"
                                    @click="unselectStatusBtn($event)"
                                >
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
                                @click="filterStatusBtn($event)"
                            />
                            <label
                                for="sdStatus"
                                class="d-flex justify-content-between"
                                >Seasonal Dishes
                                <button
                                    class="unselect-btn"
                                    value="Seasonal Dishes"
                                    @click="unselectStatusBtn($event)"
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
                                @click="filterStatusBtn($event)"
                            />
                            <label
                                for="ndStatus"
                                class="d-flex justify-content-between"
                                >New Dishes
                                <button
                                    class="unselect-btn"
                                    value="New Dishes"
                                    @click="unselectStatusBtn($event)"
                                >
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
                                @click="filterPriceBtn($event)"
                            />
                            <label
                                for="rtfPrice"
                                class="d-flex justify-content-between"
                                >$2 - $5
                                <button
                                    class="unselect-btn"
                                    @click="unselectPriceBtn($event)"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="rftPrice"
                                value="5,10"
                                hidden
                                @click="filterPriceBtn($event)"
                            />
                            <label
                                for="rftPrice"
                                class="d-flex justify-content-between"
                                >$5 - $10
                                <button
                                    class="unselect-btn"
                                    @click="unselectPriceBtn($event)"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="rttPrice"
                                value="10,12"
                                hidden
                                @click="filterPriceBtn($event)"
                            />
                            <label
                                for="rttPrice"
                                class="d-flex justify-content-between"
                                >$10 - $12
                                <button
                                    class="unselect-btn"
                                    @click="unselectPriceBtn($event)"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="mtPrice"
                                value="12"
                                hidden
                                @click="filterPriceBtn($event)"
                            />
                            <label
                                for="mtPrice"
                                class="d-flex justify-content-between"
                                >{{ '>' }} $12
                                <button
                                    class="unselect-btn"
                                    @click="unselectPriceBtn($event)"
                                >
                                    X
                                </button></label
                            >
                        </li>

                        <li>
                            <input
                                type="button"
                                name="rPrice"
                                id="ltPrice"
                                value="2"
                                hidden
                                @click="filterPriceBtn($event)"
                            />
                            <label
                                for="ltPrice"
                                class="d-flex justify-content-between"
                                >{{ '<' }} $2
                                <button
                                    class="unselect-btn"
                                    @click="unselectPriceBtn($event)"
                                >
                                    X
                                </button></label
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
                                @click="filterTypeBtn($event)"
                            />
                            <label
                                for="mType"
                                class="d-flex justify-content-between"
                                >meat<button
                                    class="unselect-btn"
                                    @click="unselectTypeBtn($event)"
                                >
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
                                @click="filterTypeBtn($event)"
                            />
                            <label
                                for="vType"
                                class="d-flex justify-content-between"
                                >vegan<button
                                    class="unselect-btn"
                                    @click="unselectTypeBtn($event)"
                                >
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
                            @click="filterFoodBtn($event)"
                        />
                        <input
                            type="button"
                            id="tacoFilterFoodBtn"
                            name="tacoFilterFoodBtn"
                            class="menu-tab-item"
                            value="taco"
                            @click="filterFoodBtn($event)"
                        />
                        <input
                            type="button"
                            id="burritoFilterFoodBtn"
                            name="burritoFilterFoodBtn"
                            class="menu-tab-item"
                            value="burrito"
                            @click="filterFoodBtn($event)"
                        />
                        <input
                            type="button"
                            id="nachosFilterFoodBtn"
                            name="nachosFilterFoodBtn"
                            class="menu-tab-item"
                            value="nachos"
                            @click="filterFoodBtn($event)"
                        />
                        <input
                            type="button"
                            id="sidesFilterFoodBtn"
                            name="sidesFilterFoodBtn"
                            class="menu-tab-item"
                            value="sides"
                            @click="filterFoodBtn($event)"
                        />
                        <input
                            type="button"
                            id="dessertFilterFoodBtn"
                            name="dessertFilterFoodBtn"
                            class="menu-tab-item"
                            value="dessert"
                            @click="filterFoodBtn($event)"
                        />
                        <input
                            type="button"
                            id="drinkFilterFoodBtn"
                            name="drinkFilterFoodBtn"
                            class="menu-tab-item"
                            value="drink"
                            @click="filterFoodBtn($event)"
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
                                <img :src="f?.url" alt="" />
                            </div>
                            <div class="content">
                                <h3>{{ f?.foodName }}</h3>
                                <div class="stars">
                                    <div
                                        v-for="s in Math.floor(
                                            parseFloat(f?.foodStar)
                                        )"
                                        :key="s"
                                        class="d-inline"
                                    >
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div
                                        v-if="
                                            parseFloat(f?.foodStar) -
                                                Math.floor(
                                                    parseFloat(f?.foodStar)
                                                ) ==
                                            0.5
                                        "
                                        class="d-inline"
                                    >
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span> ({{ f?.foodVote }}) </span>
                                </div>
                                <div class="desc">
                                    <p>{{ f?.foodDesc }}</p>
                                </div>
                                <div class="price">
                                    ${{
                                        parseFloat(f?.price) -
                                        parseFloat(f?.foodDiscount)
                                    }}
                                    <span
                                        v-if="
                                            parseFloat(f?.foodDiscount) != 0.0
                                        "
                                        >${{ parseFloat(f?.price) }}</span
                                    >
                                </div>
                                <BaseButton
                                    class="btn"
                                    :type="ButtonType.success"
                                    text="Add to cart"
                                    @click="() => addItem(index)"
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
import { useStore } from 'vuex';

window.scrollTo(0, 0);
document.title = 'Menu | Orod - Order Food';

const store = useStore();

interface IFoodObj {
    name: string;
    category: string;
    status: string[];
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
const perPage = ref<number>(1);
const pageNum = ref<number>(0);
const previousCategoryClicked = ref<Event | string | null | any>('');
const previousPriceClicked = ref<Event | string | null | any>('');
const previousTypeClicked = ref<Event | string | null | any>('');

const allFoods = computed(() => store.state.allFoods);
const filterFoods = computed(() => {
    return allFoods.value.filter(
        (f) =>
            f.foodName.toLowerCase().match(foodObj.name.toLowerCase()) &&
            evaluateStatus(f, foodObj.status) &&
            evaluatePrice(f, foodObj.price) &&
            f.foodType.toLowerCase().match(foodObj.type.toLowerCase()) &&
            (f.name.match(foodObj.category) ||
                foodObj.category == 'all' ||
                foodObj.category == '')
    );
});

const currentPageItems = computed(() => {
    return filterFoods.value.slice(
        pageNum.value * perPage.value,
        pageNum.value * perPage.value + perPage.value
    );
});

const calculatePages = computed(() => {
    if (filterFoods.value.length % perPage.value != 0) {
        return Math.floor(filterFoods.value.length / perPage.value) + 1;
    } else {
        return filterFoods.value.length / perPage.value;
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

const checkSale = (food, statusArray) => {
    if (statusArray.includes('Sale Off')) {
        if (parseFloat(food.foodDiscount) > 0) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};
const checkBest = (food, statusArray) => {
    if (statusArray.includes('Best Seller')) {
        if (food.foodStatus.toLowerCase().includes('best seller')) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};

const checkOnl = (food, statusArray) => {
    if (statusArray.includes('Online Only')) {
        if (food.foodStatus.toLowerCase().includes('online only')) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};

const checkSeason = (food, statusArray) => {
    if (statusArray.includes('Seasonal Dishes')) {
        if (food.foodStatus.toLowerCase().includes('seasonal dishes')) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};
const checkNew = (food, statusArray) => {
    if (statusArray.includes('New Dishes')) {
        if (food.foodStatus.toLowerCase().includes('new dishes')) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};

const evaluateStatus = (food, statusArray) => {
    pageNum.value = 0;
    if (statusArray.length != 0) {
        if (
            checkSale(food, statusArray) &&
            checkBest(food, statusArray) &&
            checkNew(food, statusArray) &&
            checkSeason(food, statusArray) &&
            checkOnl(food, statusArray)
        ) {
            return food;
        }
    } else {
        return food;
    }
};

const evaluatePrice = (food, priceRange) => {
    pageNum.value = 0;
    var cal = parseFloat(food.price) - parseFloat(food.foodDiscount);
    if (priceRange == '2,5') {
        if (2 <= cal && cal <= 5) {
            return food;
        }
    } else if (priceRange == '5,10') {
        if (5 <= cal && cal <= 10) {
            return food;
        }
    } else if (priceRange == '10,12') {
        if (10 <= cal && cal <= 12) {
            return food;
        }
    } else if (priceRange == '2') {
        if (cal <= 2) {
            return food;
        }
    } else if (priceRange == '12') {
        if (cal >= 12) {
            return food;
        }
    } else if (priceRange == '') {
        return food;
    }
};

const filterStatusBtn = (e: Event) => {
    pageNum.value = 0;

    const targetElement = e.target as HTMLInputElement;

    if (
        targetElement &&
        foodObj &&
        foodObj.status.includes(targetElement.value) == false
    ) {
        foodObj.status.push(targetElement.value);

        const labelElement = document.querySelector(
            `[for=${targetElement.id}]`
        ) as HTMLLabelElement;

        if (labelElement) {
            labelElement.style.background = '#057835fa';
            labelElement.style.color = 'white';

            const buttonElement = labelElement.querySelector(
                ':scope > button'
            ) as HTMLElement;

            if (buttonElement) {
                buttonElement.style.display = 'block';
            }
        }
    }
};

const filterPriceBtn = (e: Event) => {
    pageNum.value = 0; // Assuming pageNum.value is a string
    foodObj.price = '';
    foodObj.price += (e.target as HTMLInputElement).value; // Assuming e.target is an input element

    const targetLabel = document.querySelector(
        `[for=${(e.target as HTMLElement).id}]`
    ) as HTMLLabelElement;
    targetLabel.style.background = '#057835fa';
    targetLabel.style.color = 'white';

    const targetButton = targetLabel.querySelector(
        ':scope > button'
    ) as HTMLButtonElement;
    targetButton.style.display = 'block';

    if (previousPriceClicked.value !== '') {
        const previousTargetLabel = document.querySelector(
            `[for=${(previousPriceClicked.value?.target as HTMLElement).id}]`
        ) as HTMLLabelElement;
        previousTargetLabel.style.background = 'inherit';
        previousTargetLabel.style.color = 'inherit';

        const previousTargetButton = previousTargetLabel.querySelector(
            ':scope > button'
        ) as HTMLButtonElement;
        previousTargetButton.style.display = 'none';
    }
    previousPriceClicked.value = e;
};

const filterTypeBtn = (e: Event) => {
    pageNum.value = 0;
    foodObj.type = '';
    foodObj.type += (e.target as HTMLInputElement).value;
    const targetLabel = document.querySelector(
        `[for=${(e.target as HTMLElement).id}]`
    ) as HTMLLabelElement;
    targetLabel.style.background = '#057835fa';
    targetLabel.style.color = 'white';

    const targetButton = targetLabel.querySelector(
        ':scope > button'
    ) as HTMLButtonElement;
    targetButton.style.display = 'block';
    if (previousTypeClicked.value != '') {
        const previousTargetLabel = document.querySelector(
            `[for=${(previousTypeClicked.value?.target as HTMLElement).id}]`
        ) as HTMLLabelElement;
        previousTargetLabel.style.background = 'inherit';
        previousTargetLabel.style.color = 'inherit';

        const previousTargetButton = previousTargetLabel.querySelector(
            ':scope > button'
        ) as HTMLButtonElement;
        previousTargetButton.style.display = 'none';
    }
    previousTypeClicked.value = e;
};

const filterFoodBtn = (e) => {
    pageNum.value = 0;
    if (
        foodObj.category != e.target.value &&
        previousCategoryClicked.value != ''
    ) {
        (
            previousCategoryClicked.value?.target as HTMLElement
        ).style.background = '#27ae60';
    }
    foodObj.category = e.target.value;
    previousCategoryClicked.value = e;
    e.target.style.background = '#057835fa';
};

const unselectStatusBtn = (e) => {
    pageNum.value = 0;
    foodObj.status = foodObj.status.filter(function (a) {
        return a !== e.target.value;
    });
    e.target.parentNode.style.background = 'inherit';
    e.target.parentNode.style.color = 'inherit';
    e.target.parentNode.querySelector(':scope > button').style.display = 'none';
};
const unselectPriceBtn = (e) => {
    pageNum.value = 0;
    foodObj.price = '';
    e.target.parentNode.style.background = 'inherit';
    e.target.parentNode.style.color = 'inherit';
    e.target.parentNode.querySelector(':scope > button').style.display = 'none';
    previousPriceClicked.value = e;
};

const unselectTypeBtn = (e) => {
    pageNum.value = 0;
    foodObj.type = '';
    e.target.parentNode.style.background = 'inherit';
    e.target.parentNode.style.color = 'inherit';
    e.target.parentNode.querySelector(':scope > button').style.display = 'none';
    previousTypeClicked.value = e;
};

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
