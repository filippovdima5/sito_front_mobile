export const genderDetected = {
  page: {
    1: 'https://cdn-static.farfetch-contents.com/content/images/Home_CMS/2019-November-Seasonal/MW/Genderless-HP_MW_LRG_480x320.jpg', // url img
    2: 'https://cdn-static.farfetch-contents.com/content/images/Home_CMS/2019-November-Seasonal/WW/Genderless-HP_WW_LRG_480x320.jpg', // url img
  },
  menu: {
    1: 'http:localhost', // url img
    2: 'http:localhost' // url img
  }
} as const

export const homePage = {
  clothes: {
    1: {
      1001: { title: 'Футболки и поло',  img: '' },
      1002: 'Рубашки',
      1003: 'Толстовки и свитеры',
      1004: 'Костюмы и пиджаки',
      1005: 'Джинсы и одежда из денима',
      1006: 'Брюки и чиносы',
      1007: 'Шорты',
      1010: 'Куртки',
      1011: 'Пальто',
      1012: 'Спорт',
      1013: 'Нижнее белье и носки',
    },

    2: {
      1001: { title: 'Футболки и поло', img: '' },
      1002: 'Рубашки и блузы',
      1003: 'Толстовки и свитеры',
      1004: 'Костюмы, пиджаки и жакеты',
      1005: 'Джинсы и одежда из денима',
      1006: 'Брюки и леггинсы',
      1007: 'Шорты',
      1008: 'Платья и сарафаны',
      1009: 'Юбки',
      1010: 'Куртки',
      1011: 'Пальто, шубы и дубленки',
      1012: 'Спорт',
    }
  },
  shoes: {
    1: {
      2001: { title: 'Кеды и кроссовки', img: '' },
      2002: 'Ботинки и сапоги',
      2003: 'Туфли',
      2004: 'Лоферы и мокасины',
      2005: 'Летняя обувь',
    },
    2: {
      2001:  { title: 'Кеды и кроссовки', img: '' },
      2002: 'Ботинки и сапоги',
      2003: 'Туфли',
      2004: 'Лоферы',
      2005: 'Летняя обувь',
    }
  },
  accessories: {
    1: {
      3001: { title: 'Сумки и рюкзаки',  img: '' },
      3002: 'Кошельки и визитницы',
      3004: 'Головные уборы',
      3005: 'Шарфы и платки',
      3006: 'Перчатки и варежки',
      3007: 'Украшения и часы',
      3008: 'Очки',
      3009: 'Ремни',
      3010: 'Галстуки и бабочки',
      3011: 'Зонты'
    },
    2: {
      3001: { title: 'Сумки и рюкзаки', img: '' },
      3002: 'Кошельки и визитницы',
      3003: 'Косметички',
      3004: 'Головные уборы',
      3005: 'Шарфы и платки',
      3006: 'Перчатки и варежки',
      3007: 'Украшения и часы',
      3008: 'Очки',
      3009: 'Ремни',
      3011: 'Зонты'
    }
  },
  
  //пока так:
  clothes_default: [1001], 
  shoes_default: [2001],
  accessories_default: [3001],
  brands_default :  {
    1: [{ title: 'Convers',  img: '' }],
    2: [{ title: 'Convers',  img: '' }]
  },
} as const