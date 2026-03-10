const drinks = ["Coca-Cola", "Pepsi", "Sunkist", "Water", "Starbies"];
const snacks = ["Chips and Dip", "Oreos", "Popcorn", "Sour Patch Kids", "Applesauce"];
const others = ["Play video games 🎮", "Watch a movie 🎬", "Read a book 📚", "Go for a walk 🚶", "Listen to music 🎵", "Homework :("];

function pickFavorites() {
  const drinkPick = drinks[Math.floor(Math.random() * drinks.length)];
  const snackPick = snacks[Math.floor(Math.random() * snacks.length)];
  const otherPick = others[Math.floor(Math.random() * others.length)];

  document.getElementById("drink").textContent = drinkPick;
  document.getElementById("snack").textContent = snackPick;
  document.getElementById("hobby").textContent = otherPick;
}

const drinks2 = ["Shirley Temple", "Mountain Dew", "Propel", "Water", "Starbies"];
const snacks2 = ["Chips", "Oreos", "Popcorn", "Reeses", "Applesauce"];
const others2 = ["Play video games 🎮", "Watch a movie 🎬", "Read a book 📚", "Go for a walk 🚶", "Listen to music 🎵", "Homework :("];

function pickFavoritesMandy() {
  const drinkPick = drinks2[Math.floor(Math.random() * drinks2.length)];
  const snackPick = snacks2[Math.floor(Math.random() * snacks2.length)];
  const otherPick = others2[Math.floor(Math.random() * others2.length)];

  document.getElementById("drink").textContent = drinkPick;
  document.getElementById("snack").textContent = snackPick;
  document.getElementById("hobby").textContent = otherPick;
}