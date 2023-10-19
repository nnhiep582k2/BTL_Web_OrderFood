export interface ListFooter {
    title: string;
    datas: string[];
}

export const DataListFooter: ListFooter[] = [
    {
        title: 'Our Menu',
        datas: ['Taco', 'Burrito', 'Nachos', 'Side Food', 'Dessert', 'Drink'],
    },
    {
        title: 'Quick Links',
        datas: ['Home', 'About', 'Promotions', 'Menu', 'Book A Table'],
    },
    {
        title: 'Extra Links',
        datas: ['Login', 'Register'],
    },
    {
        title: 'Opening Hours',
        datas: ['Everyday : 7:00am To 10:00pm'],
    },
];
