function templatePokeContainer(i, modifiedPokeName, pokeImage, pokeId, types, typescolor, typesHTML){
return /*html*/`
<div class="bigPokeCard ${typescolor}" id="bigPokeCard${i}">
<img class="closeButton" src="./img/icons8-pokeball-2-48.png" onclick="closeCard()">
<img class="leftArrow" id="leftArrow" src="./img/pfeil3.png" onclick="prevPokeCard(${i})">
<img class="rightArrow" id="rightArrow" src="./img/pfeil2.png" onclick="nextPokeCard(${i})">
<div class= "containerPokeInfo">
      <div class="leftPokeInfo">
        <h2>${modifiedPokeName}</h2>
        <b class="containerType">${typesHTML}</b>
      </div>
      <div class="rightPokeInfo">
        <b>#${pokeId}</b> 
      </div>
    </div>
    <div class="pokeImageContainer"><img class="pokeImage" src="${pokeImage}">
    </div>
  <div class="containerlowerPokeInfo" id="containerlowerPokeInfo">
    <nav>
      <ul class="pokeNavInfo">
        <li><a onclick="showAbout(${i})">About</a></li>
        <li><a onclick="showBaseStats(${i})">Base Stats</a></li>
        <li><a onclick="showAbilities(${i})">Abilities</a></li>
      </ul>
    </nav>
    <div class="pokeInnerInfo" id="pokeInnerInfo"></div>
  </div>
</div>`;
}


function templateSmallPokeCard(pokeName, modifiedPokeName, pokeId, pokeImage, i, pokemon){
    return /*html*/`
    <div class= "pokeCard ${pokemon["types"][0]["type"]["name"]}" id="pokeCard${i}" onclick="openCard(${i}, '${modifiedPokeName}' , '${pokeImage}' , '${pokeId}' )"> 
        <div>
            <h2>${modifiedPokeName}</h2>
            <div><b id="pokeTypes${i}"></b></div>
        </div>
        <div class="pokeImage" >
            <img src="${pokeImage}">
        </div>
      </div>`;
}

function templatePokeStats(hp, attack, defense, specialAttack, specialDefense, speed, i){
    return /*html*/`
    <div class="bs">
        <span style="width:30%"><b>HP</b></span>
        <div class="graph">
            <div class="bg1 bg" style="width: ${hp}%"><b>${hp}</b></div> 
        </div>
    </div>
    <div class="bs">
        <span style="width:30%"><b>Attack</b></span>
        <div class="graph">
            <div class="bg2 bg" style="width: ${attack}%"><b>${attack}</b></div> 
        </div>
    </div>
    <div class="bs">
        <span style="width:30%"><b>Defense</b></span>
        <div class="graph">
            <div class="bg3 bg" style="width: ${defense}%"><b>${defense}</b></div> 
        </div>
    </div>
    <div class="bs">
        <span style="width:30%"><b>Special Attack</b></span>
        <div class="graph">
            <div class="bg4 bg" style="width: ${specialAttack}%"><b>${specialAttack}</b></div> 
        </div>
    </div>
    <div class="bs">
        <span style="width:30%"><b>Special Defense</b></span>
        <div class="graph">
            <div class="bg5 bg" style="width: ${specialDefense}%"><b>${specialDefense}</b></div> 
        </div>
    </div>
    <div class="bs">
        <span style="width:30%"><b>Speed</b></span>
        <div class="graph">
            <div class="bg6 bg" style="width: ${speed}%"><b>${speed}</b></div> 
        </div>
    </div>
  </div>    
  `;
}

