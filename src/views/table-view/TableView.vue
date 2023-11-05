<template>
    <div class="table-section p-x-80">
        <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
        <section class="order-section">
            <div class="heading">
                <span class="table-title">Book A Table</span>
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
                @submit="bookATable"
            >
                <div class="row">
                    <div class="input-box">
                        <BaseTextBox
                            width="100%"
                            label="Your name"
                            :inputType="InputType.text"
                            id="uName"
                            v-model:model-value="bookData.clientName"
                        />
                        <p v-if="errorObj.clientNameError.length > 0">
                            {{ errorObj.clientNameError[0] }}
                        </p>
                    </div>
                    <div class="input-box">
                        <BaseTextBox
                            width="100%"
                            label="Your phone number"
                            :inputType="InputType.text"
                            id="uPhone"
                            v-model:model-value="bookData.clientPhone"
                        />
                        <p v-if="errorObj.clientPhoneError.length > 0">
                            {{ errorObj.clientPhoneError[0] }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-box">
                        <BaseTextBox
                            width="100%"
                            label="How many people"
                            id="oPeople"
                            :inputType="InputType.number"
                            v-model:model-value="bookData.numberOfPeople"
                        />
                        <p v-if="errorObj.numberOfPeopleError.length > 0">
                            {{ errorObj.numberOfPeopleError[0] }}
                        </p>
                    </div>
                    <div class="input-box">
                        <BaseTextBox
                            width="100%"
                            label="How many tables"
                            id="oTables"
                            :inputType="InputType.number"
                            v-model:model-value="bookData.numberOfTable"
                        />
                        <p v-if="errorObj.numberOfTableError.length > 0">
                            {{ errorObj.numberOfTableError[0] }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-box">
                        <BaseTextBox
                            width="100%"
                            label="Your Email"
                            id="uEmail"
                            :inputType="InputType.text"
                            v-model:model-value="bookData.clientEmail"
                        />
                        <p v-if="errorObj.clientEmailError.length > 0">
                            {{ errorObj.clientEmailError[0] }}
                        </p>
                    </div>
                    <div class="input-box">
                        <BaseTextBox
                            width="100%"
                            label="When"
                            id="oWhen"
                            :inputType="InputType.datetimeLocal"
                            v-model:model-value="bookData.pickupDate"
                            @click="availableTime()"
                        />
                        <p v-if="errorObj.pickupDateError.length > 0">
                            {{ errorObj.pickupDateError[0] }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="input-box">
                        <BaseTextArea
                            width="100%"
                            height="180px"
                            label="Note"
                            class="m-b-10"
                            v-model:model-value="bookData.note"
                            placeholder="Your message, do you want to decorate your table?"
                        />
                    </div>
                    <div class="input-box">
                        <BaseMap width="100%" height="220" />
                    </div>
                </div>

                <BaseButton text="Book Now" :type="ButtonType.success" />
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ButtonType } from '@/enums/ButtonType';
import VueBasicAlert from 'vue-basic-alert';
import BaseButton from '@/components/BaseButton.vue';
import BaseTextBox from '@/components/BaseTextBox.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import BaseMap from '@/components/BaseMap.vue';
import { InputType } from '@/enums/TextBoxType';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';
import http from '@/services/http/http';

window.scrollTo(0, 0);
document.title = 'Table | Orod - Order Food';

const bookData = {
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    numberOfPeople: '',
    numberOfTable: '',
    note: '',
    createdDate: '',
    createdBy: '',
    modifiedDate: '',
    modifiedBy: '',
    pickupDate: '',
};

const errorObj: any = {
    clientNameError: [],
    clientPhoneError: [],
    clientEmailError: [],
    numberOfPeopleError: [],
    numberOfTableError: [],
    noteError: [],
    pickupDateError: [],
};

const bookATable = async (e) => {
    checkForm();

    try {
        if (checkEmptyErr()) {
            e.preventDefault();
        } else {
            e.preventDefault();

            let data = {
                clientName: bookData.clientName,
                clientPhone: bookData.clientPhone,
                clientEmail: bookData.clientEmail,
                numberOfPeople: Number.parseInt(bookData.numberOfPeople),
                numberOfTable: Number.parseInt(bookData.numberOfTable),
                note: bookData.note,
                pickupDate: bookData.pickupDate,
            };

            await http.post('/Books/addRecord', JSON.stringify(data));

            alert.value
                .showAlert(
                    'success',
                    'Thank you! We will call you soon to confirm your order',
                    'Booking Successfully !'
                )(document.getElementById('bookTableForm') as HTMLFormElement)
                ?.reset();
        }
    } catch (e) {
        notify('Add fail!', TypeToast.error);
    }
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
    errorObj.clientNameError = [];
    errorObj.clientPhoneError = [];
    errorObj.clientEmailError = [];
    errorObj.numberOfPeopleError = [];
    errorObj.numberOfTableError = [];
    errorObj.noteError = [];
    errorObj.pickupDateError = [];
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
    if (!bookData.clientName) {
        errorObj.clientNameError.push('Entering a name is required');
    } else {
        if (!/^[A-Za-z]+$/.test(bookData.clientName.replace(/\s/g, ''))) {
            errorObj.clientNameError.push('A name can only contain letters');
        }
    }

    // Phone validate
    if (!bookData.clientPhone) {
        errorObj.clientPhoneError.push('Entering phone number is required');
    } else {
        if (
            !bookData.clientPhone.startsWith('09') ||
            !bookData.clientPhone.startsWith('03')
        ) {
            errorObj.clientPhoneError.push(
                'Phone numbers must start with 09 or 03'
            );
        }

        if (!/[0-9]{10}/.test(bookData.clientPhone)) {
            errorObj.clientPhoneError.push(
                'Phone numbers can only contain numbers'
            );
        }

        if (bookData.clientPhone.length != 10) {
            errorObj.clientPhoneError.push(
                'Phone numbers must have exactly 10 digits'
            );
        }
    }

    if (!bookData.numberOfPeople) {
        errorObj.peopleErr.push('Entering number of people is required');
    } else {
        if (parseInt(bookData.numberOfPeople) > 100) {
            errorObj.numberOfPeopleError.push(
                'Each store can only serve 100 people at a time'
            );
        }

        if (parseInt(bookData.numberOfPeople) < 1) {
            errorObj.numberOfPeopleError.push(
                'Number of people must be greater than or equal to 1'
            );
        }
    }

    if (!bookData.numberOfTable) {
        errorObj.numberOfTableError.push(
            'Entering number of tables is required'
        );
    } else {
        if (parseInt(bookData.numberOfTable) > 50) {
            errorObj.numberOfTableError.push(
                'Each store can only have maximum 50 tables'
            );
        }

        if (parseInt(bookData.numberOfTable) < 1) {
            errorObj.numberOfTableError.push(
                'Number of tables must be greater than or equal to 1'
            );
        }

        if (
            parseInt(bookData.numberOfPeople) < parseInt(bookData.numberOfTable)
        ) {
            errorObj.numberOfTableError.push(
                'The number of tables must be less than the number of people'
            );
        }
    }

    // if (bookData.clientEmail) {
    //     if (!/[0-9]{10}/.test(bookData.clientEmail)) {
    //         errorObj.clientEmailError.push(
    //             'Card numbers can only contain numbers'
    //         );
    //     }

    //     if (bookData.clientEmail.length != 10) {
    //         errorObj.clientEmailError.push(
    //             'Card number must have exactly 10 digits'
    //         );
    //     }
    // }

    if (!bookData.pickupDate) {
        errorObj.pickupDateError.push('Entering when to serve is required');
    } else {
        let minRange = document.getElementById('oWhen')!.getAttribute('min');
        let maxRange = document.getElementById('oWhen')!.getAttribute('max');
        let dateMin = new Date(minRange!);
        let dateMax = new Date(maxRange!);
        let dateInput = new Date(bookData.pickupDate);

        if (!dateInput) {
            errorObj.pickupDateError.push('Invalid date input');
        }

        if (
            dateInput.getTime() < dateMin.getTime() ||
            dateInput.getTime() > dateMax.getTime()
        ) {
            errorObj.pickupDateError.push(
                'Available reservation range is from now to next two months'
            );
        }

        if (dateInput.getHours() < 7 || dateInput.getHours() > 22) {
            errorObj.pickupDateError.push(
                'Store open from 7:00 AM to 10:00 PM everyday'
            );
        }
    }
};
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
