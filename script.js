let pokemonDataBase = [];
let pokeDataDescription = [];

async function loadAllPokemon() {
  for (let i = 1; i <= 20; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let pokemon = await response.json();
    pokemonDataBase.push(pokemon);
    let urlDescription = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
    let responseDescription = await fetch(urlDescription);
    let pokemonDescription = await responseDescription.json();
    pokeDataDescription.push(pokemonDescription);
    renderAllPokemonData();
    }
}

// Load next Pokemon function
async function loadNextPokemon() {
  const loadMoreButton = document.getElementById("load-more-button");
  const animationId = startLoadingAnimation();
  const startIndex = pokemonDataBase.length + 1;
  const endIndex = startIndex + 10;
  for (let i = startIndex; i <= endIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let pokemon = await response.json();
    pokemonDataBase.push(pokemon);
    let urlDescription = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
    let responseDescription = await fetch(urlDescription);
    let pokemonDescription = await responseDescription.json();
    pokeDataDescription.push(pokemonDescription);
  }
  stopLoadingAnimation(animationId);
  renderAllPokemonData();
}

function renderAllPokemonData() {
  let content = document.getElementById("pokedex");
  content.innerHTML = "";
  for (let i = 0; i < pokemonDataBase.length; i++) {
    const pokemon = pokemonDataBase[i];
    let pokeName = pokemon["name"].charAt(0).toUpperCase();
    let modifiedPokeName = pokeName + pokemon["name"].slice(1);
    let pokeId = pokemon["id"];
    let pokeImage = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    content.innerHTML += templateSmallPokeCard(pokeName, modifiedPokeName, pokeId, pokeImage, i, pokemon);
    renderPokemonTypes(pokemon, i);
  }
}

function renderPokemonTypes(pokemon, i) {
  let content = document.getElementById(`pokeTypes${i}`);
  for (let j = 0; j < pokemon["types"].length; j++) {
    const types = pokemon["types"][j]["type"]["name"];
    content.innerHTML += `
        <div class="poketypes">${types}</div>
    `;
  }
}

function openCard(i, modifiedPokeName, pokeImage, pokeId) {
  document.getElementById("pokedex").classList.add("bg-blur");
  document.getElementById("pokedex").classList.add("pointerEventNone");
  document.getElementById("pokedex").classList.remove("pointerEventAuto");
  document.getElementById("pokeContainer").style.display = "flex";
  renderMainPokemonInfo(i, modifiedPokeName, pokeImage, pokeId);
}

function closeCard() {
  document.getElementById("pokedex").classList.remove("bg-blur");
  document.getElementById("pokeContainer").style.display = "none";
  document.getElementById("pokedex").classList.add("pointerEventAuto");
  document.getElementById("pokedex").classList.remove("pointerEventNone");
}

function renderMainPokemonInfo(i, modifiedPokeName, pokeImage, pokeId, pokemon) {
  let typesHTML = "";
  for (let j = 0; j < pokemonDataBase[i]["types"].length; j++) {
    let types = pokemonDataBase[i]["types"][j]["type"]["name"];
    let typescolor = pokemonDataBase[i]["types"][0]["type"]["name"];
    typesHTML += /*html*/`<div class="poketypes">${types}</div>`;
    document.getElementById("pokeContainer").innerHTML = templatePokeContainer(i, modifiedPokeName, pokeImage, pokeId, types, typescolor, typesHTML);
    showAbout(i);
    hideLeftArrow();
  }
}

function showAbout(i) {
  let pokeDescription = pokeDataDescription[i]["flavor_text_entries"][1]["flavor_text"];
  let pokeHeight = pokemonDataBase[i]["height"] * 10;
  let pokeWeight = pokemonDataBase[i]["weight"] / 10;
  document.getElementById("pokeInnerInfo").innerHTML = `<div class="pokeInnerInfo"><b>${pokeDescription}</b></div>
  <div class="pokeBodyStats">
    <div><b>Height: ${pokeHeight}cm</b></div>
    <div><b>Weight: ${pokeWeight}kg</b></div>
  </div>`;
}

function showBaseStats(i) {
  let hp = pokemonDataBase[i]["stats"][0]["base_stat"];
  let attack = pokemonDataBase[i]["stats"][1]["base_stat"];
  let defense = pokemonDataBase[i]["stats"][2]["base_stat"];
  let specialAttack = pokemonDataBase[i]["stats"][3]["base_stat"];
  let specialDefense = pokemonDataBase[i]["stats"][4]["base_stat"];
  let speed = pokemonDataBase[i]["stats"][5]["base_stat"];
  document.getElementById("pokeInnerInfo").innerHTML = templatePokeStats(hp, attack, defense, specialAttack, specialDefense, speed, i);
}

function showAbilities(i) {
  let pokeAbilitities1 = pokemonDataBase[i]["abilities"][0]["ability"]["name"].toUpperCase();
  let pokeAbilitities2 = pokemonDataBase[i]["abilities"][1]["ability"]["name"].toUpperCase();
  document.getElementById("pokeInnerInfo").innerHTML = `<div class="">
  <ul>
    <li class="lineAbilitie"><b>${pokeAbilitities1}</b></li>
    <li class="lineAbilitie"><b>${pokeAbilitities2}</b></li>
  </ul></div>`;
}

function nextPokeCard(i) {
  if (i <= pokemonDataBase.length) {
    i++;
  }
  let pokemon = pokemonDataBase[i];
  let pokeName = pokemon["name"].charAt(0).toUpperCase() + pokemon["name"].slice(1);
  let pokeId = pokemon["id"];
  let pokeImage = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  renderMainPokemonInfo(i, pokeName, pokeImage, pokeId);
}

function prevPokeCard(i) {
  if (i >= 1) {
    i--;
  }
  let pokemon = pokemonDataBase[i];
  let pokeId = pokemon["id"];
  let pokeName = pokemon["name"].charAt(0).toUpperCase() + pokemon["name"].slice(1);
  let pokeImage = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  renderMainPokemonInfo(i, pokeName, pokeImage, pokeId);
}

function filterPokemon() {
  let search = document.getElementById("search").value;
  search = search.toLowerCase();
  let pokelist = document.getElementById("pokedex");
  pokelist.innerHTML = "";
  for (let i = 0; i < pokemonDataBase.length; i++) {
    let name = pokemonDataBase[i]["name"];
    if (name.toLocaleLowerCase().includes(search)) {
      let pokemon = pokemonDataBase[i];
      let pokeName = pokemon["name"].charAt(0).toUpperCase();
      let modifiedPokeName = pokeName + pokemon["name"].slice(1);
      let pokeId = pokemon["id"];
      let pokeImage = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
      pokelist.innerHTML += templateSmallPokeCard(pokeName, modifiedPokeName, pokeId, pokeImage, i, pokemon);
      renderPokemonTypes(pokemon, i);
    }
  }
}

function renderFilteredPokemon(filteredPokemon) {
  let content = document.getElementById("pokedex");
  content.innerHTML = "";
  for (let i = 0; i < filteredPokemon.length; i++) {
    let pokemon = filteredPokemon[i];
    let pokeName = pokemon["name"].charAt(0).toUpperCase();
    let modifiedPokeName = pokeName + pokemon["name"].slice(1);
    let pokeId = pokemon["id"];
    let pokeImage = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    content.innerHTML += templateSmallPokeCard(pokeName, modifiedPokeName, pokeId, pokeImage, i, pokemon);
    renderPokemonTypes(pokemon, i);
    
  }
}

function hideLeftArrow() {
  if (document.getElementById("bigPokeCard0") === null) {
    document.getElementById("leftArrow").style.display = "flex";
  } else {
    document.getElementById("leftArrow").style.display = "none";
  }
}

// Start loading animation function
function startLoadingAnimation() {
  const pokeballImg = document.getElementById("loadPokeball");
  let rotation = 0;
  const animate = () => {
    rotation += 10;
    pokeballImg.style.transform = `rotate(${rotation}deg)`;
  };
  const animationId = setInterval(animate, 50);
  return animationId;
}

// Stop loading animation function
function stopLoadingAnimation(animationId) {
  clearInterval(animationId);
  const pokeballImg = document.getElementById("loadPokeball");
  pokeballImg.style.transform = "none";
}
