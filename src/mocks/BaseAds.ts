import { ButtonType } from '@/enums/ButtonType';
import Ads1 from '/src/assets/images/template/dis-1.jpg';
import Ads2 from '/src/assets/images/template/dis-2.png';
import Ads3 from '/src/assets/images/template/dis-3.jpg';

interface IBaseAds {
    src: string;
    title: string;
    discount: string;
    button: {
        text: string;
        type: ButtonType;
    };
}

export const DataBaseAds: IBaseAds[] = [
    {
        src: Ads1,
        title: 'Special Offer',
        discount: 'Upto 50% Off',
        button: {
            text: 'Order Now',
            type: ButtonType.success,
        },
    },
    {
        src: Ads2,
        title: 'Special Offer',
        discount: 'Upto 25% Extra',
        button: {
            text: 'Order Now',
            type: ButtonType.success,
        },
    },
    {
        src: Ads3,
        title: 'Limited Offer',
        discount: 'Upto 100% Cashback',
        button: {
            text: 'Order Now',
            type: ButtonType.success,
        },
    },
];
