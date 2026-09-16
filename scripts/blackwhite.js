// blackwhite
// by VeeArr (#2045369)
//
// Based on spading by MontyPythn (#256896), Semenar (#3275442), and others

const kol = require("kolmafia");

const MAIN_INGREDIENTS=[
	{food:"beef",effect:"+10 to Familiar Weight"},
	{food:"chicken",effect:"+50% Item Drops from Monsters"},
	{food:"potato",effect:"+3 Stats Per Fight"},
	{food:"lettuce",effect:"+100% Combat Initiative"},
	{food:"pork",effect:"Serious Resistance to All Elements (+3)"},
	{food:"fish",effect:"+100% Meat from Monsters"},
];

const INGREDIENTS=[
	{itemId:159,effect:"Restore 100 HP",name:"<name> with fresh rolls"},
	{itemId:161,effect:"Gain 100 Meat",name:"<name> avec oeuf"},
	{itemId:304,effect:"Gives your familiar 20 Experience",name:"<name> over noodles"},
	{itemId:8,effect:"+100 all stats",name:"spicy <name>"},
	{itemId:672,effect:"+150 Mysticality",name:"<name> over cranberry reduction"},
	{itemId:1006,effect:"1.5x stat gain",name:"<name> with a cherry on top"},
	{itemId:1462,effect:"+100 Mysticality",name:"newty <name>"},
	{itemId:246,effect:"Tomato Power, 50 Adventures",name:"<name> marinara"},
	{itemId:243,effect:"Scared Stiff, 50 Adventures",name:"breakfast <name>"},
	{itemId:332,effect:"Lemon Enlightenment, 50 Adventures",name:"lemon <name>"},
	{itemId:245,effect:"Superhuman Sarcasm, 50 Adventures",name:"<name> in olive oil"},
	{itemId:242,effect:"Pronounced Potency, 50 Adventures",name:"<name> l'orange"},
	{itemId:786,effect:"Ermine Eyes, 50 Adventures",name:"candied <name>"},
	{itemId:55,effect:"Eau D'enmity, 50 Adventures",name:"extra-spicy <name>"},
	{itemId:672,effect:"Cranberry Cordiality, 50 Adventures",name:"Thanksgiving <name>"},
	{itemId:358,effect:"Gr8ness, 50 Adventures",name:"gr8 <name>"},
	{itemId:1558,effect:"On the Shoulders of Giants, 50 Adventures",name:"tangerine <name> tangine"},
	{itemId:2063,effect:"Blackberry Politeness, 50 Adventures",name:"black <name>"},
	{itemId:237,effect:"+75 Muscle",name:"boozy <name>"},
	{itemId:238,effect:"+75 Moxie",name:"<name> al vodka"},
	{itemId:328,effect:"+75 Mysticality",name:"old fashioned <name>"},
	{itemId:787,effect:"+75 Muscle",name:"rum-soaked <name>"},
	{itemId:1004,effect:"+75 Moxie",name:"mexican <name>"},
	{itemId:1005,effect:"+75 Mysticality",name:"day-drinking <name>"},
	{itemId:165,effect:"Sharp Weapon, 200 Adventures",name:"<name> kebab"},
	{itemId:182,effect:"Restore 200 HP",name:"hagis-style <name>"},
	{itemId:158,effect:"Litely Baked, 10 Adventures",name:"baked <name>"},
	{itemId:170,effect:"+100 Mysticality",name:"<name> that's watching you"},
	{itemId:182,effect:"+100 Moxie",name:"batty <name>"},
	{itemId:183,effect:"+100 Mysticality",name:"winged <name>"},
	{itemId:209,effect:"Empathy, 50 Adventures",name:"veganish <name> "},
	{itemId:302,effect:"Incredibly Hulking, 10 Adventures",name:"sausage-infused <name>"},
	{itemId:357,effect:"Restore 250 MP",name:"eXtreme <name>"},
	{itemId:589,effect:"Sugar Rush, 50 Adventures",name:"cocoaliscious-<name>"},
	{itemId:830,effect:"2x stat gain",name:"jellied <name>"},
	{itemId:2524,effect:"Fishy, 50 Adventures",name:"kinda-fishy <name>"},
	{itemId:4956,effect:"Gain 500 Meat",name:"philosopher's <name>"},
	{itemId:5789,effect:"Greasy Visage, 50 Adventures",name:"greasy <name>"},
	{itemId:1003,effect:"Bubbly, 25 Adventures",name:"carbonated <name>"},
	{itemId:186,effect:"Bubbly, 50 Adventures",name:"caffeinated <name>"},
	{itemId:2532,effect:"+150 all stats",name:"long <name>"},
	{itemId:2583,effect:"Gives your familiar 30 Experience",name:"<name> and caviar"},
	{itemId:187,effect:"Tenacity of the Snapper, 50 Adventures",name:"crunchy <name>"},
	{itemId:4,effect:"Astral Shell, 50 Adventures",name:"sacred <name>"},
	{itemId:2094,effect:"Ode to Booze, 15 Adventures",name:"<name> with a blintz chaser"},
	{itemId:2589,effect:"Well Fed, 100 Adventures",name:"<name> hors d'oeuvres"},
	{itemId:2338,effect:"Well Fed, 50 Adventures",name:"<name> pudding"},
	{itemId:6724,effect:"+50 all stats",name:"jungle <name>"},
];

const SPECIAL_INGREDIENTS=[
	{itemId:3491,effect:"+250 Moxie",name:"slick <name>"},
	{itemId:3490,effect:"+250 Mysticality",name:"glistening <name>"},
	{itemId:3489,effect:"+250 Muscle",name:"beefy <name>"},
	{itemId:1562,effect:"Incredibly Hulking, 50 Adventures",name:"New Zealand style <name>"},
	{itemId:1560,effect:"Cock of the Walk, 50 Adventures",name:"garnished <name>"},
	{itemId:1557,effect:"Ponderous Potency, 50 Adventures",name:"quatted <name>"},
	{itemId:1561,effect:"Ocelot Eyes, 50 Adventures",name:"<name> with berries"},
	{itemId:759,effect:"Contemptible Emanations, 50 Adventures",name:"dilled <name>"},
	{itemId:1559,effect:"Concentrated Concentration, 50 Adventures",name:"<name> and tonic"},
	{itemId:2525,effect:"Fishy, 100 Adventures",name:"fishy <name>"},
	{itemId:1356,effect:"Gives your familiar 30 Experience",name:"jumpin' <name>"},
	{itemId:1122,effect:"+100 all stats",name:"<name> in gravy"},
	{itemId:748,effect:"1.5x stat gain",name:"<name> over a gourd reduction"},
];

function seedFrom(pathId,classId,eaten,mealIdx){
	return 37*pathId+69*classId+42*eaten+111*mealIdx;
}

function shuffle(arr, rng){
	for (let i = arr.length-1; i > 0; i--)
	{
		let r = kol.phpRand(rng, 0, i);
		if (r != i){
			let temp = arr[i];
			arr[i] = arr[r];
			arr[r] = temp;
		}
	}
}

function getMealKit(pathId,classId,prevEaten){
	let mainIngs=MAIN_INGREDIENTS.slice();
	let rng=kol.phpSeed(seedFrom(pathId,classId,prevEaten,0));
	shuffle(mainIngs,rng);
	let rv={mainIngredient:mainIngs[0],meals:[]};
	
	for([i,bonus] in ["Muscle","Mysticality","Moxie"]){
		let meal={statBonus:bonus+" stats",ingredients:[]};
		let ings=INGREDIENTS.slice();
		rng=kol.phpSeed(seedFrom(pathId,classId,prevEaten,i));
		shuffle(ings,rng);
		for(j=0;j<4;j++){
			meal.ingredients.push(ings[j]);
		}

		ings=SPECIAL_INGREDIENTS.slice();
		rng=kol.phpSeed(seedFrom(pathId,classId,prevEaten,i));
		shuffle(ings,rng);
		meal.ingredients.push(ings[0]);
		rv.meals.push(meal);
	}
	return rv;
}
module.exports.getMealKit=getMealKit;

function main(arg){	
	let args=arg===undefined?[]:arg.split(/\s+/);
	let path;
	let clazz;
	let eaten;
	if(args.length==0){
		path=kol.myPathId();
		clazz=kol.myClass().id;
		eaten=parseInt(kol.getProperty("bwApronMealsEaten"));
	}else if(args.length==3){		
		path=parseInt(args[0]);
		clazz=parseInt(args[1]);
		eaten=parseInt(args[2]);
	}else{
		kol.print("Usage:","red");
		kol.print("blackwhite","red");
		kol.print("blackwhite <pathId> <classId> <prevEaten>","red");
		return;
	}
	
	kol.print("Path ID: "+path+", Class ID: "+clazz+", Prev Eaten: "+eaten,"blue");
	kol.print();
	
	let mealKit=getMealKit(path,clazz,eaten);
	kol.printHtml("<b>Main ingredient: "+mealKit.mainIngredient.food+" ("+mealKit.mainIngredient.effect+")</b>");
	kol.print();
	
	let table="<table>";
	for(meal of mealKit.meals){
		table+="<tr><td colspan=4><u>"+meal.statBonus+"</u></td></tr>";
		for(ingredient of meal.ingredients){
			table+="<tr><td>"+ingredient.itemId+"</td><td>"+kol.toItem(ingredient.itemId).name+"</td><td>"+ingredient.effect+"</td><td>"+kol.entityEncode(ingredient.name)+"</td></tr>";
		}
		table+="<tr></tr>";
	}
	table+="</table>";
	kol.printHtml(table);
}
module.exports.main=main;
