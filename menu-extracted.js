const MENU = [
  // ── STARTERS ──
  {id:1,  name:"Samosa (2 pcs)",              cat:"Starters",   price:60, image:"images/samosa2pc.jpg",desc:"Crispy pastry filled with spiced potato & peas, with mint chutney",            veg:true,  spicy:true,  best:true,  rating:4.8, rcount:312},
  {id:2,  name:"Paneer Tikka",                cat:"Starters",   price:180, image:"images/panner tikka.jpg", desc:"Tandoor-charred cottage cheese cubes marinated in yogurt & spices",             veg:true,  spicy:true,  best:true,  rating:4.7, rcount:245},
  {id:3,  name:"Chicken Tikka",               cat:"Starters",   price:220, image:"images/chicken tikka.jpg", desc:"Juicy boneless chicken marinated in tandoori masala, served with raita",        veg:false, spicy:true,  best:true,  rating:4.9, rcount:410},
  {id:4,  name:"Hara Bhara Kabab",            cat:"Starters",   price:140, image:"images/Hara Bhara Kabab.jpg", desc:"Spinach, peas & potato patties with green chutney",                             veg:true,  spicy:false, best:false, rating:4.4, rcount:102},
  {id:5,  name:"Chicken 65",                  cat:"Starters",   price:200,  image:"images/chicken65.jpg", desc:"Deep-fried spicy chicken bites from Chennai, tossed with curry leaves",         veg:false, spicy:true,  best:true,  rating:4.8, rcount:380},
  // ── MAINS ──
  {id:6,  name:"Butter Chicken",              cat:"Mains",      price:280,  image:"images/butter chicken.jpg", desc:"Tender chicken in rich tomato-butter gravy, best with naan",                    veg:false, spicy:false, best:true,  rating:4.9, rcount:520},
  {id:7,  name:"Paneer Butter Masala",        cat:"Mains",      price:240,  image:"images/Paneer Butter Masala.jpg", desc:"Cottage cheese cubes in velvety tomato & cashew gravy",                         veg:true,  spicy:false, best:true,  rating:4.8, rcount:390},
  {id:8,  name:"Dal Makhani",                 cat:"Mains",      price:200,  image:"images/Dal Makhani,.jpg", desc:"Black lentils slow-cooked overnight with butter & cream",                       veg:true,  spicy:false, best:true,  rating:4.7, rcount:310},
  {id:9,  name:"Chicken Biryani",             cat:"Mains",      price:320,  image:"images/chickenbriyani.jpg", desc:"Fragrant basmati rice layered with spiced chicken, saffron & fried onion",      veg:false, spicy:true,  best:true,  rating:4.9, rcount:680},
  {id:10, name:"Vegetable Biryani",           cat:"Mains",      price:260,  image:"images/vegbriyani.jpg", desc:"Dum-cooked basmati with seasonal vegetables & whole spices",                    veg:true,  spicy:true,  best:false, rating:4.5, rcount:210},
  {id:11, name:"Palak Paneer",                cat:"Mains",      price:230,  image:"images/Palak Paneer.jpg", desc:"Creamy spinach gravy with soft paneer cubes & mild spices",                     veg:true,  spicy:false, best:false, rating:4.6, rcount:195},
  {id:12, name:"Mutton Rogan Josh",           cat:"Mains",      price:360,  image:"images/Mutton Rogan Josh.jpg", desc:"Kashmiri-style slow-braised mutton in aromatic whole-spice gravy",              veg:false, spicy:true,  best:false, rating:4.7, rcount:175},
  {id:13, name:"Chole Bhature",               cat:"Mains",      price:160,  image:"images/Chole Bhature.jpg", desc:"Spiced chickpea curry with fluffy fried bread — a North Indian classic",        veg:true,  spicy:true,  best:true,  rating:4.8, rcount:430},
  // ── PIZZA ──
  {id:14, name:"Margherita Pizza",            cat:"Pizza",      price:229,  image:"images/Margherita Pizza.jpg", desc:"Classic San Marzano tomato base, fresh mozzarella & fragrant basil",            veg:true,  spicy:false, best:true,  rating:4.8, rcount:340},
  {id:15, name:"Paneer Tikka Pizza",          cat:"Pizza",      price:279,  image:"images/Paneer Tikka Pizza.jpg", desc:"Tandoori paneer, capsicum, onion & mint chutney base on a thin crust",          veg:true,  spicy:true,  best:true,  rating:4.9, rcount:420},
  {id:16, name:"Chicken BBQ Pizza",           cat:"Pizza",      price:319, image:"images/Chicken BBQ Pizza.png", desc:"Smoky BBQ sauce, grilled chicken strips, red onion & jalapeños",                veg:false, spicy:true,  best:true,  rating:4.8, rcount:510},
  {id:17, name:"Farm Fresh Veggie Pizza",     cat:"Pizza",      price:249,  image:"images/Farm Fresh Veggie Pizza.jpg", desc:"Corn, mushroom, olives, bell peppers & cherry tomatoes on herb base",           veg:true,  spicy:false, best:false, rating:4.5, rcount:185},
  {id:18, name:"Pepperoni Feast Pizza",       cat:"Pizza",      price:349,  image:"images/Pepperoni Feast Pizza.jpg", desc:"Loaded with spicy pepperoni, mozzarella & oregano on a thick crust",            veg:false, spicy:true,  best:false, rating:4.7, rcount:260},
  {id:19, name:"Keema Matar Pizza",           cat:"Pizza",      price:329,  image:"images/Keema Matar Pizza.jpg", desc:"Spiced minced mutton with green peas, onion & coriander — desi style",          veg:false, spicy:true,  best:false, rating:4.6, rcount:190},
  // ── BURGERS ──
  {id:20, name:"Aloo Tikki Burger",           cat:"Burgers",    price:99,   image:"images/Aloo Tikki Burger.jpg", desc:"Crispy spiced potato patty, lettuce, tomato & green chutney in a soft bun",     veg:true,  spicy:true,  best:true,  rating:4.7, rcount:385},
  {id:21, name:"Paneer Zinger Burger",        cat:"Burgers",    price:149,  image:"images/Paneer Zinger Burger.jpg", desc:"Crispy fried paneer fillet, sriracha mayo & coleslaw in a sesame bun",          veg:true,  spicy:true,  best:true,  rating:4.8, rcount:420},
  {id:22, name:"Chicken Maharaja Burger",     cat:"Burgers",    price:179,  image:"images/Chicken Maharaja Burger.jpg", desc:"Double-stacked grilled chicken, cheese, jalapeños & smoky mayo",               veg:false, spicy:true,  best:true,  rating:4.9, rcount:610},
  {id:23, name:"Classic Beef Smash Burger",   cat:"Burgers",    price:219,  image:"images/Classic Beef Smash Burger.jpg", desc:"Double smash patty, American cheese, pickles, mustard & caramelised onion",     veg:false, spicy:false, best:false, rating:4.7, rcount:290},
  {id:24, name:"Mushroom Swiss Burger",       cat:"Burgers",    price:159,  image:"images/Mushroom Swiss Burger.jpg", desc:"Sautéed mushrooms, Swiss cheese, garlic aioli & rocket in a brioche bun",       veg:true,  spicy:false, best:false, rating:4.5, rcount:175},
  {id:25, name:"Spicy Mutton Burger",         cat:"Burgers",    price:229,  image:"images/Spicy Mutton Burger.jpg", desc:"Minced mutton patty marinated in kheema spices, pickled onion & chilli sauce",  veg:false, spicy:true,  best:false, rating:4.6, rcount:210},
  // ── SANDWICHES ──
  {id:26, name:"Bombay Masala Toast",         cat:"Sandwiches", price:89,   image:"images/Bombay Masala Toast.jpg", desc:"Buttered bread layered with spiced potato, onion, chutney & cheese — grilled",  veg:true,  spicy:true,  best:true,  rating:4.8, rcount:460},
  {id:27, name:"Club Sandwich",               cat:"Sandwiches", price:149,  image:"images/Club Sandwich.jpg", desc:"Triple-decker with chicken, egg, bacon, lettuce, tomato & mayo",                veg:false, spicy:false, best:true,  rating:4.7, rcount:310},
  {id:28, name:"Grilled Cheese & Tomato",     cat:"Sandwiches", price:99,   image:"images/Grilled Cheese & Tomato.jpg", desc:"Thick sourdough, aged cheddar, heirloom tomato & basil pesto — pressed hot",    veg:true,  spicy:false, best:false, rating:4.5, rcount:190},
  {id:29, name:"Chicken Caesar Wrap",         cat:"Sandwiches", price:159,  image:"images/Chicken Caesar Wrap.jpg", desc:"Grilled chicken, romaine, parmesan, croutons & Caesar dressing in a flour wrap", veg:false, spicy:false, best:false, rating:4.6, rcount:225},
  {id:30, name:"Paneer Tikka Sandwich",       cat:"Sandwiches", price:129,  image:"images/Paneer Tikka Sandwich.jpg", desc:"Tandoori paneer, mint chutney, onion rings & cheese in a multigrain roll",       veg:true,  spicy:true,  best:false, rating:4.6, rcount:210},
  {id:31, name:"Egg Bhurji Sandwich",         cat:"Sandwiches", price:109,  image:"images/Egg Bhurji Sandwich.jpg", desc:"Spiced scrambled eggs with onion, chilli & coriander in toasted white bread",    veg:true,  spicy:true,  best:false, rating:4.7, rcount:280},
  // ── SHAWARMA ──
  {id:32, name:"Classic Chicken Shawarma",    cat:"Shawarma",   price:149,  image:"images/Classic Chicken Shawarma.jpg", desc:"Marinated chicken, garlic sauce, pickled veggies & fries wrapped in saj bread",  veg:false, spicy:false, best:true,  rating:4.9, rcount:720},
  {id:33, name:"Spicy Chicken Shawarma",      cat:"Shawarma",   price:159,  image:"images/Spicy Chicken Shawarma.jpg", desc:"Extra-fiery chicken shawarma with sriracha, harissa mayo & jalapenos",           veg:false, spicy:true,  best:true,  rating:4.8, rcount:530},
  {id:34, name:"Mutton Shawarma",             cat:"Shawarma",   price:189,  image:"images/Mutton Shawarma.jpg", desc:"Slow-roasted mutton, tahini, hummus, tomato & red onion in a thin wrap",         veg:false, spicy:true,  best:false, rating:4.7, rcount:340},
  {id:35, name:"Falafel Shawarma",            cat:"Shawarma",   price:139,  image:"images/Falafel Shawarma.jpg", desc:"Crispy chickpea falafel, tabbouleh, tahini & pickled turnip — fully veg",        veg:true,  spicy:false, best:true,  rating:4.8, rcount:410},
  {id:36, name:"Paneer Shawarma",             cat:"Shawarma",   price:149,  image:"images/Paneer Shawarma.jpg", desc:"Tandoori paneer slices, mint chutney, onion & cheese in a toasted wrap",         veg:true,  spicy:true,  best:false, rating:4.6, rcount:285},
  {id:37, name:"Shawarma Plate (Chicken)",    cat:"Shawarma",   price:219,  image:" images/Shawarma Plate (Chicken).jpg", desc:"Generous chicken shawarma served open-plate with hummus, salad & pita",          veg:false, spicy:false, best:false, rating:4.7, rcount:190},
  // ── EVENING SNACKS ──
  {
     id:38,
  name:"Masala Vadai",
  cat:"Snacks",
  price:40,
  image:"images/masalavadai.jpg",
  desc:"Crispy chana dal fritter with onions, curry leaves, green chilies and aromatic spices",
  veg:true,
  spicy:true,
  best:true,
  rating:4.9,
  rcount:620
},
  {id:39, name:"Medu Vadai",        cat:"Snacks", price:35, image:"images/medhuvadai.jpg", desc:"Golden-fried urad dal vada with a crispy exterior and soft fluffy center", veg:true, spicy:false, best:true, rating:4.8, rcount:590},
  {id:40, name:"Sundal",            cat:"Snacks", price:50, image:"images/sundal.jpg", desc:"Protein-rich boiled chickpeas tempered with mustard, curry leaves, coconut and spices", veg:true, spicy:false, best:false, rating:4.7, rcount:410},

  {id:41, name:"Masala Maggi",                cat:"Snacks",     price:80,   image:"images/masalamaggi.jpg", desc:"Street-style noodles tossed with veggies, chilli & pav bhaji masala",            veg:true,  spicy:true,  best:true,  rating:4.7, rcount:490},
  {id:42, name:"Adai",              cat:"Snacks", price:70, image:"images/adai.jpg", desc:"Traditional multi-lentil dosa served hot with butter or coconut chutney", veg:true, spicy:true, best:true, rating:4.8, rcount:470},


  
  {id:43,name:"Kuzhi Paniyaram",   cat:"Snacks", price:80, image:"images/Kuzhi Paniyaram.jpg", desc:"Soft and crispy bite-sized dumplings made from fermented dosa batter", veg:true, spicy:false, best:true, rating:4.9, rcount:530},
  {id:44, 
  name:"Masala Sweet Corn",
  cat:"Snacks",
  price:60,
  image:"images/Masala Sweet Corn.jpg",
  desc:"Steamed sweet corn tossed with butter, lemon juice, chaat masala and fresh herbs",
  veg:true,
  spicy:true,
  best:true,
  rating:4.8,
  rcount:490
},
  {id:45, name:"Crispy Onion Bhaji (5 pcs)",  cat:"Snacks",     price:80,   image:"images/Crispy Onion Bhaji (5 pcs).jpg", desc:"Golden gram-flour fritters with onion, chilli & ajwain — with chutney",          veg:true,  spicy:true,  best:false, rating:4.6, rcount:280},
  // ── BREADS & SIDES ──
  {id:46, name:"Parotta",            cat:"Sides", price:40,  image:"images/parrota.jpg", desc:"Soft and flaky South Indian layered flatbread served hot with flavorful salna or curry", veg:true, spicy:false, best:true,  rating:4.9, rcount:620},

{id:47, name:"Chapati",            cat:"Sides", price:35,  image:"images/chappathi.jpg", desc:"Fresh whole wheat flatbread served with vegetable kurma or your favorite curry", veg:true, spicy:false, best:true, rating:4.8, rcount:480},

{id:48, name:"Jeera Rice",         cat:"Sides", price:100, image:"images/jeera rice.jpg", desc:"Steamed basmati rice flavored with cumin seeds, ghee and aromatic Indian spices", veg:true, spicy:false, best:false, rating:4.7, rcount:280},

{id:49, name:"Curd Rice",          cat:"Sides", price:80,  image:"images/curdrice.jpg", desc:"Creamy South Indian curd rice tempered with mustard, curry leaves and green chilies", veg:true, spicy:false, best:true, rating:4.9, rcount:540},

{id:50, name:"Veg Salna",          cat:"Sides", price:60,  image:"images/veg salna.jpg", desc:"Spicy Tamil Nadu-style vegetable gravy, a perfect accompaniment for parotta and chapati", veg:true, spicy:true, best:true, rating:4.8, rcount:420},
  // ── DESSERTS ──
  {id:51, name:"Gulab Jamun (2 pcs)",         cat:"Desserts",   price:80,   image:"images/Gulab Jamun (2 pcs).jpg", desc:"Soft milk-solid dumplings soaked in rose & cardamom sugar syrup",                veg:true,  spicy:false, best:true,  rating:4.9, rcount:490},
  {id:52, name:"Gajar Halwa",                 cat:"Desserts",   price:110,  image:"images/Gajar Halwa.jpg", desc:"Slow-cooked carrot pudding with ghee, milk, cardamom & dry fruits",              veg:true,  spicy:false, best:false, rating:4.7, rcount:210},
  {id:53, name:"Rasmalai (2 pcs)",            cat:"Desserts",   price:100,  image:"images/Rasmalai (2 pcs).jpg", desc:"Soft chenna patties soaked in saffron-flavoured sweetened milk",                 veg:true,  spicy:false, best:true,  rating:4.8, rcount:305},
  {id:54, name:"Mango Kulfi",                 cat:"Desserts",   price:90,   image:"images/mango kulfi.jpg", desc:"Dense Alphonso mango ice cream on a stick with pistachio crumble",               veg:true,  spicy:false, best:false, rating:4.6, rcount:188},
  // ── DRINKS ──
  // DRINKS
{id:55, name:"Filter Coffee",          cat:"Drinks", price:40, image:"images/Filter Coffee.jpg", desc:"Authentic South Indian filter coffee brewed with fresh decoction and creamy milk", veg:true, spicy:false, best:true, rating:4.9, rcount:720},

{id:56, name:"Masala Tea",            cat:"Drinks", price:35, image:"images/Masala Tea.jpg", desc:"Traditional Indian tea brewed with ginger, cardamom and aromatic spices", veg:true, spicy:false, best:true, rating:4.8, rcount:650},

{id:57, name:"Mango Lassi",            cat:"Drinks", price:90, image:"images/Mango Lassi.jpg", desc:"Creamy yogurt blended with sweet Alphonso mangoes, served chilled", veg:true, spicy:false, best:true, rating:4.9, rcount:490},

{id:58, name:"Fresh Lime Soda",        cat:"Drinks", price:60, image:"images/Fresh Lime Soda.jpg", desc:"Refreshing lime soda with a perfect balance of sweet, salt and fizz", veg:true, spicy:false, best:true, rating:4.8, rcount:380},

{id:59, name:"Buttermilk (Neer Mor)",  cat:"Drinks", price:40, image:"images/Buttermilk (Neer Mor).jpg", desc:"Traditional Tamil-style spiced buttermilk with curry leaves, ginger and green chilli", veg:true, spicy:false, best:true, rating:4.8, rcount:450},
  // ── MOJITOS ──
  {id:60, name:"Classic Mint Mojito",         cat:"Mojitos",    price:120,  image:"images/Classic Mint Mojito.jpg", desc:"Fresh mint, lime juice, sugar syrup & soda over crushed ice — virgin",           veg:true,  spicy:false, best:true,  rating:4.9, rcount:580},
  {id:61, name:"Watermelon Mojito",           cat:"Mojitos",    price:130,  image:"images/watermelon mojito.jpg", desc:"Blended watermelon, mint, lime & sparkling water — refreshingly light",          veg:true,  spicy:false, best:true,  rating:4.8, rcount:420},
  {id:62, name:"Kiwi Mojito",                 cat:"Mojitos",    price:140,  image:"images/Kiwi Mojito.jpg", desc:"Muddled kiwi, mint, lime zest & chilled soda with a sugar rim",                  veg:true,  spicy:false, best:false, rating:4.7, rcount:295},
  {id:63, name:"Strawberry Basil Mojito",     cat:"Mojitos",    price:140,  image:"images/Strawberry Basil Mojito.jpg", desc:"Fresh strawberry, basil leaves, lime & soda with a strawberry garnish",          veg:true,  spicy:false, best:false, rating:4.7, rcount:310},
  {id:64, name:"Blue Lagoon Mojito",          cat:"Mojitos",    price:150,  image:"images/Blue Lagoon Mojito.jpg", desc:"Blue curacao syrup, coconut water, lime & mint — stunning electric blue",        veg:true,  spicy:false, best:true,  rating:4.8, rcount:390},
  {id:65, name:"Spicy Mango Mojito",          cat:"Mojitos",    price:140,  image:"images/Spicy Mango Mojito.jpg", desc:"Alphonso mango pulp, chilli salt rim, mint & sparkling lime water",              veg:true,  spicy:true,  best:false, rating:4.8, rcount:355},
  {id:66, name:"Lychee Rose Mojito",          cat:"Mojitos",    price:150,  image:"images/Lychee Rose Mojito.jpg", desc:"Lychee puree, rose water, mint & soda — floral and subtly sweet",               veg:true,  spicy:false, best:false, rating:4.6, rcount:220},
]
module.exports = MENU;
