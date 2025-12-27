# 🔧 Quick Fix Guide

## Issue Found ⚠️

You added these files:
- `cheese.glb`
- `day_95_-_1_scan_a_day_-_pizza_again.glb`

But app.js expects different names!

## ✅ Solution - Two Options:

### Option 1: Rename Files (Easiest)

```powershell
# Open PowerShell in models folder and run:

# Rename cheese to cheesecake
Rename-Item "cheese.glb" -NewName "cheesecake.glb"

# Rename pizza (if you want to use it for a dish)
# First, let's add a pizza dish to the menu!
```

### Option 2: Add Pizza Dish to Menu

Since you have a great pizza model, let's add it!

Open `app.js` and add this dish after Cappuccino (around line 180):

```javascript
    },
    {
        id: 13,
        name: 'Margherita Pizza',
        category: 'mains',
        price: 16.99,
        description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil.',
        ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
        allergens: 'Contains: Gluten, Dairy',
        calories: 550,
        prepTime: 20,
        spicyLevel: 0,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        model3D: './models/pizza.glb',
        modelKeyword: 'pizza'
    }
```

Then rename your file:
```powershell
Rename-Item "day_95_-_1_scan_a_day_-_pizza_again.glb" -NewName "pizza.glb"
```

## 🚀 Quick Commands:

Run these in PowerShell (in models folder):

```powershell
# Navigate to models folder
cd "c:\Users\ar525\Desktop\Resturant project\models"

# Rename cheese
Rename-Item "cheese.glb" -NewName "cheesecake.glb"

# Rename pizza
Rename-Item "day_95_-_1_scan_a_day_-_pizza_again.glb" -NewName "pizza.glb"
```

## ⚠️ File:// Protocol Issue

Also, because you're opening the HTML file directly (`file://`), the browser blocks local file checks for security.

### Solution: Use Live Server

1. **Install** Live Server extension in VS Code
2. **Right-click** on `index.html`
3. **Select** "Open with Live Server"
4. **URL** will be `http://127.0.0.1:5500/index.html`

Now local files will load properly!

## 📋 Summary:

✅ **Step 1**: Rename files
✅ **Step 2**: Add pizza dish to app.js (optional)
✅ **Step 3**: Use Live Server instead of file://
✅ **Step 4**: Refresh browser and test!

After this, console should show:
```
✅ Found local GLB file - Using restaurant's actual dish model
```
