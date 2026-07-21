const refrigerators = {
    name: "ثلاجة و فريزر",
    image :"images/categories/fridge.png",

    sections: [

        {
            name : "ماتور" ,
            products :[
                {name :"ZMC ماتور مقاس خمس (1/5) ", price :   "0", image :"refs/EMG-77.png" , specs : [ " (ZMC) الماركة : زانوسي","الكود :EMG-77AA" ,"الفريون : 134" ,"شامل الشحن و التركيب ","ضمان سنة معتمد" ,]} ,
                {name :"ZMC ماتور مقاس ربع (1/4) ", price :   "0", image :"refs/EMG-80.png", specs : ["(ZMC) الماركة : زانوسي","الكود : EMG-80 AF","الفريون : 134","شامل الشحن و التركيب","ضمان سنة معتمد"]} ,
                {name :"ZMC ماتور مقاس سدس (1/6) ", price :   "0", image :"refs/GM-66.png", specs : ["(ZMC) الماركة : زانوسي","الكود : GM-66 AA","الفريون : 134" ,"شامل الشحن و التركيب" , "ضمان سنة معتمد"]} ,
                {name :"ZMC ماتور مقاس نصف (1/2)", price :   "0", image :"refs/GP-12.png", specs :["(ZMC) الماركة : زانوسي","الكود : GP-12-TB","الفريون : 134","شامل الشحن و التركيب","ضمان سنة معتمد"]} ,
                {name :"ZMC ماتور مقاس ثلث ارباع (3/4)", price :   "0", image :"refs/GP-14.png" , specs :["(ZMC) الماركة : زانوسي","الكود : GP-14-TB","الفريون : 134","شامل الشحن و التركيب","ضمان سنة معتمد"]} ,
                
            ]

        },

        {
            name: "ترموستات",

            products: [
                {name:"diesel ترموستات 1102",price :"0",image :"refs/1102.png",specs :["الماركة : DIESEL","الكود : K59-L1102(VT9)","متوافق مع ثلاجات ديفروست 2 باب","capillary : 800 mm"]},
                {name:"TOMTHON ترموستات 1100",price :"0",image :"refs/1100.png",specs :["الماركة : TOMTHON","الكود : K54-P1100","متوافق مع فريزر 3 طرف","capillary : 1000 mm"]},
                {name:"TOMTHON ترموستات 1179",price :"0",image :"refs/1179.png",specs :["الماركة : TOMTHON","الكود : K50-P1179","متوافق مع ثلاجات ديفروست 1 باب","capillary : 800 mm"]},
                {name:"RENGO ترموستات 1346",price :"0",image :"refs/1346.png",specs :["الماركة : RENGO","الكود : K50-P1346","متوافق مع ثلاجات 2 طرف","capillary : 900 mm"]},
                {name:"ترموستات 3581",price :"0",image :"refs/3581.png",specs :["الكود : G-3581","متوافقة مع ثلاجات اديال ايليت"]},
                {name : "ترموستات كوري",price : "0",image : "refs/korean.png",specs :["الماركة : كوري ","الكود : PFN-110UA","متوافق مع ثلاجات اديال 1 باب"]},
                {name : "ترموستات 124",price : "0",image : "refs/124g.png",specs :["الكود : PFN-124G","متوافقة مع ثلاجات اديال ايليت"]},
                {name :"ترموستات  +-  30",price :"0",image :"refs/+-30.png",specs:["الكود : f/2000","متوافقة مع ثلاجات عرض "]},
                {name : "RANCO ترموستات ثلاجة كريازي (هوائي)",price :"0",image :"refs/s3534.png",specs:["الماركة : RANCO (اوروبي)","الكود : K50-S3534","متوافق مع الثلاجات الكريازي 2 باب","capillary : 1350 mm"]},
                {name :"ترموستات ديب فريزر قصير",price :"0",image :"refs/216382.png",specs :["الماركة : ATEA (ايطالي)","الكود : 216/382","متوافق مع فريزر 3 طرف","capillary : 1000 mm"]},
                {name :"RENGO ترموستات",price :"0",image :"refs/VT9.png",specs :["الماركة : RENGO","الكود : VT9","متوافق مع ثلاجات و فريزر 3 طرف","capillary : 1200 mm"]},
            ]   
        },
        {
            name : "سخانات" ,
            products : [
                {name:"سخان ثلاجة كريازي",price:"0",image:"refs/tomthon.png",specs:["الماركة : TOMTHON","متوافق مع ثلاجات كريازي 14 قدم نو فروست"]},
                {name:"سخان صرف ارضية فريزر",price:"0",image:"refs/eivel.png",specs:["الماركة : EIVEL","متوافق مع ديب فريزر كريازي نو فروست"]},
                {name:"سخان صرف ارضية فريزر",price:"0",image:"refs/paper_diesel.png",specs:["الماركة : DIESEL","متوافق مع ديب فريزر كريازي نو فروست"]},
                {name:"سخان صرف ارضية ثلاجة",price:"0",image:"refs/power.png",specs:["الماركة : POWER","متوافق مع  ثلاجة كريازي نو فروست 14 قدم"]},
                {name:"سخان ثلاجة كريازي",price:"0",image:"refs/sadek.png",specs:["الماركة : SADEK","متوافق مع  ثلاجة كريازي نو فروست 18 قدم"]},
                {name:"سخان ثلاجة توشيبا",price:"0",image:"refs/fast_forward.png",specs:["الماركة : FAST FORWARD","الكود : RF-T-HEAT-14-16F","متوافق مع  ثلاجة توشيبا 14-16 قدم نو فروست"]},
                {name:"سخان ديب فريزر توشيبا",price:"0",image:"refs/arabi.png",specs:["الماركة : العربي","28K-19 : الكود","متوافق مع ديب فريزر توشيبا نو فروست"]},
                {name:"سخان ثلاجة توشيبا",price:"0",image:"refs/blass_diesel.png",specs:["الماركة : DIESEL","متوافق مع ثلاجة توشيبا 12 قدم نو فروست"]},
                {name:"سخان ثلاجة كريازي",price:"0",image:"refs/kiriazi18.png",specs:["الماركة : SADEK","متوافق مع ثلاجة كريازي 18 قدم نو فروست"]},
            ]
        },

        {
            name: "تايمر",

            products: [

                {name :"تايمر توشيبا",price :'0',image:"refs/toshiba_timer.png",specs :["الماركة : توشيبا","الكود : TMDFY06ED1","متوافق مع ثلاجات توشيبا",]},
                {name : "تايمر كريازي",price :"0",image :"refs/kiriazi_timer.png",specs:["الماركة : SADEK","الكود : TMDC625-1","متوافق مع الثلاجات الكريازي دي فروست",]},
                {name : "تايمر اديال",price :"0",image :"refs/idial_timer.png",specs:["الماركة : SADEK","الكود : SC706","متوافق مع الثلاجات الاديال نو فروست",]},
            ]
        },

        {
            name : "مروحة تبريد" ,
            products :[
                {name:"مروحة تبريد ثلاجة عرض",price :"0",image :"refs/fan_desk.png",specs:["الماركة : SADEK","القوة : 30 واط","عدد اللفات في الدقيقة : 2200"]},
                {name:"مروحة تبريد ماتور",price :"0",image :"refs/fan_10w.png",specs:["الماركة : GLOBAL","القوة : 10 واط","عدد اللفات في الدقيقة : 1250"]},
                {name:"مروحة تبريد ماتور",price :"0",image :"refs/fan_16w.png",specs:["الماركة : GLOBAL","القوة : 16 واط","عدد اللفات في الدقيقة : 1300"]},
                {name:"ريشة مروحة تبريد بلاستيك (صغير)",price :"0",image :"refs/feather_s.png",specs:["لمروحة تبريد الماتور"]},
                {name:"ريشة مروحة تبريد(صغير)",price :"0",image :"refs/feather_m.png",specs:["لروحة تبريد الماتور"]},
                {name:"ريشة مروحة تبريد(وسط)",price :"0",image :"refs/feather_l.png",specs:["لروحة تبريد الماتور"]},
                {name:"ريشة مروحة تبريد(كبير)",price :"0",image :"refs/feather_l.png",specs:["لروحة تبريد الماتور"]},
                {name:"مروحة تبريد ماتور",price :"0",image :"refs/s_fan.png",specs:["الماركة : TOMTHON","القوة : 9 واط"]},
            ]
        },
        {
            name : "شبك (سربنتينة)" ,
            products :[]
        },
        {
            name : "فريون" ,
            products : [
                {name :"فريون 404",price:"0",image:"refs/ferion_404.png",specs:["الحجم : 2.5 كيلو"]}
            ]
        },
        
        
        {
            name : "مجموعة relay + over load" ,
            products : [
                {name:"مجموعة ماتور ثلاجة",image:"refs/over_load.png",price :"0",specs:["الماركة : SADEK","(over load)النوع : اوفر لود"]},
                {name:"مجموعة توشيبا للثلاجة",image:"refs/relay_tosheba.png",price :"0",specs:["الماركة : TOSHIBA","(relay)النوع : ريلاي"]},
                {name:"مجموعة ماتور ثلاجة",image:"refs/relay.png",price :"0",specs:["الماركة : DIESEL","(relay)النوع : ريلاي"]},
            ]
        },
        {
            name : "كابلري" ,
            products : [
                {name : "كابلري مقاس 28",price:"0",image :"refs/28.png",specs:["الماركة : DIESEL"]},
                {name : "كابلري مقاس 31",price:"0",image :"refs/31.png",specs:["الماركة : DIESEL"]},
                {name : "كابلري مقاس 36",price:"0",image :"refs/36.png",specs:["الماركة : SADEK"]},
                {name : "كابلري مقاس 55",price:"0",image :"refs/55.png",specs:["الماركة : SADEK"]},
                {name : "كابلري مقاس 70",price:"0",image :"refs/70.png",specs:["الماركة : SADEK"]},

            ]
        },
        
        {
            name : "لوحة تحكم (كارتة)" ,
            products : [
                {name : "كارتة ثلاجة شارب",price :"0",image:"refs/sharp_board.png",specs:["الماركة : العربي","الكود : RF-SH-MAINBORD-58A0"]}
            ]
        },
        {
            name : "حساسات" ,
            products : [
                {name :"حساس ثلاجة كريازي",price :"0",image :"refs/kirazi_sensor.png",specs:["الماركة : POWER"]}
            ]
        },
        {
            name : "ثيرمو ديسك" ,
            products : []
        },
        {
            name :   "اخرى" ,
            products : [
                {name : "بلف شحن" ,price : "0",image :"refs/balf.png",specs : ["مقاسين"]},
                {name : "فلتر مقاس كبير",price : "0",image :"refs/big_filter.png",specs :["الماركة : اطالي"]} ,
                {name :"فلتر مقاس صغير",price :"0",image :"refs/small_filter.png",specs :["الماركة : اطالي"]},
                {name :"فريزر (مبخر)",price :"0",image :"refs/freezer.png",specs :["الماركة :EVIDAL","متوافق مع الثلاجات 1باب 8-10 قدم"]},
                {name :"لمبة ثلاجة توشيبا",price :"0",image :"refs/toshiba_lamb.png",specs :["الماركة :توشيبا","متوافقة مع ثلاجات توشيبا"]},
                {name :"ثوزان مواسير",price :"10",image :"refs/thaosan.png",specs :["منظف مواسير ثلاجة"]},
                {name :"لمبة ثلاجة",price :"0",image :"refs/main_lamb.png",specs :["الماركة :AL-REDA","متوافقة مع معظم انواع الثلاجات"]},
                {name :"درج مياه ماتور",price :"0",image :"refs/cover.png",specs :["حماية الماتور من المياه"]},
            ]
        },










    ]
};
