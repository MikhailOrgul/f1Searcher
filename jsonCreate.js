const fs = require('fs');

// Данные из таблицы
const data = [
    {
      "teamName": "McLaren",
      "nameFirstDriver": "Ландо Норрис",
      "nameSecondDriver": "Оскар Пиастри",
      "sumOfCC": 9,
      "year": 2024
    },
    {
      "teamName": "Red Bull Racing",
      "nameFirstDriver": "Макс Ферстаппен",
      "nameSecondDriver": "Серхио Перес",
      "sumOfCC": 6,
      "year": 2023
    },
    {
      "teamName": "Red Bull Racing",
      "nameFirstDriver": "Макс Ферстаппен",
      "nameSecondDriver": "Серхио Перес",
      "sumOfCC": 5,
      "year": 2022
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Валттери Боттас",
      "sumOfCC": 8,
      "year": 2021
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Валттери Боттас",
      "sumOfCC": 7,
      "year": 2020
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Валттери Боттас",
      "sumOfCC": 6,
      "year": 2019
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Валттери Боттас",
      "sumOfCC": 5,
      "year": 2018
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Валттери Боттас",
      "sumOfCC": 4,
      "year": 2017
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Нико Росберг",
      "nameSecondDriver": "Льюис Хэмилтон",
      "sumOfCC": 3,
      "year": 2016
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Нико Росберг",
      "sumOfCC": 2,
      "year": 2015
    },
    {
      "teamName": "Mercedes",
      "nameFirstDriver": "Льюис Хэмилтон",
      "nameSecondDriver": "Нико Росберг",
      "sumOfCC": 1,
      "year": 2014
    },
    {
      "teamName": "Red Bull Racing",
      "nameFirstDriver": "Себастьян Феттель",
      "nameSecondDriver": "Марк Уэббер",
      "sumOfCC": 4,
      "year": 2013
    },
    {
      "teamName": "Red Bull Racing",
      "nameFirstDriver": "Себастьян Феттель",
      "nameSecondDriver": "Марк Уэббер",
      "sumOfCC": 3,
      "year": 2012
    },
    {
      "teamName": "Red Bull Racing",
      "nameFirstDriver": "Себастьян Феттель",
      "nameSecondDriver": "Марк Уэббер",
      "sumOfCC": 2,
      "year": 2011
    },
    {
      "teamName": "Red Bull Racing",
      "nameFirstDriver": "Себастьян Феттель",
      "nameSecondDriver": "Марк Уэббер",
      "sumOfCC": 1,
      "year": 2010
    },
    {
      "teamName": "Brawn GP",
      "nameFirstDriver": "Дженсон Баттон",
      "nameSecondDriver": "Рубенс Баррикелло",
      "sumOfCC": 1,
      "year": 2009
    },
    {
      "teamName": "Ferrari",
      "nameFirstDriver": "Кими Райкконен",
      "nameSecondDriver": "Фелипе Масса",
      "sumOfCC": 16,
      "year": 2008
    },
    {
      "teamName": "Ferrari",
      "nameFirstDriver": "Кими Райкконен",
      "nameSecondDriver": "Фелипе Масса",
      "sumOfCC": 15,
      "year": 2007
    },
    {
      "teamName": "Renault",
      "nameFirstDriver": "Фернандо Алонсо",
      "nameSecondDriver": "Джанкало Физикелла",
      "sumOfCC": 2,
      "year": 2006
    },
    {
      "teamName": "Renault",
      "nameFirstDriver": "Фернандо Алонсо",
      "nameSecondDriver": "Джанкало Физикелла",
      "sumOfCC": 1,
      "year": 2005
    },
    {
      "teamName": "Ferrari",
      "nameFirstDriver": "Михаэль Шумахер",
      "nameSecondDriver": "Рубенс Баррикелло",
      "sumOfCC": 14,
      "year": 2004
    },
    {
      "teamName": "Ferrari",
      "nameFirstDriver": "Михаэль Шумахер",
      "nameSecondDriver": "Рубенс Баррикелло",
      "sumOfCC": 13,
      "year": 2003
    },
    {
      "teamName": "Ferrari",
      "nameFirstDriver": "Михаэль Шумахер",
      "nameSecondDriver": "Рубенс Баррикелло",
      "sumOfCC": 12,
      "year": 2002
    },
    {
      "teamName": "Ferrari",
      "nameFirstDriver": "Михаэль Шумахер",
      "nameSecondDriver": "Рубенс Баррикелло",
      "sumOfCC": 11,
      "year": 2001
    },
    {
    "teamName": "Ferrari",
    "nameFirstDriver": "Михаэль Шумахер",
    "nameSecondDriver": "Рубенс Баррикелло",
    "sumOfCC": 10,
    "year": 2000
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Мика Хаккинен",
    "nameSecondDriver": "Дэвид Култхард",
    "sumOfCC": 8,
    "year": 1999
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Мика Хаккинен",
    "nameSecondDriver": "Дэвид Култхард",
    "sumOfCC": 7,
    "year": 1998
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Жак Вильнёв",
    "nameSecondDriver": "Хайнц-Харальд Френтцен",
    "sumOfCC": 9,
    "year": 1997
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Деймон Хилл",
    "nameSecondDriver": "Жак Вильнёв",
    "sumOfCC": 8,
    "year": 1996
  },
  {
    "teamName": "Benetton",
    "nameFirstDriver": "Михаэль Шумахер",
    "nameSecondDriver": "Джонни Херберт",
    "sumOfCC": 1,
    "year": 1995
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Деймон Хилл",
    "nameSecondDriver": "Найджел Мэнселл",
    "sumOfCC": 7,
    "year": 1994
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Ален Прост",
    "nameSecondDriver": "Деймон Хилл",
    "sumOfCC": 6,
    "year": 1993
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Найджел Мэнселл",
    "nameSecondDriver": "Рикардо Патрезе",
    "sumOfCC": 5,
    "year": 1992
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Айртон Сенна",
    "nameSecondDriver": "Герхард Бергер",
    "sumOfCC": 6,
    "year": 1991
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Айртон Сенна",
    "nameSecondDriver": "Ален Прост",
    "sumOfCC": 5,
    "year": 1990
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Айртон Сенна",
    "nameSecondDriver": "Ален Прост",
    "sumOfCC": 4,
    "year": 1989
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Ален Прост",
    "nameSecondDriver": "Айртон Сенна",
    "sumOfCC": 3,
    "year": 1988
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Найджел Мэнселл",
    "nameSecondDriver": "Нельсон Пике",
    "sumOfCC": 4,
    "year": 1987
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Нельсон Пике",
    "nameSecondDriver": "Найджел Мэнселл",
    "sumOfCC": 3,
    "year": 1986
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Ален Прост",
    "nameSecondDriver": "Ники Лауда",
    "sumOfCC": 2,
    "year": 1985
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Ники Лауда",
    "nameSecondDriver": "Ален Прост",
    "sumOfCC": 1,
    "year": 1984
  },
  {
    "teamName": "Ferrari",
    "nameFirstDriver": "Рене Арну",
    "nameSecondDriver": "Патрик Тамбе",
    "sumOfCC": 9,
    "year": 1983
  },
  {
    "teamName": "Ferrari",
    "nameFirstDriver": "Дидье Пирони",
    "nameSecondDriver": "Жиль Вильнёв",
    "sumOfCC": 8,
    "year": 1982
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Алан Джонс",
    "nameSecondDriver": "Карлос Рейтеман",
    "sumOfCC": 2,
    "year": 1981
  },
  {
    "teamName": "Williams",
    "nameFirstDriver": "Алан Джонс",
    "nameSecondDriver": "Клей Регаццони",
    "sumOfCC": 1,
    "year": 1980
  },
  {
    "teamName": "Ferrari",
    "nameFirstDriver": "Джоди Шектер",
    "nameSecondDriver": "Жиль Вильнёв",
    "sumOfCC": 7,
    "year": 1979
  },
  {
    "teamName": "Lotus",
    "nameFirstDriver": "Марио Андретти",
    "nameSecondDriver": "Ронни Петерсон",
    "sumOfCC": 7,
    "year": 1978
  },
  {
    "teamName": "Ferrari",
    "nameFirstDriver": "Ники Лауда",
    "nameSecondDriver": "Карлос Рейтеман",
    "sumOfCC": 6,
    "year": 1977
  },
  {
    "teamName": "Ferrari",
    "nameFirstDriver": "Ники Лауда",
    "nameSecondDriver": "Клей Регаццони",
    "sumOfCC": 5,
    "year": 1976
  },
  {
    "teamName": "McLaren",
    "nameFirstDriver": "Эмерсон Фиттипальди",
    "nameSecondDriver": "Денни Халм",
    "sumOfCC": 1,
    "year": 1974
  },
  {
    "teamName": "Lotus",
    "nameFirstDriver": "Эмерсон Фиттипальди",
    "nameSecondDriver": "Ронни Петерсон",
    "sumOfCC": 5,
    "year": 1973
  },
  {
    "teamName": "Tyrrell",
    "nameFirstDriver": "Джеки Стюарт",
    "nameSecondDriver": "Франсуа Север",
    "sumOfCC": 2,
    "year": 1971
  },
  {
    "teamName": "Matra",
    "nameFirstDriver": "Джеки Стюарт",
    "nameSecondDriver": "Жан-Пьер Бельтуаз",
    "sumOfCC": 1,
    "year": 1969
  },
  {
    "teamName": "Lotus",
    "nameFirstDriver": "Грэм Хилл",
    "nameSecondDriver": "Йохен Риндт",
    "sumOfCC": 2,
    "year": 1968
  },
  {
    "teamName": "Brabham",
    "nameFirstDriver": "Джек Брэбэм",
    "nameSecondDriver": "Дэн Герни",
    "sumOfCC": 2,
    "year": 1967
  },
  {
    "teamName": "Ferrari",
    "nameFirstDriver": "Джон Сёртиз",
    "nameSecondDriver": "Лоренцо Бандини",
    "sumOfCC": 1,
    "year": 1964
  },
  {
    "teamName": "Cooper",
    "nameFirstDriver": "Джек Брэбэм",
    "nameSecondDriver": "Морис Трентиньян",
    "sumOfCC": 2,
    "year": 1960
  },
  {
    "teamName": "Vanwall",
    "nameFirstDriver": "Стерлинг Мосс",
    "nameSecondDriver": "Тони Брукс",
    "sumOfCC": 1,
    "year": 1958
  }
]

let jsonData = JSON.stringify(data, null, 4);

fs.writeFileSync('dataTeams.JSON', jsonData);

console.log("JSON файл успешно создан!");