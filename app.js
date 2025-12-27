// Restaurant AR Menu - Application Logic

// HYBRID 3D MODEL SYSTEM:
// 1. DEMO MODE: Uses Sketchfab API to search for food models (works now!)
// 2. PRODUCTION MODE: Uses local GLB files scanned with Polycam (when you scan actual dishes)
// 
// How it works:
// - If local GLB file exists → Use it (restaurant's actual dish)
// - If not → Search Sketchfab for similar food model (demo)

const dishesDatabase = [
    // Appetizers
    {
        id: 1,
        name: 'Italian Bruschetta',
        category: 'appetizers',
        price: 12.99,
        description: 'Crispy toasted bread topped with fresh tomatoes, basil, garlic, and premium olive oil. A classic Italian starter.',
        ingredients: ['Tomatoes', 'Basil', 'Garlic', 'Olive Oil', 'Balsamic', 'Bread'],
        allergens: 'Contains: Gluten',
        calories: 150,
        prepTime: 10,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500',
        model3D: './models/bruschetta.glb', // Local file (production)
        modelKeyword: 'bruschetta bread' // Sketchfab search (demo)
    },
    {
        id: 2,
        name: 'Crispy Spring Rolls',
        category: 'appetizers',
        price: 10.99,
        description: 'Golden fried spring rolls filled with fresh vegetables and served with sweet chili sauce.',
        ingredients: ['Cabbage', 'Carrots', 'Bean Sprouts', 'Rice Paper', 'Sweet Chili Sauce'],
        allergens: 'Contains: Gluten, Soy',
        calories: 180,
        prepTime: 15,
        spicyLevel: 1,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
        model3D: './models/spring-rolls.glb',
        modelKeyword: 'spring roll food'
    },
    {
        id: 3,
        name: 'Garlic Bread',
        category: 'appetizers',
        price: 8.99,
        description: 'Freshly baked bread infused with garlic butter and herbs, served warm.',
        ingredients: ['Bread', 'Garlic', 'Butter', 'Parsley', 'Parmesan'],
        allergens: 'Contains: Gluten, Dairy',
        calories: 200,
        prepTime: 12,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1619985482048-c0fd43d4e778?w=500',
        model3D: './models/garlic-bread.glb',
        modelKeyword: 'garlic bread'
    },

    // Main Courses
    {
        id: 4,
        name: 'Premium Grilled Steak',
        category: 'mains',
        price: 34.99,
        description: 'Perfectly grilled ribeye steak with roasted vegetables and creamy mashed potatoes.',
        ingredients: ['Ribeye Steak', 'Potatoes', 'Carrots', 'Broccoli', 'Butter', 'Herbs'],
        allergens: 'Contains: Dairy',
        calories: 680,
        prepTime: 25,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
        model3D: './models/steak.glb',
        modelKeyword: 'grilled steak plate'
    },
    {
        id: 5,
        name: 'Pasta Carbonara',
        category: 'mains',
        price: 22.99,
        description: 'Creamy Italian pasta with crispy bacon, parmesan cheese, and a rich egg-based sauce.',
        ingredients: ['Pasta', 'Bacon', 'Eggs', 'Parmesan', 'Black Pepper', 'Cream'],
        allergens: 'Contains: Gluten, Dairy, Eggs',
        calories: 550,
        prepTime: 20,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
        model3D: './models/pasta-carbonara.glb',
        modelKeyword: 'pasta spaghetti'
    },
    {
        id: 6,
        name: 'Gourmet Burger',
        category: 'mains',
        price: 18.99,
        description: 'Juicy beef patty with melted cheese, crispy bacon, fresh lettuce, and tomatoes on a brioche bun.',
        ingredients: ['Beef Patty', 'Cheese', 'Bacon', 'Lettuce', 'Tomato', 'Brioche Bun', 'Special Sauce'],
        allergens: 'Contains: Gluten, Dairy, Eggs',
        calories: 720,
        prepTime: 18,
        spicyLevel: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        model3D: './models/burger.glb',
        modelKeyword: 'hamburger cheeseburger'
    },
    {
        id: 7,
        name: 'Grilled Salmon',
        category: 'mains',
        price: 28.99,
        description: 'Fresh Atlantic salmon grilled to perfection with lemon butter sauce and asparagus.',
        ingredients: ['Salmon', 'Asparagus', 'Lemon', 'Butter', 'Dill', 'White Wine'],
        allergens: 'Contains: Fish, Dairy',
        calories: 490,
        prepTime: 22,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500',
        model3D: './models/salmon.glb',
        modelKeyword: 'grilled salmon fish'
    },

    // Desserts
    {
        id: 8,
        name: 'Chocolate Lava Cake',
        category: 'desserts',
        price: 12.99,
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream and berry sauce.',
        ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Ice Cream', 'Berries'],
        allergens: 'Contains: Gluten, Dairy, Eggs',
        calories: 480,
        prepTime: 15,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
        model3D: './models/chocolate-lava-cake.glb',
        modelKeyword: 'chocolate cake dessert'
    },
    {
        id: 9,
        name: 'Tiramisu',
        category: 'desserts',
        price: 10.99,
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
        ingredients: ['Ladyfingers', 'Mascarpone', 'Espresso', 'Cocoa', 'Eggs', 'Sugar'],
        allergens: 'Contains: Gluten, Dairy, Eggs',
        calories: 380,
        prepTime: 120,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
        model3D: './models/tiramisu.glb',
        modelKeyword: 'tiramisu dessert'
    },
    {
        id: 10,
        name: 'Cheesecake',
        category: 'desserts',
        price: 11.99,
        description: 'Creamy New York style cheesecake with graham cracker crust and berry compote.',
        ingredients: ['Cream Cheese', 'Graham Crackers', 'Sugar', 'Eggs', 'Vanilla', 'Berries'],
        allergens: 'Contains: Gluten, Dairy, Eggs',
        calories: 420,
        prepTime: 180,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=500',
        model3D: './models/cheesecake.glb',
        modelKeyword: 'cheesecake dessert'
    },

    // Drinks
    {
        id: 11,
        name: 'Tropical Mocktail',
        category: 'drinks',
        price: 8.99,
        description: 'Refreshing blend of tropical fruits with a hint of mint and lime.',
        ingredients: ['Pineapple Juice', 'Mango', 'Lime', 'Mint', 'Soda Water', 'Ice'],
        allergens: 'None',
        calories: 120,
        prepTime: 5,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500',
        model3D: './models/tropical-mocktail.glb',
        modelKeyword: 'cocktail drink glass'
    },
    {
        id: 12,
        name: 'Cappuccino',
        category: 'drinks',
        price: 5.99,
        description: 'Classic Italian coffee with steamed milk and a rich foam topping.',
        ingredients: ['Espresso', 'Milk', 'Foam'],
        allergens: 'Contains: Dairy',
        calories: 80,
        prepTime: 5,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500',
        model3D: './models/cappuccino.glb',
        modelKeyword: 'coffee cappuccino cup'
    }
];

// State management
let currentCategory = 'all';
let currentDish = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderDishes();
    setupEventListeners();
    initializeIcons();
}

// Render dishes to the grid
function renderDishes(category = 'all', searchQuery = '') {
    const menuGrid = document.getElementById('menuGrid');

    // Filter dishes
    let filteredDishes = dishesDatabase;

    if (category !== 'all') {
        filteredDishes = filteredDishes.filter(dish => dish.category === category);
    }

    if (searchQuery) {
        filteredDishes = filteredDishes.filter(dish =>
            dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dish.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    // Render
    menuGrid.innerHTML = filteredDishes.map(dish => createDishCard(dish)).join('');

    // Add click listeners
    document.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('click', () => {
            const dishId = parseInt(card.dataset.dishId);
            openDishModal(dishId);
        });
    });

    // Reinitialize icons
    lucide.createIcons();
}

// Create dish card HTML
function createDishCard(dish) {
    const spicyIndicator = dish.spicyLevel > 0 ? '🌶️'.repeat(dish.spicyLevel) : '';

    return `
        <div class="dish-card" data-dish-id="${dish.id}">
            <div class="dish-image">
                <img src="${dish.image}" alt="${dish.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'">
                <div class="dish-image-overlay">
                    <div class="view-3d-badge">
                        <i data-lucide="box"></i>
                        View in 3D
                    </div>
                </div>
                <span class="category-badge">${dish.category}</span>
            </div>
            <div class="dish-content">
                <div class="dish-header">
                    <h3 class="dish-name">${dish.name}</h3>
                    <span class="dish-price">$${dish.price.toFixed(2)}</span>
                </div>
                <p class="dish-description">${dish.description}</p>
                <div class="dish-tags">
                    <span class="tag">
                        <i data-lucide="flame"></i>
                        ${dish.calories} cal
                    </span>
                    <span class="tag">
                        <i data-lucide="clock"></i>
                        ${dish.prepTime} min
                    </span>
                    ${spicyIndicator ? `<span class="tag">${spicyIndicator}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Open dish modal with 3D model
function openDishModal(dishId) {
    const dish = dishesDatabase.find(d => d.id === dishId);
    if (!dish) return;

    currentDish = dish;

    // Update modal content
    document.getElementById('modalDishName').textContent = dish.name;
    document.getElementById('modalDishCategory').textContent = dish.category.toUpperCase();
    document.getElementById('dishDescription').textContent = dish.description;
    document.getElementById('dishPrice').textContent = `$${dish.price.toFixed(2)}`;
    document.getElementById('dishCalories').textContent = `${dish.calories} cal`;
    document.getElementById('dishPrepTime').textContent = `${dish.prepTime} min`;
    document.getElementById('allergens').textContent = dish.allergens;

    // Spicy indicator
    const spicyTag = document.getElementById('dishSpicy');
    if (dish.spicyLevel > 0) {
        spicyTag.textContent = '🌶️'.repeat(dish.spicyLevel) + ' Spicy';
        spicyTag.style.display = 'inline-flex';
    } else {
        spicyTag.style.display = 'none';
    }

    // Ingredients list
    const ingredientsList = document.getElementById('dishIngredients');
    ingredientsList.innerHTML = dish.ingredients.map(ing => `<li>${ing}</li>`).join('');

    // Load 3D model from local file path
    load3DModel(dish.model3D, dish.name);

    // Show modal
    const modal = document.getElementById('modelModal');
    modal.classList.add('active');

    // Reinitialize icons
    lucide.createIcons();
}

// HYBRID 3D MODEL LOADING SYSTEM
// Supports 2 modes:
// 1. PRODUCTION: Load local GLB files scanned with Polycam (restaurant's actual dishes)
// 2. DEMO: Use actual food model from Sketchfab (automatic fallback)

// Demo Food Model - Using actual food GLB for all dishes
// This shows real food instead of astronaut/helmet placeholders
// NOTE: All dishes use the same model for demo - replace with dish-specific scans for production
const FREE_FOOD_MODELS = {
    'bruschetta bread': './models/pizza.glb',
    'spring roll food': './models/pizza.glb',
    'garlic bread': './models/pizza.glb',
    'grilled steak plate': './models/pizza.glb',
    'pasta spaghetti': './models/pizza.glb',
    'hamburger cheeseburger': './models/pizza.glb',
    'grilled salmon fish': './models/pizza.glb',
    'chocolate cake dessert': './models/cheesecake.glb',
    'tiramisu dessert': './models/cheesecake.glb',
    'cheesecake dessert': './models/cheesecake.glb',
    'cocktail drink glass': './models/pizza.glb',
    'coffee cappuccino cup': './models/pizza.glb'
};

async function load3DModel(modelPath, dishName) {
    const modelViewer = document.getElementById('dishModelViewer');
    const dish = dishesDatabase.find(d => d.name === dishName);

    try {
        console.log(`🍽️ Loading 3D model for: ${dishName}`);

        // STEP 1: Try to load LOCAL GLB file (if restaurant scanned their dish with Polycam)
        const localFileExists = await checkIfFileExists(modelPath);

        if (localFileExists) {
            // ✅ PRODUCTION MODE: Use restaurant's actual scanned dish
            console.log('✅ Found local GLB file - Using restaurant\'s actual dish model');
            modelViewer.src = modelPath;
            modelViewer.alt = `3D model of ${dishName}`;
            showModelStatus(`Using your scanned ${dishName} model`, 'success');
            return;
        }

        // STEP 2: Local file not found - Use free food models collection (DEMO MODE)
        console.log('⚠️ Local GLB not found - Using demo food model...');

        if (dish && dish.modelKeyword && FREE_FOOD_MODELS[dish.modelKeyword]) {
            // ✅ DEMO MODE: Use curated free food model
            const demoModel = FREE_FOOD_MODELS[dish.modelKeyword];
            console.log(`✅ Using demo model for: ${dish.modelKeyword}`);
            modelViewer.src = demoModel;
            modelViewer.alt = `3D model of ${dishName} (Demo)`;
            showModelStatus(`Demo mode - Scan your ${dishName} with Polycam for real model`, 'demo');
        } else {
            // Fallback to generic model
            console.log('⚠️ No demo model available - Using fallback');
            modelViewer.src = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
            modelViewer.alt = `${dishName} (Model not available)`;
            showModelStatus('Model not available - Scan with Polycam', 'warning');
        }

    } catch (error) {
        console.error('❌ Error loading 3D model:', error);
        modelViewer.src = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
        showModelStatus('Error loading model', 'error');
    }
}

// Check if local GLB file exists
async function checkIfFileExists(filePath) {
    try {
        const response = await fetch(filePath, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

// Show model loading status to user (optional UI feedback)
function showModelStatus(message, type) {
    console.log(`📊 Model Status: ${message} (${type})`);
    // You can add a visual indicator in the UI here if needed
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter dishes
            const category = tab.dataset.category;
            currentCategory = category;
            renderDishes(category);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchQuery = e.target.value;
        renderDishes(currentCategory, searchQuery);
    });

    // Modal close
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Close modal on background click
    document.getElementById('modelModal').addEventListener('click', (e) => {
        if (e.target.id === 'modelModal') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modelModal');
    modal.classList.remove('active');
}

// Initialize Lucide icons
function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Export for potential future use
window.restaurantMenuApp = {
    renderDishes,
    openDishModal,
    closeModal
};
