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
  const tPokemons = trainer.pokemons.map(pokemon => `<li data-id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button data-id=${pokemon.id} class=release>release</button><li>`).join('')
  divEl.className = 'card'
  divEl.dataset.id = trainer.id
  divEl.innerHTML = `
  <h1>${trainer.name}</h1>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>`
  ulEl.innerHTML = tPokemons
  mainEl.append(divEl)
  divEl.append(ulEl)
  ulEl.addEventListener('click', pokemonRelease)
}

function renderTrainers(){
  state.trainers.forEach(trainer => renderTrainer(trainer))
}


const pokemonRelease = event => {
  const pokeId = event.target.dataset.id
  const flatPoke = state.trainers.map(trainers => trainers.pokemons).flat()
  const pokemon = flatPoke.find(pokemon => pokemon.id == pokeId)
  deletePokemonDB(pokemon.id)
}

  function deletePokemonDB(id){
    return fetch(`http://localhost:3000/pokemons/${id}`, {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }).then(() => {
      mainEl.innerHTML = ""
      getTrainers()
    })
  }



getTrainers()
// Fetch the trainers from the backend to populate state
// Render all the trainers
//    - Pass each trainer to a single trainer render function
//    - Create the pokemon list items, and add event listener to the release button
