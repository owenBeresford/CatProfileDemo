
import React from 'react';
import ShowCat  from '../client/components/ShowCat';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { actions, action } from '@storybook/addon-actions';
import { Cat } from '../client/types/Cat';

// https://storybook.js.org/docs/react/essentials/actions
const argTypes= {	
	current:{ type: { name: 'Cat|null', required: true }, },
    isChild: { type: { name: 'boolean', required: true }, }, 
 	trigger: {
      action: 'click',
    },
};

const smolCat:Cat= {
    name: "a a",
    dob: new Date(),
    team: "a",
    gender: "m",
    sports: ["American Football"],
    about: "(short data) a a",
    interests: "a a",
    image: null,
  } as Cat;

const bigCat:Cat={
    name: "the highlord chancellor, first sealord and owner of the fishing fleet, laird to the greater Stürmlande isles: furry face II",
    dob: new Date(),
    team: "Oceania",
    gender: "yes, I have one",
    sports: ["Golf",
    "Tennis",
    "Cricket",
    "Basketball",
    "Baseball",
    "American Football",
    "Aquatics",
    "Archery",
    "Automobile Racing",
    "Badminton",
    "Beach Volleyball",
    "Bobsleigh",
    "Body Building",
    "Boxing",
    "Cross Country Running",
    "Cross Country Skiing",
    "Curling",
    "Cycling",
    "Darts",
    "Decathlon",
    "Down Hill Skiing",
    "Equestrianism",
    "eSports",
    "Fencing",
    "Field Hockey",
    "Figure Skating",
    "Gymnastics",
    "Ice Hockey",
    "Martial Arts",
    "Mixed Martial Arts",
    "Modern Pentathlon",
    "Motorcycle Racing",
    "Netball",
    "Polo",
    "Racquetball",
    "Rowing",
    "Rugby",
    "Sailing",
    "Softball",
    "Shooting",
    "Skateboarding",
    "Skeet Shooting",
    "Skeleton",
    "Snow Boarding",
    "Soccer (Football)",
    "Squash",
    "Surfing",
    "Swimming",
    "Track and Field" ],
    about: "(long / big data) sdfsf asdfads adg.admg;ljsdfgk hsd;flgj ;adslfg;adg;oad g;lkad h;gklsdh fkjghasdf;kghjad;lkgh ad;klfg hafg hakl;dfhg kadfh g;aldkladj fglojhg ;adlfg;alkdshg;kladh g;lkadhg adhfg ;adshglakshblakdsg asklu fgaskasha s;las;l adlk;sgh ad;sgha dsgiad gj ad gad ijrgd.as,rg n;klrj l;arhj ;alrga;lh ;als g;klashg;klas hjg;asg;klawsh j;l g;liasd ;oig jh;slewgh;aG AH;SDG H;AS G",
    interests: "LA;EKRJGL;KA GALKGH IAD SDIOUG AHGDSIG ;kljg adlgj ;dlfgj aodjgopisdpoghijego opidghjsd;lig ;sdlk sdlk;oer odfjb;lsrjut y0 wjg;lzdmnfg [9ei t0 qrglwotu 10tja;elkrgw]- i7yia;kugt riuhb;sdkj5 iu ertjh uipwry qorgh]ro6pu-2gh asfiwu3y 5r[4 kylkabn;kajwehrt47uy eljsldmgnq34opi6u3]-5uo rs;tmgn;kwje t -2]7u er;tmhbweklh r0=92y734lk hasn f   2-895 294hkmfsdjbni096ukfnjwe r3i y 0[ptyh;ljkwhelksrty u3yq87r i6bmedhy07850 igh[oi45091    uj54 t91tqpoh209yi [qgh    u92ti24 lkbndmlgwp4]5o ty0981 gip me;rlg j2-0yu03 g;rtmhpj3 k-y93qu0=t2pqjy i 2o-jqh 1-9 uiq kh-ti -qjh=b0 1ui39t ù0g`0=it 1ug=10i  fg0= 9rio   23fp`1ti t -9iqopgq 34opit hqerojh q34o[igj qoigjq [pgujq34giu[q45j gaelrngopeark g[oiq4w3 jug-243 gq -g090w=9eg opergj0=qw e]o jfg iqeroiq3 4jhoearglkhq349ofg`fghwisuf 3pif hwqipufh9qwefu9-w 8fqw9jf 92qjf    fo20f 9-28f 9- 2hf-9   -8ef h9-    ehjf    pof h-9 2 -whfow[qif",
    image: null,
  } as Cat;

  // these are text-charactor rendering test; I have no persona for these profiles
  // it shouldn't be "you drawn badly" for any culture  
const genericAsiaCat:Cat = {
    name: "長長 的綠葉",
    dob: new Date(),
    team: "香港城",
    gender: "f",
    sports: ["American Football"],
    about: "(mandarin utf8 plane) 床前明月光， 疑是地上霜。 举头望明月，低头思故乡",
    interests: "谁知盘中餐，粒粒皆辛苦",
    image: null,
  } as Cat; 

const genericArabCat:Cat = {
    name: "ورقة خضراء طويلة",
    dob: new Date(),
    team: "الأمارات العربية المتحدة",
    gender: "f",
    sports: ["American Football"],
    about: "(arabic utf8 plane, should be RTL) (ابن منظور: لسان العرب)، وعرّف أيضا بـ (هو: النظم الموزون، وحده ما تركّب تركباً متعاضداً، وكان مقفى موزوناً، مقصوداً به ذلك. فما خلا من هذه القيود أو بعضها فلا يسمى (شعراً) ولا يُسمَّى قائله (شاعراً)، ولهذا ما ورد في الكتاب أو السنة موزوناً، فليس بشعر لعدم القصد والتقفية، وكذلك ما يجري على ألسنة الناس من غير قصد؛ لأنه مأخوذ من (شعرت). ",
    interests: " ويشار إلى هذا المفهوم في الشعر العربي باسم الوقفة على-الأطلال (الوقوف على الأطلال / وقوفه إلى جانب الأنقاض) لأن الشاعر غالبا ما يبدأ قصيدته بالقول انه يقف على أطلال حبيبته. بل هو نوع من الحنين إلى الماضى والحسرة على ما فات. بعض شعراء الجاهلية الشهيرين:  عدي بن ربيعة الزير أبو ليلى المه",
    image: null,
  } as Cat; 
 

export default {
    title: 'ShowCat',
    component: ShowCat,
    argTypes,
  //  parameters:{
  //		actions:{ 
  //		 handles: ['trigger', '#togFencing'],
  //				 }
  //	}
  
  };
  
export const STEP0 = () => { return ( <BrowserRouter><ShowCat current={null} isChild={true}  /> </BrowserRouter> ) };
export const STEP1 = () => { return ( <BrowserRouter><ShowCat current={null} isChild={false}  /></BrowserRouter>) };
export const STEP2  = () => { return (<BrowserRouter><ShowCat current={smolCat} isChild={true}  /></BrowserRouter>) }; 
export const STEP3  = () => { return (<BrowserRouter><ShowCat current={smolCat} isChild={false}  /></BrowserRouter>) }; 
export const STEP4  = () => { return (<BrowserRouter><ShowCat current={bigCat} isChild={true}  /></BrowserRouter>) }; 
export const STEP5  = () => { return (<BrowserRouter><ShowCat current={bigCat} isChild={false}  /></BrowserRouter>) }; 
export const STEP6 = () => { return (<BrowserRouter><ShowCat current={genericAsiaCat} isChild={false}  /></BrowserRouter>) }; 
export const STEP7 = () => { return (<BrowserRouter><ShowCat current={genericArabCat} isChild={false}  /></BrowserRouter>) }; 


