export interface ConstellationEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  price: number;
  description: string;
  details: string[];
}

export const CONSTELLATION_EVENTS: ConstellationEvent[] = [
  {
    id: "constelatie-ianuarie-2027",
    title: "Constelații Ianuarie 2027",
    date: new Date(2027, 0, 14),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Începem anul cu intenții clare și viziune cosmică. Un workshop despre cum să ne aliniem obiectivele personale cu ritmurile planetare ale noului an.",
    details: [
      "Stabilirea intențiilor pentru noul an astrologic",
      "Analiza configurațiilor planetare din ianuarie",
      "Meditații de clarificare a viziunii personale",
      "Exerciții de planificare în acord cu ciclurile cosmice",
      "Discuții de grup și împărtășire experiențe",
      "Materiale suport și ghiduri personalizate",
    ],
  },
  {
    id: "constelatie-februarie-2027",
    title: "Constelații Februarie 2027",
    date: new Date(2027, 1, 9),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Luna februarie ne invită la introspecție și conexiune profundă. Explorăm energiile relațiilor și ale iubirii de sine prin lentila astrologiei.",
    details: [
      "Astrologia relațiilor și compatibilităților",
      "Vindecarea rănilor emoționale prin arhetipuri",
      "Meditații de deschidere a inimii",
      "Exerciții de iubire de sine și acceptare",
      "Sprijin emoțional și vindecare în grup",
      "Instrumente practice pentru relații armonioase",
    ],
  },
  {
    id: "constelatie-martie-2027",
    title: "Constelații Martie 2027",
    date: new Date(2027, 2, 23),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Echinocțiul de primăvară aduce renaștere și echilibru. Un workshop despre trezirea energiilor latente și pornirea cu forțe noi în noul ciclu.",
    details: [
      "Energiile echinocțiului și noul început",
      "Trezirea creativității și a elanului vital",
      "Ritualuri de reînnoire și purificare",
      "Meditații de echilibrare yin-yang",
      "Interacțiuni de grup și suport comunitar",
      "Resurse continue după workshop",
    ],
  },
  {
    id: "constelatie-aprilie-2027",
    title: "Constelații Aprilie 2027",
    date: new Date(2027, 3, 17),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Primăvara în plină expansiune ne cheamă la acțiune curajoasă. Explorăm tranzitele care susțin inițiativa și manifestarea proiectelor îndrăznețe.",
    details: [
      "Tranzite favorabile acțiunii și curajului",
      "Depășirea blocajelor și a fricii de eșec",
      "Tehnici de manifestare a proiectelor",
      "Meditații de activare a voinței",
      "Discuții de grup și împărtășire experiențe",
      "Plan de acțiune personalizat pe 90 de zile",
    ],
  },
  {
    id: "constelatie-mai-2027",
    title: "Constelații Mai 2027",
    date: new Date(2027, 4, 21),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "O seară magică de explorare a energiilor cosmice ale lunii mai. Vom analiza configurațiile astrale curente și impactul lor asupra evoluției noastre spirituale.",
    details: [
      "Analiza tranzitelor planetare principale",
      "Interpretarea energiei lunii mai",
      "Meditații ghidate de aliniere cosmică",
      "Exerciții practice de integrare a energiilor",
      "Discuții de grup și împărtășire experiențe",
      "Materiale suport și ghiduri personalizate",
    ],
  },
  {
    id: "constelatie-iunie-2027",
    title: "Constelații Iunie 2027",
    date: new Date(2027, 5, 11),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Solstițiul de vară ne umple de lumină și vitalitate. Celebrăm abundența și explorăm cum să ne încărcăm cu energia solară la apogeu.",
    details: [
      "Energiile solstițiului de vară",
      "Ritualuri de celebrare a luminii interioare",
      "Tehnici de revitalizare și încărcare energetică",
      "Meditații solare de expansiune",
      "Integrare și celebrare în comunitate",
      "Resurse pentru continuarea călătoriei",
    ],
  },
  {
    id: "constelatie-iulie-2027",
    title: "Constelații Iulie 2027",
    date: new Date(2027, 6, 27),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Luna iulie ne invită la explorarea emoțiilor profunde și a intuiției. Un workshop despre cum să navigăm apele emoționale cu înțelepciune și grație.",
    details: [
      "Explorarea emoțiilor și intuiției",
      "Tehnici de echilibrare emoțională",
      "Meditații de conectare cu sinele interior",
      "Exerciții de dezvoltare a intuiției",
      "Sprijin emoțional și vindecare în grup",
      "Instrumente practice pentru viața de zi cu zi",
    ],
  },
  {
    id: "constelatie-august-2027",
    title: "Constelații August 2027",
    date: new Date(2027, 7, 19),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Luna august aduce energii de manifestare și recoltare. Vom explora cum să folosim aceste influențe pentru a materializa visele și a ne bucura de roadele muncii noastre.",
    details: [
      "Energii de manifestare și abundență",
      "Tehnici de creare a realității dorite",
      "Exerciții de recunoștință și celebrare",
      "Planificare pentru sezonul următor",
      "Integrare și celebrare în comunitate",
      "Resurse pentru continuarea călătoriei",
    ],
  },
  {
    id: "constelatie-septembrie-2027",
    title: "Constelații Septembrie 2027",
    date: new Date(2027, 8, 15),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Echinocțiul de toamnă ne cheamă la recoltă și recunoștință. Evaluăm ciclul parcurs și ne pregătim pentru coborârea conștientă spre interior.",
    details: [
      "Bilanțul ciclului de creștere",
      "Ritualuri de recunoștință și încheiere",
      "Eliberarea a ceea ce nu mai servește",
      "Meditații de integrare a lecțiilor",
      "Suport în grup pentru transformare",
      "Pregătire pentru sezonul introspecției",
    ],
  },
  {
    id: "constelatie-octombrie-2027",
    title: "Constelații Octombrie 2027",
    date: new Date(2027, 9, 22),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Vălul dintre lumi se subțiază în octombrie. Un workshop profund despre umbre, transformare și întâlnirea cu părțile ascunse ale sinelui.",
    details: [
      "Lucrul cu umbra și arhetipurile profunde",
      "Tranzite intense și transformare interioară",
      "Ritualuri de eliberare a fricilor",
      "Meditații de coborâre și renaștere",
      "Spațiu sigur de explorare în grup",
      "Ghiduri de integrare post-workshop",
    ],
  },
  {
    id: "constelatie-noiembrie-2027",
    title: "Constelații Noiembrie 2027",
    date: new Date(2027, 10, 12),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Întunericul fertil al lui noiembrie ne invită la odihnă și visare. Explorăm astrologia viselor și mesajele subconștientului.",
    details: [
      "Astrologia viselor și a subconștientului",
      "Tehnici de lucru cu visele lucide",
      "Meditații de coborâre în profunzime",
      "Conectarea cu ghizii interiori",
      "Jurnal de vise și practici de seară",
      "Sprijin blând în cerc restrâns",
    ],
  },
  {
    id: "constelatie-decembrie-2027",
    title: "Constelații Decembrie 2027",
    date: new Date(2027, 11, 17),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Solstițiul de iarnă și încheierea anului ne adună în lumină. Celebrăm călătoria parcursată și primim cu înțelepciune noul ciclu.",
    details: [
      "Ritualuri de încheiere a anului",
      "Celebrarea realizărilor și lecțiilor",
      "Meditații de lumină în întuneric",
      "Pregătirea hărții de viziune pentru 2028",
      "Celebrare festivă în comunitate",
      "Binecuvântări pentru noul ciclu",
    ],
  },
  {
    id: "constelatie-ianuarie-2028",
    title: "Constelații Ianuarie 2028",
    date: new Date(2028, 0, 20),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Deschidem 2028 cu claritate și determinare. Analizăm marile tranzite ale anului și ne calibrăm busola interioară pentru lunile ce vin.",
    details: [
      "Panorama astrologică a anului 2028",
      "Tranzitele majore și ferestrele de oportunitate",
      "Stabilirea intențiilor anuale",
      "Meditații de aliniere cu ritmul anului",
      "Discuții de grup și împărtășire experiențe",
      "Calendar personal de lucru cu energiile",
    ],
  },
  {
    id: "constelatie-februarie-2028",
    title: "Constelații Februarie 2028",
    date: new Date(2028, 1, 15),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "În miezul iernii explorăm focul interior care nu se stinge. Un workshop despre reziliență, creativitate și menținerea flăcării în perioade reci.",
    details: [
      "Cultivarea focului interior",
      "Astrologia creativității și expresiei",
      "Practici de revitalizare în sezonul rece",
      "Meditații de încălzire energetică",
      "Ateliere creative în grup",
      "Instrumente de menținere a elanului",
    ],
  },
  {
    id: "constelatie-martie-2028",
    title: "Constelații Martie 2028",
    date: new Date(2028, 2, 9),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Primăvara timpurie trezește semințele plantate în vis. Învățăm să recunoaștem primele semne ale creșterii și să le hrănim cu atenție.",
    details: [
      "Recunoașterea noilor începuturi subtile",
      "Lucrul cu energia germinativă",
      "Ritualuri de plantare a intențiilor",
      "Meditații de trezire blândă",
      "Discuții de grup și împărtășire experiențe",
      "Jurnal de observație a ciclurilor",
    ],
  },
  {
    id: "constelatie-aprilie-2028",
    title: "Constelații Aprilie 2028",
    date: new Date(2028, 3, 25),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Natura explodează în aprilie și ne molipsește cu vitalitate. Explorăm cum să canalizăm surplusul de energie în creație și expansiune.",
    details: [
      "Canalizarea energiei vitale de primăvară",
      "Tranzite de expansiune și creștere",
      "Exerciții de împământare a elanului",
      "Meditații dinamice de activare",
      "Proiecte creative de grup",
      "Resurse continue după workshop",
    ],
  },
  {
    id: "constelatie-mai-2028",
    title: "Constelații Mai 2028",
    date: new Date(2028, 4, 18),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Luna florilor ne învață arta înfloririi fără efort. Un workshop despre frumusețe, receptivitate și celebrarea senzualității vieții.",
    details: [
      "Energiile înfloririi și receptivității",
      "Astrologia lui Venus și a plăcerii conștiente",
      "Practici de prezență senzorială",
      "Meditații de deschidere și primire",
      "Celebrare a frumuseții în comunitate",
      "Materiale suport și ghiduri personalizate",
    ],
  },
  {
    id: "constelatie-iunie-2028",
    title: "Constelații Iunie 2028",
    date: new Date(2028, 5, 23),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "În preajma solstițiului explorăm dualitatea lumină-umbră. Învățăm să îmbrățișăm întregul spectru al experienței umane.",
    details: [
      "Integrarea polarităților interioare",
      "Lucrul conștient cu lumina și umbra",
      "Meditații de totalitate și acceptare",
      "Exerciții de echilibru dinamic",
      "Discuții profunde în cerc",
      "Practici de integrare zilnică",
    ],
  },
  {
    id: "constelatie-iulie-2028",
    title: "Constelații Iulie 2028",
    date: new Date(2028, 6, 13),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Căldura lui iulie topește armurile inimii. Un workshop despre vulnerabilitate conștientă și curajul de a fi văzut așa cum ești.",
    details: [
      "Deschiderea inimii și vulnerabilitatea",
      "Vindecarea prin a fi văzut și auzit",
      "Meditații de blândețe radicală",
      "Exerciții de conectare autentică",
      "Sprijin emoțional și vindecare în grup",
      "Instrumente practice pentru viața de zi cu zi",
    ],
  },
  {
    id: "constelatie-august-2028",
    title: "Constelații August 2028",
    date: new Date(2028, 7, 24),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Sub soarele puternic al lui august strălucim în plina putere. Celebrăm leadershipul interior și exprimarea autentică a sinelui.",
    details: [
      "Activarea leadershipului interior",
      "Exprimarea autentică și vizibilitatea",
      "Ritualuri de împuternicire personală",
      "Meditații de strălucire conștientă",
      "Integrare și celebrare în comunitate",
      "Resurse pentru continuarea călătoriei",
    ],
  },
  {
    id: "constelatie-septembrie-2028",
    title: "Constelații Septembrie 2028",
    date: new Date(2028, 8, 21),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Luna septembrie aduce energii de bilanț și evaluare. Vom explora cum să ne analizăm progresul și să ne pregătim pentru noi obiective.",
    details: [
      "Energii de reflecție și evaluare",
      "Analiza ciclurilor personale",
      "Tehnici de eliberare a ce nu mai serveste",
      "Planificare pentru viitor",
      "Meditații de clarificare",
      "Suport în grup pentru transformare",
    ],
  },
  {
    id: "constelatie-octombrie-2028",
    title: "Constelații Octombrie 2028",
    date: new Date(2028, 9, 19),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Toamna târzie ne învață arta renunțării elegante. Explorăm ciclurile de moarte și renaștere din propria viață prin înțelepciunea astrelor.",
    details: [
      "Înțelepciunea renunțării conștiente",
      "Ciclurile personale de încheiere",
      "Ritualuri de doliu și eliberare",
      "Meditații de predare și încredere",
      "Spațiu sigur de explorare în grup",
      "Ghiduri de integrare post-workshop",
    ],
  },
  {
    id: "constelatie-noiembrie-2028",
    title: "Constelații Noiembrie 2028",
    date: new Date(2028, 10, 16),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "În liniștea lui noiembrie ascultăm șoaptele sufletului. Un workshop contemplativ despre tăcere, prezență și înțelepciunea care vine din nemișcare.",
    details: [
      "Practica tăcerii și a prezenței",
      "Astrologia contemplativă",
      "Meditații extinse de liniștire",
      "Conectarea cu înțelepciunea tăcută",
      "Cerc contemplativ restrâns",
      "Practici de integrare în cotidian",
    ],
  },
  {
    id: "constelatie-decembrie-2028",
    title: "Constelații Decembrie 2028",
    date: new Date(2028, 11, 14),
    time: "14:00 - 21:00",
    location: "Sambodhi Studio",
    price: 70,
    description:
      "Închidem ciclul de doi ani cu gratitudine și lumină. O celebrare a întregii călătorii și o binecuvântare pentru ceea ce urmează să se nască.",
    details: [
      "Retrospectiva călătoriei 2027-2028",
      "Celebrarea comunității formate",
      "Ritualuri de încheiere a ciclului mare",
      "Meditații de gratitudine profundă",
      "Festivitate de încheiere în comunitate",
      "Semințe de intenție pentru noul ciclu",
    ],
  },
];

export const getEventById = (id: string): ConstellationEvent | undefined => {
  return CONSTELLATION_EVENTS.find((event) => event.id === id);
};

export const getUpcomingEvents = (): ConstellationEvent[] => {
  const now = new Date();
  return CONSTELLATION_EVENTS.filter((event) => event.date >= now);
};
