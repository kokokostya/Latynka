const SOURCE_TEMPLATES = {
  "custom" : {
    "name" : "Свій текст",
    "text" : ""
  },

  "mix" : {
    "name" : "Всячина",
    "text" : "Україна, гривня, Шевченко, шахтар, валянок, Святослав, тривіальний, м'ясо, кальян, Касьяненко, синяя, йогурт, всього, бульйон, бойовий, нижній, Кий, мить, Индик, говорити, узгодження, Гемінґвей, погойдати, щороку, чіпляєшся, Юлія, Нью-Йорк, полювання, цілуватись, киця, подружжя, завгосп, ВНЗ, ОБСЄ, ЖКГ"
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
  },

  "text" : {
    "name" : "Довгий уривок",
    "text" : "Іван Нечуй-Левицький Іван\n\nМикола Джеря\n\nШирокою долиною між двома рядками розложистих гір тихо тече по Васильківщині невеличка річка Раставиця. Серед долини зеленіють розкішні густі та високі верби, там ніби потонуло в вербах село Вербівка. Між вербами дуже виразно й ясно блищить проти сонця висока біла церква з трьома банями, а коло неї невеличка дзвіниця неначе заплуталась в зеленому гіллі старих груш. Подекуди з-поміж верб та садків виринають білі хати та чорніють покрівлі високих клунь.\n\nПо обидва береги Раставиці через усю Вербівку стеляться сукупні городи та левади, не одгороджені тинами. Один город одділяється од другого тільки рядком верб або межами. Понад самим берегом в’ється в траві стежка через усе село. Підеш тією стежкою, глянеш кругом себе, і скрізь бачиш зелене-зелене море верб, садків, конопель, соняшників, кукурудзи та густої осоки.\n\nОт стеляться розложисті, як скатерть, зелені левади. Густа, як руно, трава й дрібненька, тонісінька осока доходить до самої води. Подекуди по жовто-зеленій скатерті розкидані темно-зелені кущі верболозу, то кругленькі, наче м’ячики, то гостроверхі, неначе топольки. Між м’якими зеленими, ніби оксамитовими, берегами в’ється гадюкою Раставиця, неначе передражнює здорові річки, як часом маленькі діти передражнюють старших. А там далі вона повилась між високими вербами та лозами, що обступили її стіною з обох боків. Он верби одступились од берега і розсипались купами на зеленій траві. Скрізь по обидва боки Раставиці на покаті стеляться чудові городи, жовтіють тисячі соняшників, що ніби поспинались та заглядають поверх бадилля кукурудзи на річку; там далі набігли над річку високі коноплі і залили берег своїм гострим важким духом. В одному місці розрослись чималі вишняки, а далі од берега, коло самих хат, ростуть дикі груші та яблуні, розкидавши своє широке гілля понад соняшниками; а ондечки серед одного города вгніздилась прездорова, стара, широка та гілляста дика груша, розклала своє гілля трохи не при землі на буряки та картоплю. Соняшники заплутались своїми жовтими головами в гіллі."
  }
}