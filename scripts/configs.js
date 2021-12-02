const LATIN_CONFIGS = {
  "ukr-lat-abecadlo-1835": {
    code: "ukr-lat-abecadlo-1835",
    name: "Абецадло",
    desc: "Проєкт української (руської) латинської абетки, розроблений українським греко-католицьким священиком Йосипом Лозинським на основі польського алфавіту (абецадла). Вперше опублікований у Львові 1834 року. Спрощена версія, без особливостей етимологічного характеру з особливим вживанням é, ł, ó та ін. (наприклад, opysał замість opysaw, świato замість swiato, чи Ukraina замість Ukrajina). Також додане використання дієрезисів (ä, ë, ö, ü) для роздільного читання двох літер, які позначають голосні звуки (наприклад, Уляна – Uliana, але ліана – liäna).",
    link: "https://uk.wikipedia.org/wiki/%D0%90%D0%B1%D0%B5%D1%86%D0%B0%D0%B4%D0%BB%D0%BE",
    from: "ukr",
    to: "lat",

    useLocationInWordAlgo: true,
    affectVowelNotConsonantWhenSofting: true,

    beforeStartDict: {
      іа: ["ia", "iä", "iä"],
      іе: ["ie", "ië", "ië"],
      іо: ["io", "iö", "iö"],
      іу: ["iu", "iü", "iü"],
    },

    dict: {
      и: "y",
      і: "i",

      й: "j",

      я: "ja",
      є: "je",
      ї: ["ji", "ji", "ji"],
      ю: "ju",

      ґ: "g",
      г: "h",
      х: "ch",
      ц: "c",
      щ: "szcz",

      ж: "ż",
      ш: "sz",
      ч: "cz",

      а: "a",
      е: "e",
      о: "o",
      у: "u",

      б: "b",
      п: "p",
      д: "d",
      т: "t",
      к: "k",
      в: "w",
      ф: "f",
      з: "z",
      с: "s",
      л: "ł",
      м: "m",
      н: "n",
      р: "r",
    },

    apostrophesSingleKeyDict: {
      "'`‘’": "",
    },

    softingSignsMultiDict: {
      ь: {
        affecting: "",
        affected: "",
      },
    },

    softingVowelsMultiDict: {
      є: "ie",
      ю: "iu",
      я: "ia",
      ьо: "io",
    },

    softableConsonantsDict: {
      д: "ď",
      з: "ź",
      л: "l",
      н: "ń",
      р: "ŕ",
      с: "ś",
      т: "ť",
      ц: "ć",
    },

    unsoftableConsonants: [
      "б",
      "в",
      "г",
      "ґ",
      "ж",
      "к",
      "м",
      "п",
      "ф",
      "х",
      "ч",
      "ш",
      "щ",
    ],

    afterFinishDict: {
      łia: "la",
      łiu: "lu",
      łie: "le",
      łio: "lo",

      łIa: "la",
      łIu: "lu",
      łIe: "le",
      łIo: "lo",

      łi: "li",
      łl: "ll",
    },

    substitutionForUndefinedResult: "",
  },

  "ukr-lat-jireckivka-1859": {
    code: "ukr-lat-jireckivka-1859",
    name: "Їречківка",
    desc: "Проєкт латинської абетки для української (руської) мови, укладений Йосифом Їречеком на основі чеського правопису. «Пропозиція» Їречека опублікована 1859 року. Спрощена версія, без діялектичних ě, ü, ł, eu та ou.",
    link: "http://latynka.tak.today/works/proekt-jirecheka/",
    "source-link":
      "https://books.google.com.ua/books?hl=uk&id=KU1dAAAAcAAJ&q=ll#v=onepage&q&f=false",
    from: "ukr",
    to: "lat",

    affectVowelNotConsonantWhenSofting: false,

    beforeStartDict: {},

    dict: {
      и: "y",
      і: "i",

      й: "j",

      я: "ja",
      є: "je",
      ї: "ji",
      ю: "ju",

      ґ: "g",
      г: "h",
      х: "ch",
      ц: "c",
      щ: "šč",

      ж: "ž",
      ш: "š",
      ч: "č",

      а: "a",
      е: "e",
      о: "o",
      у: "u",

      б: "b",
      п: "p",
      д: "d",
      т: "t",
      к: "k",
      в: "v",
      ф: "f",
      з: "z",
      с: "s",
      л: "l",
      м: "m",
      н: "n",
      р: "r",
    },

    apostrophesSingleKeyDict: {
      "'`‘’": "",
    },

    softingSignsMultiDict: {
      ь: {
        affecting: "",
        affected: "",
      },
    },

    softingVowelsMultiDict: {
      є: {
        affecting: "e",
        affected: "je",
      },
      ю: {
        affecting: "u",
        affected: "ju",
      },
      я: {
        affecting: "a",
        affected: "ja",
      },
      ьо: {
        affecting: "o",
        affected: "jo",
      },
    },

    softableConsonantsDict: {
      д: "ď",
      з: "ź",
      л: "ľ",
      н: "ń",
      р: "ŕ",
      с: "ś",
      т: "ť",
      ц: "ć",
    },

    unsoftableConsonants: [
      "б",
      "в",
      "г",
      "ґ",
      "ж",
      "к",
      "м",
      "п",
      "ф",
      "х",
      "ч",
      "ш",
      "щ",
    ],

    afterFinishDict: {
      dď: "ďď",
      zź: "źź",
      lľ: "ľľ",
      nń: "ńń",
      rŕ: "ŕŕ",
      sś: "śś",
      tť: "ťť",
      cć: "ćć",
    },

    substitutionForUndefinedResult: "",
  },

  "ukr-lat-heohraf-1996": {
    code: "ukr-lat-heohraf-1996",
    name: "Географічна",
    desc: "Згідно з нормативною таблицею для відтворення українських власних назв засобами англійської мови у законодавчих та офіційних актах, затвердженою Українською комісією з питань правничої термінології у 1996-му році.",
    link: "https://uk.wikipedia.org/wiki/%D0%9B%D0%B0%D1%82%D0%B8%D0%BD%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%8F_%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BC%D0%BE%D0%B2%D0%B8",
    from: "ukr",
    to: "lat",

    useLocationInWordAlgo: true,

    beforeStartDict: {
      зг: "zgh",
    },

    dict: {
      и: "y",
      і: "i",

      й: ["y", "i", "i"],

      я: ["ya", "ia", "ia"],
      є: ["ye", "ie", "ie"],
      ї: ["yi", "i", "i"],
      ю: ["yu", "iu", "iu"],

      ґ: "g",
      г: "h",
      х: "kh",
      ц: "ts",
      щ: "sch",

      ж: "zh",
      ш: "sh",
      ч: "ch",
      ь: "'",

      а: "a",
      е: "e",
      о: "o",
      у: "u",

      б: "b",
      п: "p",
      д: "d",
      т: "t",
      к: "k",
      в: "v",
      ф: "f",
      з: "z",
      с: "s",
      л: "l",
      м: "m",
      н: "n",
      р: "r",
    },

    apostrophesSingleKeyDict: {
      "": "",
    },

    substitutionForUndefinedResult: "",
  },

  "ukr-lat-kabmin-2010": {
    code: "ukr-lat-kabmin-2010",
    name: "Паспортна",
    desc: "Офіційна транслітерація, затверджена Кабміном у 2010-му році.",
    link: "https://zakon.rada.gov.ua/laws/show/55-2010-%D0%BF#Text",
    from: "ukr",
    to: "lat",

    useLocationInWordAlgo: true,

    beforeStartDict: {
      зг: "zgh",
    },

    dict: {
      и: "y",
      і: "i",

      й: ["y", "i", "i"],

      я: ["ya", "ia", "ia"],
      є: ["ye", "ie", "ie"],
      ї: ["yi", "i", "i"],
      ю: ["yu", "iu", "iu"],

      ґ: "g",
      г: "h",
      х: "kh",
      ц: "ts",
      щ: "shch",

      ж: "zh",
      ш: "sh",
      ч: "ch",
      ь: "",

      а: "a",
      е: "e",
      о: "o",
      у: "u",

      б: "b",
      п: "p",
      д: "d",
      т: "t",
      к: "k",
      в: "v",
      ф: "f",
      з: "z",
      с: "s",
      л: "l",
      м: "m",
      н: "n",
      р: "r",
    },

    apostrophesSingleKeyDict: {
      "'`‘’": "",
    },

    substitutionForUndefinedResult: "",
  },

  "ukr-lat-temivka-2021": {
    code: "ukr-lat-temivka-2021",
    name: "Темівка",
    desc: 'Концептуальний проєкт української латинки, оснований на тотожності функцій діакритичної крапки (для пом\'якшення) та умлаута (для йотування) над голосними: ı→i⇒ï, a→ȧ⇒ä, e→ė⇒ë, o→ȯ⇒ö, u→u̇⇒ü. Викристовується Темом Шевченком, автором "руховичка" цього транслітератора.',
    from: "ukr",
    to: "lat",

    affectVowelNotConsonantWhenSofting: true,
    useLocationInWordAlgo: false,

    beforeStartDict: {
      // Підставні букви для однаковості алгоритмів потім:
      йо: ["'ё", "'ё"],
      ьо: ["ё", "ё"],
      дз: ["ѕ", "ѕ"], // "дзе" (не плутати з латинською s)
      дж: ["џ", "џ"], // "дже"

      // Закінчення:
      ий: ["y", "ий"], // ı + j = y // OPTIONS: Ýý, Ẏẏ, Yy
      ться: ["ʦȧ", "ться"],
      ТЬСЯ: ["ТЬСЯ"],

      ////"уо": [ "ўо", "ўо" ], // todo - лише на початку і після голосних, уа, уе, уі
      // todo: пАУза?
    },

    dict: {
      и: ["ı", "y"],
      і: ["i"], // OPTIONS: Ii, İi, Iı
      І: ["İ", "I"],

      й: ["j"], // OPTIONS: // Jj, Yy

      я: ["ä", "ja"],
      є: ["ë", "je"],
      ї: ["ï", "ï"], // OPTIONS: // ji, ï, i
      ю: ["ü", "ju"],

      ґ: ["g", "g"], // OPTIONS: Ǧǧ, Gg, Ǧǧ, Ĝĝ // kg
      г: ["h"], // OPTIONS: Gg, Hh, Ǧǧ, Ġġ
      х: ["x"], // OPTIONS: Xx, Hh, Ĥĥ, Ȟȟ, KHkh, CHch
      ц: ["c"], // OPTIONS: Cc, TSts
      щ: ["šč", "sch"], // OPTIONS: Şş, Ŝŝ, ŠČšč // sch, shch

      ж: ["ž", "zh"],
      ш: ["š", "sh"],
      ч: ["č", "ch"], // OPTIONS: // CHch, CZcz, CXcx, CQcq

      а: "a",
      е: "e",
      о: "o",
      у: "u",

      б: "b",
      п: "p",
      д: "d",
      т: "t",
      к: "k",
      в: "v",
      ф: "f",
      з: "z",
      с: "s",
      л: "l",
      м: "m",
      н: "n",
      р: "r",
    },

    otherLanguagesLettersDict: {
      ё: ["ö", "jo"],
      ѕ: ["dz"], // OPTIONS: Ƶƶ (італ.), ʣ, Žž, Ẑẑ,
      џ: ["dž", "dzh"], // OPTIONS: J̌ǰ, ʤ, Ǯǯ,Ĵĵ, Ĉĉ, Ĝĝ, Đđ, Ɉɉ ідеально було б Ƶƶ з гачком

      ў: "w", // OPTIONS: Ww, Ŭŭ, V̊v̊
      э: "ɇ",
      ы: "ɏ",
      ъ: "ɉ",
    },

    apostrophesSingleKeyDict: {
      "'`‘’": "",
    },

    specSymbolsDict: {
      "«": ["„", '"'],
      "»": ["“", '"'],
      "№": "#",
    },

    softingSignsMultiDict: {
      ь: {
        affecting: "",
        affected: "j",
      },
    },

    softingVowelsMultiDict: {
      є: ["ė", "ie"], // OPTIONS: //je, ie
      ю: ["u̇", "iu"], // OPTIONS: //ju, iu
      я: ["ȧ", "ia"], // OPTIONS: //ja, ia
      ьо: ["ȯ", "io"],

      ё: ["ȯ", "io"],
    },

    softableConsonantsDict: {
      д: ["ď", "dj"], // OPTIONS: Ďď, Đđ, D́d́
      з: ["ź", "zj"],
      л: ["ľ", "lj"], // OPTIONS: Ľľ, Łł
      н: ["ń", "nj"],
      р: ["ŕ", "rj"],
      с: ["ś", "sj"],
      т: ["ť", "tj"], // OPTIONS: Ťť, Ŧŧ, T́t́
      ц: ["ć", "cj"],
      ѕ: ["dź", "dzj"],
    },

    unsoftableConsonants: [
      "б",
      "в",
      "г",
      "ґ",
      "ж",
      "к",
      "м",
      "п",
      "ф",
      "х",
      "ч",
      "џ",
      "ш",
      "щ",
    ],

    afterFinishDict: {
      //"ıï": [ "yï" ],       // щоб зберегти Kyïv
      //"ıä": [ "yä" ],
      //"ıë": [ "yë" ],
      //"ıü": [ "yü" ]
    },

    substitutionForUndefinedResult: "*",
  }
};
