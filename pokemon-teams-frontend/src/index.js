const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainEl = document.querySelector('main')
const divEl = document.createElement('div')
const bodyEl = document.querySelector('body')

function getTrainers(){
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
      .then(trainers => state.trainers = trainers)
        .then(() => renderTrainers())
}

const state = {
  trainers: []
}


function renderTrainer(trainer){
  const divEl = document.createElement('div')
  ulEl = document.createElement('ul')
  const tPokemons = trainer.pokemons.map(pokemon => `<li data-id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button data-id=${pokemon.id} class="release">release</button><li>`).join('')
  divEl.className = 'card'
  divEl.dataset.id = trainer.id
  divEl.innerHTML = `
  <h1>${trainer.name}</h1>
  <button data-id="${trainer.id}" class="delete">Add Pokemon</button>`
  ulEl.innerHTML = tPokemons
  mainEl.append(divEl)
  divEl.append(ulEl)
  ulEl.addEventListener('click', pokemonRelease)
  divEl.addEventListener('click', addPokemon)
}

function renderTrainers(){
  mainEl.innerHTML = ""
  state.trainers.forEach(trainer => renderTrainer(trainer))
}


const pokemonRelease = event => {
  if (event.target.classList.contains("release")){
  const pokeId = event.target.dataset.id
  const flatPoke = state.trainers.map(trainers => trainers.pokemons).flat()
  const pokemon = flatPoke.find(pokemon => pokemon.id == pokeId)
  deletePokemonDB(pokemon.id)
  }
}

const addPokemon = event => {
  if (event.target.classList.contains("delete")){
    id = event.target.dataset.id
    trainer = state.trainers.find(trainer => trainer.id == id)
    addAPokemon(trainer)
    
  }
}

  function deletePokemonDB(id){
    return fetch(`http://localhost:3000/pokemons/${id}`, {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }).then(() => getTrainers())
  }

  const addAPokemon = trainer => {
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({trainer_id: `${trainer.id}`})
    }).then(() => getTrainers())
  }


getTrainers()

