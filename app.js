
const CITIES = [
  {id:"tashkent",lat:41.2995,lon:69.2401},
  {id:"almaty",lat:43.2389,lon:76.8897},
  {id:"bishkek",lat:42.8746,lon:74.5698},
  {id:"dushanbe",lat:38.5598,lon:68.7870},
  {id:"ashgabat",lat:37.9601,lon:58.3261}
];

const L = {
  uz:{name:"O‘zbekcha",title:"Ob-havo",refresh:"Yangilash",updated:"Yangilandi",offline:"Internet aloqasi yo‘q — oxirgi ma’lumot ko‘rsatilmoqda",feels:"His",humidity:"Namlik",pressure:"Bosim",wind:"Shamol",min:"Min",max:"Maks",installTitle:"iPhone'ga o‘rnatish",installText:"Safari → Share → Add to Home Screen",install:"O‘rnatish",
    cities:{tashkent:"Toshkent",almaty:"Olmaota",bishkek:"Bishkek",dushanbe:"Dushanbe",ashgabat:"Ashxobod"},
    weather:{clear:"Ochiq",partly:"Qisman bulutli",cloudy:"Bulutli",fog:"Tuman",drizzle:"Mayda yomg‘ir",rain:"Yomg‘ir",snow:"Qor",showers:"Jala",storm:"Momaqaldiroq",unknown:"Noma’lum"}},
  ru:{name:"Русский",title:"Погода",refresh:"Обновить",updated:"Обновлено",offline:"Нет интернета — показаны последние данные",feels:"Ощущается",humidity:"Влажность",pressure:"Давление",wind:"Ветер",min:"Мин",max:"Макс",installTitle:"Установить на iPhone",installText:"Safari → Поделиться → На экран «Домой»",install:"Установить",
    cities:{tashkent:"Ташкент",almaty:"Алматы",bishkek:"Бишкек",dushanbe:"Душанбе",ashgabat:"Ашхабад"},
    weather:{clear:"Ясно",partly:"Переменная облачность",cloudy:"Облачно",fog:"Туман",drizzle:"Морось",rain:"Дождь",snow:"Снег",showers:"Ливень",storm:"Гроза",unknown:"Нет данных"}},
  kk:{name:"Қазақша",title:"Ауа райы",refresh:"Жаңарту",updated:"Жаңартылды",offline:"Интернет жоқ — соңғы деректер көрсетілуде",feels:"Сезіледі",humidity:"Ылғалдылық",pressure:"Қысым",wind:"Жел",min:"Мин",max:"Макс",installTitle:"iPhone-ға орнату",installText:"Safari → Бөлісу → Басты экранға қосу",install:"Орнату",
    cities:{tashkent:"Ташкент",almaty:"Алматы",bishkek:"Бішкек",dushanbe:"Душанбе",ashgabat:"Ашхабад"},
    weather:{clear:"Ашық",partly:"Ала бұлтты",cloudy:"Бұлтты",fog:"Тұман",drizzle:"Сіркіреме жаңбыр",rain:"Жаңбыр",snow:"Қар",showers:"Нөсер",storm:"Найзағай",unknown:"Белгісіз"}},
  ky:{name:"Кыргызча",title:"Аба ырайы",refresh:"Жаңыртуу",updated:"Жаңыртылды",offline:"Интернет жок — акыркы маалымат көрсөтүлүүдө",feels:"Сезилет",humidity:"Нымдуулук",pressure:"Басым",wind:"Шамал",min:"Мин",max:"Макс",installTitle:"iPhone'го орнотуу",installText:"Safari → Бөлүшүү → Башкы экранга кошуу",install:"Орнотуу",
    cities:{tashkent:"Ташкент",almaty:"Алматы",bishkek:"Бишкек",dushanbe:"Душанбе",ashgabat:"Ашхабад"},
    weather:{clear:"Ачык",partly:"Ала булуттуу",cloudy:"Булуттуу",fog:"Туман",drizzle:"Майда жамгыр",rain:"Жамгыр",snow:"Кар",showers:"Нөшөр",storm:"Күн күркүрөйт",unknown:"Белгисиз"}},
  tg:{name:"Тоҷикӣ",title:"Обу ҳаво",refresh:"Навсозӣ",updated:"Нав шуд",offline:"Интернет нест — маълумоти охирин нишон дода мешавад",feels:"Ҳис мешавад",humidity:"Намнокӣ",pressure:"Фишор",wind:"Шамол",min:"Мин",max:"Макс",installTitle:"Насб дар iPhone",installText:"Safari → Share → Add to Home Screen",install:"Насб",
    cities:{tashkent:"Тошканд",almaty:"Алмато",bishkek:"Бишкек",dushanbe:"Душанбе",ashgabat:"Ашқобод"},
    weather:{clear:"Соф",partly:"Каме абрнок",cloudy:"Абрнок",fog:"Туман",drizzle:"Борони майда",rain:"Борон",snow:"Барф",showers:"Рагбор",storm:"Раъду барқ",unknown:"Номаълум"}},
  tk:{name:"Türkmençe",title:"Howa",refresh:"Täzele",updated:"Täzelendi",offline:"Internet ýok — soňky maglumat görkezilýär",feels:"Duýulýar",humidity:"Çyglylyk",pressure:"Basyş",wind:"Ýel",min:"Min",max:"Maks",installTitle:"iPhone-a gurmak",installText:"Safari → Share → Add to Home Screen",install:"Gurmak",
    cities:{tashkent:"Daşkent",almaty:"Almaty",bishkek:"Bişkek",dushanbe:"Duşenbe",ashgabat:"Aşgabat"},
    weather:{clear:"Açyk",partly:"Az bulutly",cloudy:"Bulutly",fog:"Duman",drizzle:"Çisňi",rain:"Ýagyş",snow:"Gar",showers:"Çabga",storm:"Ýyldyrymly",unknown:"Näbelli"}}
};

let lang = localStorage.getItem("lang") || "uz";
let deferredPrompt = null;

const qs = s => document.querySelector(s);
const cards = qs("#cards"), statusEl = qs("#status"), updatedEl = qs("#updated");

function key(code){
  if(code===0)return"clear"; if([1,2].includes(code))return"partly"; if(code===3)return"cloudy";
  if([45,48].includes(code))return"fog"; if([51,53,55,56,57].includes(code))return"drizzle";
  if([61,63,65,66,67].includes(code))return"rain"; if([71,73,75,77].includes(code))return"snow";
  if([80,81,82,85,86].includes(code))return"showers"; if([95,96,99].includes(code))return"storm";
  return"unknown";
}
function icon(code,isDay){
  const k=key(code);
  return ({clear:isDay?"☀️":"🌙",partly:"🌤️",cloudy:"☁️",fog:"🌫️",drizzle:"🌦️",rain:"🌧️",snow:"🌨️",showers:"🌧️",storm:"⛈️",unknown:"❔"})[k];
}
function tr(){ return L[lang]; }
function applyLang(){
  const t=tr();
  document.documentElement.lang=lang; qs("#title").textContent=t.title;
  qs("#refresh").title=t.refresh; qs("#installTitle").textContent=t.installTitle;
  qs("#installText").textContent=t.installText; qs("#installBtn").textContent=t.install;
  render(loadCache());
}
function setupLang(){
  const sel=qs("#language");
  Object.entries(L).forEach(([k,v])=>{const o=document.createElement("option");o.value=k;o.textContent=v.name;sel.appendChild(o)});
  sel.value=lang;
  sel.onchange=()=>{lang=sel.value;localStorage.setItem("lang",lang);applyLang()};
}
function cacheKey(){return "weather_v2"}
function loadCache(){try{return JSON.parse(localStorage.getItem(cacheKey()))||{}}catch{return{}}}
function saveCache(d){localStorage.setItem(cacheKey(),JSON.stringify(d))}
function render(data){
  const t=tr(); cards.innerHTML="";
  CITIES.forEach(c=>{
    const d=data[c.id]; const el=document.createElement("article"); el.className="card";
    if(!d){el.innerHTML=`<div class="city">${t.cities[c.id]}</div><div class="condition">—</div>`}
    else{
      const cur=d.current, day=d.daily;
      el.innerHTML=`
        <div class="city">${t.cities[c.id]}</div>
        <div class="temp-row"><div class="weather-icon">${icon(cur.weather_code,cur.is_day)}</div><div class="temp">${Math.round(cur.temperature_2m)}°</div></div>
        <div class="condition">${t.weather[key(cur.weather_code)]}</div>
        <div class="divider"></div>
        <div class="minmax">${t.min}: ${Math.round(day.temperature_2m_min[0])}° &nbsp; • &nbsp; ${t.max}: ${Math.round(day.temperature_2m_max[0])}°</div>
        <div class="meta">
          <span>${t.feels}: ${Math.round(cur.apparent_temperature)}°C</span>
          <span>💧 ${t.humidity}: ${Math.round(cur.relative_humidity_2m)}%</span>
          <span>💨 ${t.wind}: ${cur.wind_speed_10m.toFixed(1)} m/s</span>
          <span>${t.pressure}: ${Math.round(cur.pressure_msl)} hPa</span>
        </div>`;
    }
    cards.appendChild(el);
  });
  if(data._updated){updatedEl.textContent=`${t.updated}: ${new Date(data._updated).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}`}
}
async function fetchCity(c){
  const p=new URLSearchParams({
    latitude:c.lat,longitude:c.lon,
    current:"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,pressure_msl,wind_speed_10m",
    daily:"weather_code,temperature_2m_max,temperature_2m_min",
    wind_speed_unit:"ms",timezone:"auto",forecast_days:"7"
  });
  const r=await fetch("https://api.open-meteo.com/v1/forecast?"+p);
  if(!r.ok)throw new Error("HTTP "+r.status);
  return r.json();
}
async function refresh(){
  qs("#refresh").disabled=true; statusEl.classList.add("hidden");
  const cached=loadCache(); let ok=0, failed=0;
  await Promise.all(CITIES.map(async c=>{
    try{cached[c.id]=await fetchCity(c);ok++}catch(e){failed++}
  }));
  if(ok){cached._updated=new Date().toISOString();saveCache(cached)}
  if(failed){statusEl.textContent=tr().offline;statusEl.classList.remove("hidden")}
  render(cached);qs("#refresh").disabled=false;
}
qs("#refresh").onclick=refresh;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;qs("#installBtn").classList.remove("hidden")});
qs("#installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;qs("#installBtn").classList.add("hidden")}};

setupLang();applyLang();refresh();
setInterval(refresh,15*60*1000);

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"))}
