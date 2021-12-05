const SOURCE_TEMPLATES = {
  "custom" : {
    "name" : "Свій текст",
    "text" : ""
  },

  "mix" : {
    "name" : "Всячина",
    "text" : "Україна, гривня, Шевченко, шахтар, валянок, Святослав, тривіальний, м'ясо, кальян, Касьяненко, синяя, йогурт, всього, бульйон, бойовий, нижній, Кий, мить, Индик, говорити, узгодження, Гемінґвей, погойдати, щороку, чіпляєшся, Юлія, Нью-Йорк, полювання, цілуватись, киця, подружжя, завгосп, ВНЗ, НАТО, ЖКГ"
  },

  "pangrams" : {
    "name" : "Панграми",
    "text" : "Гей, хлопці, не вспію — на ґанку ваша файна їжа знищується бурундучком і в'юном. Хвацький юшковар Філіп щодня на ґанку готує сім'ї вечерю з жаб. Грішний джиґіт, що хотів у Францію, позбувався цієї думки, з'їдаючи трюфель. Протягом цієї п'ятирічки в ґрунт було висаджено гарбуз, шпинат та цілющий фенхель."
  },

  "names" : {
    "name" : "Імена",
    "text" : "Жанна, Андрій, Володимир, Олександра, Наталія, Христина, Аскольд, Юрій, Андріана, Петро, Анастасія, Леонід, Олексій, Уляна, Олег, Соломія, Дмитро, Юлія, Богдан, Жюстина, Джонні, Вольфганг, Пєтька\n\nШевченко, Михайленко, Ярошенко, Ґалаґан, Вишневецька, Коваленко, Гаєвич, Микитась, Онищенко, Їжакевич, Бєляєва, Маринич, Рибчинська, Філіпчук, Стеценко, Чапаєв, Вівальді, Кейдж, Екзюпері"
  },

  "geo" : {
    "name" : "Географія",
    "text" : "Київ, Алушта, Вінниця, Гадяч, Ґорґани, Донецьк, Рівне, Есмань, Короп'є, Житомир, Кадиївка, Мар'їне, Йосипівка, Стрий, Миколаїв, Ніжин, Ужгород, Біла Церква, Шостка, Харків, Яготин, Знам'янка\n\nЗакарпаття, Сумщина, Україна, Русь, Московія, Польща, Чехія, Німеччина, Китай, США, Японія, Фінляндія, Швеція, Європа, Угорщина, Бразилія, Гренландія, Азія, Північна Корея, Таджикістан, Туреччина"
  },

  "anthem" : {
    "name" : "Гімн",
    "text" : "Ще не вмерла України ні слава, ні воля.\nЩе нам, браття молодії, усміхнеться доля.\nЗгинуть наші воріженьки, як роса на сонці,\nЗапануєм і ми, браття, у своїй сторонці.\n\nДушу й тіло ми положим за нашу свободу\nІ покажем, що ми, браття, козацького роду!"
  },

  "act" : {
    "name" : "Акт проголошення незалежності",
    "text" : "АКТ\nПРОГОЛОШЕННЯ\nНЕЗАЛЕЖНОСТІ УКРАЇНИ\n\nВиходячи із смертельної небезпеки, яка нависла була над Україною в зв'язку з державним переворотом в СРСР 19 серпня 1991 року,\n- продовжуючи тисячолітню традицію державотворення в Україні,\n- виходячи з права на самовизначення, передбаченого Статутом ООН та іншими міжнародно-правовими документами,\n- здійснюючи Декларацію про державний суверенітет України, Верховна Рада Української Радянської Соціалістичної Республіки урочисто\nпроголошує\nнезалежність України та створення самостійної української держави — УКРАЇНИ.\nТериторія України є неподільною і недоторканною.\nВіднині на території України мають чинність виключно Конституція і закони України.\nЦей акт набирає чинності з моменту його схвалення.\n\nВЕРХОВНА РАДА УКРАЇНИ\n24 серпня 1991 року"
  }
}