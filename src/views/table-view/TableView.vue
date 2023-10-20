<template>
    <div class="table-view p-x-80">
        <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
        <section class="order-section">
            <div class="heading">
                <span>Book A Table</span>
                <h3>Enjoy your moment</h3>
            </div>

            <div class="icons-container">
                <div class="icons">
                    <img src="/src/assets/images/template/icon-1.png" alt="" />
                    <h3>7:00am to 10:00pm</h3>
                </div>
                <div class="icons">
                    <img src="/src/assets/images/template/icon-2.png" alt="" />
                    <h3>+84 123 123 123</h3>
                </div>
                <div class="icons">
                    <img src="/src/assets/images/template/icon-3.png" alt="" />
                    <h3>02 Duong Khue, Cau Giay, Ha Noi, Viet Nam</h3>
                </div>
            </div>

            <!-- booking form -->
            <form
                id="bookTableForm"
                novalidate
                autocomplete="off"
                @submit="handleSubmit"
            >
                <div class="row">
                    <div class="input-box">
                        <BaseTextBox
                            :inputType="InputType.text"
                            v-model:model-value="orderObj.name"
                            label="Your name"
                        />
                        <p v-if="errorObj.nameErr.length > 0">
                            {{ errorObj.nameErr[0] }}
                        </p>
                    </div>
                    <div class="input-box">
                        <BaseTextBox
                            :inputType="InputType.text"
                            v-model:model-value="orderObj.phone"
                            label="Your phone number"
                        />
                        <p v-if="errorObj.phoneErr.length > 0">
                            {{ errorObj.phoneErr[0] }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-box">
                        <BaseTextBox
                            :inputType="InputType.text"
                            v-model:model-value="orderObj.people"
                            label="How many people"
                        />
                        <p v-if="errorObj.peopleErr.length > 0">
                            {{ errorObj.peopleErr[0] }}
                        </p>
                    </div>
                    <div class="input-box">
                        <BaseTextBox
                            :inputType="InputType.number"
                            v-model:model-value="orderObj.tables"
                            label="How many tables"
                        />
                        <p v-if="errorObj.tablesErr.length > 0">
                            {{ errorObj.tablesErr[0] }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-box">
                        <BaseTextBox
                            :inputType="InputType.text"
                            v-model:model-value="orderObj.card"
                            label="Your membership card"
                        />
                        <p v-if="errorObj.cardErr.length > 0">
                            {{ errorObj.cardErr[0] }}
                        </p>
                    </div>
                    <div class="input-box">
                        <BaseTextBox
                            :inputType="InputType.datetimeLocal"
                            v-model:model-value="orderObj.when"
                            label="When"
                            @click="availableTime()"
                        />
                        <p v-if="errorObj.whenErr.length > 0">
                            {{ errorObj.whenErr[0] }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-box">
                        <BaseTextArea
                            label="Note"
                            class="m-b-10"
                            v-model:model-value="orderObj.note"
                            placeholder="Your message, do you want to decorate your table?"
                        />
                    </div>
                    <BaseMap width="400" height="300" />
                </div>

                <BaseButton text="Book Now" :type="ButtonType.success" />
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { ButtonType } from '@/enums/ButtonType';
import VueBasicAlert from 'vue-basic-alert';
import BaseButton from '@/components/BaseButton.vue';
import BaseTextBox from '@/components/BaseTextBox.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import BaseMap from '@/components/BaseMap.vue';
import { InputType } from '@/enums/TextBoxType';

window.scrollTo(0, 0);

const orderObj = {
    name: '',
    phone: '',
    people: '',
    tables: '',
    card: '',
    when: '',
    note: '',
};

const errorObj: any = {
    nameErr: [],
    phoneErr: [],
    peopleErr: [],
    tablesErr: [],
    cardErr: [],
    whenErr: [],
};

const availableTime = () => {
    let now = new Date();
    let day = ('0' + now.getDate()).slice(-2);
    let currentMonth = ('0' + (now.getMonth() + 1)).slice(-2);
    let maxMonth = ('0' + (now.getMonth() + 3)).slice(-2);
    let hour = ('0' + now.getHours()).slice(-2);
    let min = ('0' + now.getMinutes()).slice(-2);
    let minRange =
        now.getFullYear() +
        '-' +
        currentMonth +
        '-' +
        day +
        'T' +
        hour +
        ':' +
        min;
    var maxRange =
        now.getFullYear() + '-' + maxMonth + '-' + day + 'T' + hour + ':' + min;

    document.getElementById('oWhen')?.setAttribute('min', minRange);
    document.getElementById('oWhen')?.setAttribute('max', maxRange);
};

const resetCheckErr = () => {
    errorObj.nameErr = [];
    errorObj.phoneErr = [];
    errorObj.peopleErr = [];
    errorObj.tablesErr = [];
    errorObj.cardErr = [];
    errorObj.whenErr = [];
};

const checkEmptyErr = () => {
    for (var typeErr in errorObj) {
        if (errorObj[typeErr].length != 0) {
            return false;
        }
    }
    return true;
};

const alert = ref();

const checkForm = () => {
    resetCheckErr();

    // Name validate
    if (!orderObj.name) {
        errorObj.nameErr.push('Entering a name is required');
    } else {
        if (!/^[A-Za-z]+$/.test(orderObj.name.replace(/\s/g, ''))) {
            errorObj.nameErr.push('A name can only contain letters');
        }
    }

    // Phone validate
    if (!orderObj.phone) {
        errorObj.phoneErr.push('Entering phone number is required');
    } else {
        if (!orderObj.phone.startsWith('84')) {
            errorObj.phoneErr.push('Phone numbers must start with 84');
        }

        if (!/[0-9]{10}/.test(orderObj.phone)) {
            errorObj.phoneErr.push('Phone numbers can only contain numbers');
        }

        if (orderObj.phone.length != 11) {
            errorObj.phoneErr.push('Phone numbers must have exactly 11 digits');
        }
    }

    if (!orderObj.people) {
        errorObj.peopleErr.push('Entering number of people is required');
    } else {
        if (parseInt(orderObj.people) > 100) {
            errorObj.peopleErr.push(
                'Each store can only serve 100 people at a time'
            );
        }

        if (parseInt(orderObj.people) < 1) {
            errorObj.peopleErr.push(
                'Number of people must be greater than or equal to 1'
            );
        }
    }

    if (!orderObj.tables) {
        errorObj.tablesErr.push('Entering number of tables is required');
    } else {
        if (parseInt(orderObj.tables) > 50) {
            errorObj.tablesErr.push(
                'Each store can only have maximum 50 tables'
            );
        }

        if (parseInt(orderObj.tables) < 1) {
            errorObj.tablesErr.push(
                'Number of tables must be greater than or equal to 1'
            );
        }

        if (parseInt(orderObj.people) < parseInt(orderObj.tables)) {
            errorObj.tablesErr.push(
                'The number of tables must be less than the number of people'
            );
        }
    }

    if (orderObj.card) {
        if (!/[0-9]{10}/.test(orderObj.card)) {
            errorObj.cardErr.push('Card numbers can only contain numbers');
        }

        if (orderObj.card.length != 10) {
            errorObj.cardErr.push('Card number must have exactly 10 digits');
        }
    }

    if (!orderObj.when) {
        errorObj.whenErr.push('Entering when to serve is required');
    } else {
        let minRange = document.getElementById('oWhen')!.getAttribute('min');
        let maxRange = document.getElementById('oWhen')!.getAttribute('max');
        let dateMin = new Date(minRange!);
        let dateMax = new Date(maxRange!);
        let dateInput = new Date(orderObj.when);

        if (!dateInput) {
            errorObj.whenErr.push('Invalid date input');
        }

        if (
            dateInput.getTime() < dateMin.getTime() ||
            dateInput.getTime() > dateMax.getTime()
        ) {
            errorObj.whenErr.push(
                'Available reservation range is from now to next two months'
            );
        }

        if (dateInput.getHours() < 7 || dateInput.getHours() > 22) {
            errorObj.whenErr.push(
                'Store open from 7:00 AM to 10:00 PM everyday'
            );
        }
    }
};

const handleSubmit = async (e) => {
    checkForm();

    if (!checkEmptyErr()) {
        e.preventDefault();
    } else {
        e.preventDefault();

        let data = {
            book_name: orderObj.name,
            book_phone: parseInt(orderObj.phone),
            book_people: parseInt(orderObj.people),
            book_tables: parseInt(orderObj.tables),
            user_id: parseInt(orderObj.card),
            book_when: orderObj.when,
            book_note: orderObj.note,
        };

        await axios.post('/booking', data);

        alert.value
            .showAlert(
                'success',
                'Thank you! We will call you soon to confirm your order',
                'Booking Successfully !'
            )(document.getElementById('bookTableForm') as HTMLFormElement)
            ?.reset();
    }
};
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
