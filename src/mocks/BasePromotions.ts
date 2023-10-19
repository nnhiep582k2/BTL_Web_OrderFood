import { ButtonType } from '@/enums/ButtonType';
import Ads1 from '@/assets/images/demo/dis-1.jpg';
import Ads2 from '@/assets/images/demo/dis-2.png';
import Ads3 from '@/assets/images/demo/dis-3.jpg';

interface IDataBasePromotions {
    src: string;
    title: string;
    datas: string[];
    button?: {
        type: ButtonType;
        text: string;
    };
}

export const DataBasePromotions: IDataBasePromotions[] = [
    {
        src: Ads1,
        title: 'Party Taco Upto 50% Off',
        datas: [
            'Order More Than 10 Tacos Will Get Discount 50%',
            'Only Weekend Night',
            'Only Online Payment Method',
        ],
    },
    {
        src: Ads2,
        title: 'Happy Lunch Upto 25% Extra',
        datas: [
            'Free Up Size Burrito',
            'Only Lunch From 10am To 2pm',
            'Only Delivery',
        ],
    },
    {
        src: Ads3,
        title: 'New Drink 100% Cashback',
        datas: [
            'Free 01 Michelada When Total Bill More Than $20',
            'From 23/11/2021 To 12/12/2021',
            'Only Online Payment Method',
        ],
    },
];
