import { useState } from "react";
import "./Dashboard.css";

type DietType = "veg" | "nonveg";

const DietPlanContent = () => {
  const [activeCategory, setActiveCategory] = useState<"weight_gain" | "maintenance" | "weight_loss">("maintenance");
  const [activeDay, setActiveDay] = useState<string>("Monday");
  const [dietType, setDietType] = useState<DietType>("veg");

  const handleCategorySwitch = (catId: any) => {
    setActiveCategory(catId);
    setActiveDay("Monday");
  };

  const getMealIcon = (time: string) => {
    switch (time) {
      case 'Breakfast': return '🍳';
      case 'Lunch': return '🥗';
      case 'Dinner': return dietType === 'veg' ? '🥦' : '🍗';
      case 'Snacks': return '🍎';
      default: return '🍽️';
    }
  };

  const categories = [
    { id: "weight_gain", label: "⬆️ Weight Gain (Surplus)" },
    { id: "maintenance", label: "⚖️ Maintenance (Healthy)" },
    { id: "weight_loss", label: "⬇️ Fat Loss (Deficit)" }
  ];

  const dietPlans = {
    weight_gain: [
      {
        day: "Monday", goal: "2,800 kcal", type: "High Carb / High Protein", color: "#3b82f6",
        meals: [
          { time: "Breakfast", veg: "Oatmeal with banana, almond butter, chia seeds & full-fat milk", nonveg: "4 Scrambled Eggs, 2 slices whole wheat toast, 1 banana, whole milk" },
          { time: "Lunch", veg: "Paneer curry (200g) with large quinoa bowl, avocado side salad", nonveg: "Grilled Chicken (200g), large quinoa bowl, avocado side salad" },
          { time: "Dinner", veg: "Tofu steak (8oz), large sweet potato, olive oil roasted broccoli", nonveg: "Salmon fillet (8oz), large sweet potato, olive oil roasted broccoli" },
          { time: "Snacks", veg: "Trail mix (1 cup), peanut butter banana smoothie with soy milk", nonveg: "Trail mix (1 cup), whey protein shake with peanut butter" },
        ]
      },
      {
        day: "Tuesday", goal: "2,850 kcal", type: "High Protein", color: "#3b82f6",
        meals: [
          { time: "Breakfast", veg: "Large bowl of oatmeal with almonds, chia seeds, and honey", nonveg: "Large bowl of oatmeal with almonds, chia seeds, and honey" },
          { time: "Lunch", veg: "Paneer & cheese wrap with hummus, sweet potato fries", nonveg: "Turkey and cheese wrap with hummus, sweet potato fries" },
          { time: "Dinner", veg: "Soya chunk stir-fry with brown rice (2 cups) and asparagus", nonveg: "Lean beef steak (8oz), brown rice (2 cups), asparagus" },
          { time: "Snacks", veg: "Greek yogurt with mixed berries, mass gainer plant-based shake", nonveg: "Greek yogurt with mixed berries, mass gainer shake" },
        ]
      },
      {
        day: "Wednesday", goal: "2,900 kcal", type: "Balanced Macros", color: "var(--accent-purple)",
        meals: [
          { time: "Breakfast", veg: "3 Oat pancakes with maple syrup, peanut butter drizzle", nonveg: "3 Pancakes with maple syrup, 3 turkey sausage links" },
          { time: "Lunch", veg: "Hummus & avocado sandwich on thick whole grain bread, mixed nuts", nonveg: "Tuna salad sandwich on thick whole grain bread, side of mixed nuts" },
          { time: "Dinner", veg: "Cheese pizza with whole wheat crust, side salad with olive oil", nonveg: "Chicken parmigiana with whole wheat pasta, side salad" },
          { time: "Snacks", veg: "Cottage cheese with pineapple, protein bar (plant-based)", nonveg: "Cottage cheese with pineapple, protein bar" },
        ]
      },
      {
        day: "Thursday", goal: "2,800 kcal", type: "High Carb", color: "#3b82f6",
        meals: [
          { time: "Breakfast", veg: "Avocado toast with 2 poached eggs, large glass of orange juice", nonveg: "Avocado toast with 2 poached eggs, large glass of orange juice" },
          { time: "Lunch", veg: "Burrito bowl with black beans, roasted veggies, rice, and guac", nonveg: "Burrito bowl with double chicken, black beans, rice, and guac" },
          { time: "Dinner", veg: "Rajma (kidney bean curry), roasted potatoes, green beans", nonveg: "Pork tenderloin (8oz), roasted potatoes, green beans" },
          { time: "Snacks", veg: "Peanut butter and jelly sandwich, glass of whole milk", nonveg: "Peanut butter and jelly sandwich, glass of whole milk" },
        ]
      },
      {
        day: "Friday", goal: "2,850 kcal", type: "High Protein", color: "var(--accent-purple)",
        meals: [
          { time: "Breakfast", veg: "Protein waffles with peanut butter drizzle, 1 banana", nonveg: "Protein waffles with peanut butter drizzle, 1 banana" },
          { time: "Lunch", veg: "Paneer & veggie stir-fry with thick udon noodles", nonveg: "Beef stir-fry with mixed vegetables and thick udon noodles" },
          { time: "Dinner", veg: "Baked tofu (10oz) with couscous, steamed carrots in butter", nonveg: "Baked cod (10oz), couscous, steamed carrots in butter" },
          { time: "Snacks", veg: "Mixed nuts, dark chocolate, a glass of whole milk", nonveg: "2 hard-boiled eggs, handful of walnuts" },
        ]
      },
      {
        day: "Saturday", goal: "3,000 kcal", type: "Heavy Refeed", color: "var(--accent-blue)",
        meals: [
          { time: "Breakfast", veg: "Spinach & cheese omelet with bagels and cream cheese", nonveg: "4-Egg omelet with cheese and spinach, bagels with cream cheese" },
          { time: "Lunch", veg: "Veggie loaded burger with cheese, baked potato wedges", nonveg: "Double cheeseburger (lean beef), baked potato wedges" },
          { time: "Dinner", veg: "Large Margherita pizza (homemade whole wheat crust), Caesar salad", nonveg: "Large margherita pizza (homemade/healthier crust), Caesar salad" },
          { time: "Snacks", veg: "Dark chocolate, fruit smoothie with soy protein powder", nonveg: "Dark chocolate, fruit smoothie with protein powder" },
        ]
      },
      {
        day: "Sunday", goal: "2,800 kcal", type: "Volume Macros", color: "var(--text-muted)",
        meals: [
          { time: "Breakfast", veg: "Overnight oats prepared with whole milk and dried fruits", nonveg: "Overnight oats prepared with whole milk and dried fruits" },
          { time: "Lunch", veg: "Large paneer Caesar wrap, side of fruit salad", nonveg: "Large chicken Caesar wrap, side of fruit salad" },
          { time: "Dinner", veg: "Creamy mushroom linguine with olive oil and garlic, garlic bread", nonveg: "Shrimp linguine with olive oil and garlic, side of garlic bread" },
          { time: "Snacks", veg: "Rice cakes with almond butter, edamame", nonveg: "Rice cakes with almond butter, edamame" },
        ]
      },
    ],
    maintenance: [
      {
        day: "Monday", goal: "2,200 kcal", type: "Balanced Macros", color: "var(--accent-green)",
        meals: [
          { time: "Breakfast", veg: "Scrambled eggs (2), whole wheat toast, mixed berries", nonveg: "Scrambled eggs (2), whole wheat toast, mixed berries" },
          { time: "Lunch", veg: "Paneer & hummus wrap, cucumber side salad", nonveg: "Turkey wrap with hummus, cucumber side salad" },
          { time: "Dinner", veg: "Tofu & vegetable stir-fry with brown rice (1 cup)", nonveg: "Lean beef stir-fry with brown rice & mixed veggies (1 cup)" },
          { time: "Snacks", veg: "Greek yogurt, small handful of almonds, an apple", nonveg: "Greek yogurt, small handful of almonds, an apple" },
        ]
      },
      {
        day: "Tuesday", goal: "2,200 kcal", type: "Balanced Macros", color: "var(--accent-green)",
        meals: [
          { time: "Breakfast", veg: "Oatmeal (1 cup) with half a banana and cinnamon", nonveg: "Oatmeal (1 cup) with half a banana and cinnamon" },
          { time: "Lunch", veg: "Grilled paneer (150g) over a spinach salad with vinaigrette", nonveg: "Grilled chicken breast (150g) over a spinach salad, vinaigrette" },
          { time: "Dinner", veg: "Baked tofu (6oz), quinoa (1/2 cup), roasted asparagus", nonveg: "Baked salmon (6oz), quinoa (1/2 cup), roasted asparagus" },
          { time: "Snacks", veg: "Low-fat string cheese, baby carrots with a tbsp of hummus", nonveg: "Low-fat string cheese, baby carrots with a tbsp of hummus" },
        ]
      },
      {
        day: "Wednesday", goal: "2,100 kcal", type: "Low Carb", color: "var(--accent-blue)",
        meals: [
          { time: "Breakfast", veg: "3-Egg white omelet with spinach, tomatoes, and feta cheese", nonveg: "3-Egg white omelet with spinach, tomatoes, and feta cheese" },
          { time: "Lunch", veg: "Chickpea salad stuffed in a bell pepper, side of roasted seeds", nonveg: "Tuna salad stuffed in a bell pepper, side of roasted chickpeas" },
          { time: "Dinner", veg: "Zucchini noodles with paneer meatballs and marinara", nonveg: "Zucchini noodles with lean turkey meatballs and marinara" },
          { time: "Snacks", veg: "Celery sticks with 1 tbsp peanut butter, plant protein shake", nonveg: "Celery sticks with 1 tbsp peanut butter, protein shake" },
        ]
      },
      {
        day: "Thursday", goal: "2,300 kcal", type: "High Carb (Workout Day)", color: "var(--accent-purple)",
        meals: [
          { time: "Breakfast", veg: "Whole grain cereal with almond milk, 1 hard-boiled egg", nonveg: "Whole grain cereal with almond milk, 1 hard-boiled egg" },
          { time: "Lunch", veg: "Bowl of lentil soup, side of whole grain crackers with hummus", nonveg: "Bowl of lentil soup, side of whole grain crackers" },
          { time: "Dinner", veg: "Paneer fajitas with corn tortillas, peppers, and onions", nonveg: "Chicken fajitas with corn tortillas, peppers, and onions" },
          { time: "Snacks", veg: "Apple slices with dark chocolate hummus", nonveg: "Apple slices with dark chocolate hummus" },
        ]
      },
      {
        day: "Friday", goal: "2,200 kcal", type: "Balanced Macros", color: "var(--accent-green)",
        meals: [
          { time: "Breakfast", veg: "Avocado on half a whole wheat bagel, cream cheese", nonveg: "Smoked salmon on half a whole wheat bagel, cream cheese" },
          { time: "Lunch", veg: "Leftover paneer fajitas, side of black beans", nonveg: "Leftover chicken fajitas, side of black beans" },
          { time: "Dinner", veg: "Soya chunks (6oz), baked sweet potato (small), green beans", nonveg: "Pork chop (6oz), baked sweet potato (small), green beans" },
          { time: "Snacks", veg: "Handful of pistachios, 1 orange", nonveg: "Handful of pistachios, 1 orange" },
        ]
      },
      {
        day: "Saturday", goal: "2,400 kcal", type: "Flexible Dining", color: "var(--accent-blue)",
        meals: [
          { time: "Breakfast", veg: "Banana protein pancakes with fresh strawberries", nonveg: "Protein pancakes with fresh strawberries" },
          { time: "Lunch", veg: "Grilled paneer sandwich (restaurant/takeout), side salad", nonveg: "Grilled chicken sandwich (restaurant/takeout), side salad" },
          { time: "Dinner", veg: "Veggie sushi (2 rolls: e.g., Avocado and Cucumber), edamame", nonveg: "Sushi (2 rolls: e.g., Tuna and Salmon), edamame" },
          { time: "Snacks", veg: "Air-popped popcorn, 1 scoop plant-based protein", nonveg: "Air-popped popcorn, 1 scoop whey protein" },
        ]
      },
      {
        day: "Sunday", goal: "2,000 kcal", type: "Light Rest Day", color: "var(--text-muted)",
        meals: [
          { time: "Breakfast", veg: "Smoothie (kale, half banana, almond milk, plant protein powder)", nonveg: "Smoothie (kale, half banana, almond milk, protein powder)" },
          { time: "Lunch", veg: "Quinoa and black bean salad with lime dressing", nonveg: "Quinoa and black bean salad with lime dressing" },
          { time: "Dinner", veg: "Baked tofu (2 pieces), cauliflower mash, peas", nonveg: "Baked chicken thighs (2), cauliflower mash, peas" },
          { time: "Snacks", veg: "Cottage cheese with blueberries", nonveg: "Cottage cheese with blueberries" },
        ]
      },
    ],
    weight_loss: [
      {
        day: "Monday", goal: "1,600 kcal", type: "Caloric Deficit", color: "#f59e0b",
        meals: [
          { time: "Breakfast", veg: "Spinach and mushroom egg-white omelet (3 whites), black coffee", nonveg: "Spinach and mushroom egg white omelet (3 whites)" },
          { time: "Lunch", veg: "Large mixed greens salad with grilled tofu (120g) & light dressing", nonveg: "Large mixed greens salad with grilled chicken breast (120g) & light dressing" },
          { time: "Dinner", veg: "Baked tofu, steamed asparagus, half portion of quinoa", nonveg: "Baked cod (6oz), steamed asparagus, half portion of quinoa" },
          { time: "Snacks", veg: "Celery sticks with light cottage cheese, green tea", nonveg: "Celery sticks with light cottage cheese, black coffee" },
        ]
      },
      {
        day: "Tuesday", goal: "1,550 kcal", type: "High Protein", color: "#ef4444",
        meals: [
          { time: "Breakfast", veg: "Berry protein smoothie (unsweetened almond milk, plant protein)", nonveg: "Berry protein smoothie (unsweetened almond milk base)" },
          { time: "Lunch", veg: "Chickpea & lettuce cups with cucumber slices, lemon dressing", nonveg: "Turkey slices wrapped in lettuce cups, cucumber slices" },
          { time: "Dinner", veg: "Tofu stir-fry with loads of bok choy and broccoli, no rice", nonveg: "Tofu stir-fry with loads of bok choy and broccoli, no rice" },
          { time: "Snacks", veg: "1 hard-boiled egg, small handful of almonds", nonveg: "1 hard-boiled egg, small handful of almonds" },
        ]
      },
      {
        day: "Wednesday", goal: "1,600 kcal", type: "Volume Eating", color: "#f59e0b",
        meals: [
          { time: "Breakfast", veg: "Oatmeal (1/2 cup) cooked with water and zucchini shreds for volume", nonveg: "Oatmeal (1/2 cup) cooked with water/zucchini shreds for volume" },
          { time: "Lunch", veg: "Massive vegetable soup (low sodium), side of grilled paneer", nonveg: "Massive vegetable soup (low sodium), side of grilled shrimp" },
          { time: "Dinner", veg: "Zucchini noodles with small paneer-stuffed peppers", nonveg: "Zucchini noodles with lean turkey meatballs (4 small)" },
          { time: "Snacks", veg: "Carrot sticks, 1 cup air-popped popcorn, green tea", nonveg: "Carrot sticks, 1 cup of air-popped popcorn, green tea" },
        ]
      },
      {
        day: "Thursday", goal: "1,650 kcal", type: "Deficit (Workout Day)", color: "#ef4444",
        meals: [
          { time: "Breakfast", veg: "2 egg whites + 1 whole egg on thin whole wheat toast", nonveg: "1 Whole egg + 2 egg whites on 1 slice thin whole wheat toast" },
          { time: "Lunch", veg: "Grilled paneer (120g) with half a baked potato, side salad", nonveg: "Chicken breast (120g) with half a baked potato, side salad" },
          { time: "Dinner", veg: "Grilled tofu (5oz), steamed green beans, lemon juice", nonveg: "Grilled salmon (5oz), steamed green beans, lemon juice" },
          { time: "Snacks", veg: "Plant protein shake (water base), half an apple", nonveg: "Protein shake (water base), half an apple" },
        ]
      },
      {
        day: "Friday", goal: "1,500 kcal", type: "Low Carb", color: "#f59e0b",
        meals: [
          { time: "Breakfast", veg: "Greek yogurt (plain, 0%) with chia seeds", nonveg: "Greek yogurt (plain, 0%) with chia seeds" },
          { time: "Lunch", veg: "Hummus & crunchy veggie bowl (cucumber, tomato, bell pepper)", nonveg: "Tuna salad (made with Greek yogurt instead of mayo) over greens" },
          { time: "Dinner", veg: "Roasted cauliflower steak (5oz), large portion of Brussels sprouts", nonveg: "Baked chicken breast (5oz), large portion of roasted Brussels sprouts" },
          { time: "Snacks", veg: "Edamame (half cup), sparkling water", nonveg: "Edamame (half cup), sparkling water" },
        ]
      },
      {
        day: "Saturday", goal: "1,700 kcal", type: "Flexible Deficit", color: "#ef4444",
        meals: [
          { time: "Breakfast", veg: "Oat protein pancakes (made with egg whites), no syrup", nonveg: "Protein pancakes (made with whey and egg whites), no syrup" },
          { time: "Lunch", veg: "Veggie patty sandwich (no mayo, half the bun), side salad", nonveg: "Grilled chicken sandwich (no mayo, half the bun), side salad" },
          { time: "Dinner", veg: "Lentil chili with extra beans and tomatoes", nonveg: "Lean beef chili with extra beans and tomatoes" },
          { time: "Snacks", veg: "Small piece of dark chocolate, cucumber slices", nonveg: "Small piece of dark chocolate, cucumber slices" },
        ]
      },
      {
        day: "Sunday", goal: "1,600 kcal", type: "Prep & Recover", color: "var(--text-muted)",
        meals: [
          { time: "Breakfast", veg: "Smoothie (spinach, strawberries, plant protein powder, water)", nonveg: "Smoothie (spinach, strawberries, protein powder, water)" },
          { time: "Lunch", veg: "Cauliflower rice with spiced chickpeas and salsa", nonveg: "Cauliflower rice with shredded chicken and salsa" },
          { time: "Dinner", veg: "Baked tofu (5oz), steamed broccoli, side of mustard", nonveg: "Pork tenderloin (5oz), steamed broccoli, side of mustard" },
          { time: "Snacks", veg: "Sugar-free Jello, 1 babybel light cheese", nonveg: "Sugar-free Jello, 1 babybel light cheese" },
        ]
      },
    ]
  };

  const currentlyDisplayedDiet = dietPlans[activeCategory];
  const selectedDayData = currentlyDisplayedDiet.find(d => d.day === activeDay);

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '24px' }}>
        <h1 className="welcome-title">Dietary Plans</h1>
        <p className="welcome-subtitle">Select your dietary goal and food preference to see your complete 7-day meal schedule.</p>
      </div>

      {/* Top Controls Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '32px', alignItems: 'center' }}>

        {/* Segmented Goal Selector */}
        <div style={{ display: 'flex', gap: '8px', padding: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              style={{
                padding: '10px 24px', borderRadius: '8px', border: 'none',
                backgroundColor: activeCategory === cat.id ? 'var(--accent-blue)' : 'transparent',
                color: activeCategory === cat.id ? 'white' : 'var(--text-muted)',
                cursor: 'pointer', fontWeight: '600', fontSize: '14px',
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Veg / Non-Veg Toggle */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { id: "veg", label: "🥦 Vegetarian", color: "#10b981" },
            { id: "nonveg", label: "🍗 Non-Veg", color: "#f59e0b" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDietType(opt.id as DietType)}
              style={{
                padding: '10px 20px', borderRadius: '10px', border: `2px solid`,
                borderColor: dietType === opt.id ? opt.color : 'var(--border-color)',
                backgroundColor: dietType === opt.id ? `${opt.color}18` : 'transparent',
                color: dietType === opt.id ? opt.color : 'var(--text-muted)',
                cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master-Detail Split Layout */}
      <div className="main-split" style={{ gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: '24px', alignItems: 'start' }}>

        {/* Master: Left Sidebar (Days of the Week) */}
        <div className="content-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px' }}>
          {currentlyDisplayedDiet.map((dietCard) => (
            <button
              key={dietCard.day}
              onClick={() => setActiveDay(dietCard.day)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px', borderRadius: '8px', border: 'none',
                backgroundColor: activeDay === dietCard.day ? `${dietCard.color}20` : 'transparent',
                color: activeDay === dietCard.day ? dietCard.color : 'var(--text-main)',
                borderLeft: activeDay === dietCard.day ? `3px solid ${dietCard.color}` : '3px solid transparent',
                cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', textAlign: 'left', width: '100%'
              }}
            >
              <span style={{ fontSize: '15px' }}>{dietCard.day}</span>
              {activeDay === dietCard.day && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Detail: Right Pane (Meals) */}
        {selectedDayData && (
          <div
            className="content-card"
            style={{ borderTop: `4px solid ${selectedDayData.color}`, animation: `fadeInUp 0.4s ease-out forwards` }}
            key={selectedDayData.day + activeCategory + dietType}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: selectedDayData.color }}>{selectedDayData.day}&apos;s Protocol</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{selectedDayData.type}</p>
                  <span style={{
                    fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '99px',
                    backgroundColor: dietType === 'veg' ? '#10b98118' : '#f59e0b18',
                    color: dietType === 'veg' ? '#10b981' : '#f59e0b',
                    border: `1px solid ${dietType === 'veg' ? '#10b981' : '#f59e0b'}40`,
                  }}>
                    {dietType === 'veg' ? '🥦 Vegetarian' : '🍗 Non-Veg'}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily Target</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: selectedDayData.color }}>{selectedDayData.goal}</p>
              </div>
            </div>

            {/* Meals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedDayData.meals.map((meal, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex', gap: '16px', padding: '16px',
                    backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px',
                    borderLeft: `3px solid ${selectedDayData.color}`,
                    animation: `fadeInUp 0.3s ease-out forwards`, opacity: 0,
                    animationDelay: `${idx * 0.1}s`, transition: 'transform 0.2s', cursor: 'default'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
                    {getMealIcon(meal.time)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {meal.time}
                    </span>
                    <span style={{ fontSize: '15px', lineHeight: '1.5' }}>
                      {dietType === 'veg' ? meal.veg : meal.nonveg}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DietPlanContent;
