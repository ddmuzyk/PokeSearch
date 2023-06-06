# PokeSearch

Inspired by Google Search website that allows users to find information about characters from the famous Pokemon series. By integrating the site with localStorage, users can add those characters to favorites which are saved locally in their browsers.

<img src="./src/img/pokesearch.png">

[Live](https://pokesearch-pgoy.onrender.com/)

## Project status (June 2023)

While the most important functionalities of the website work, it still would benefit from minor code optimizations.


## Installation
You will need [Node.js](https://nodejs.org/en) installed to run this app locally.

In your directory, run:
```
git clone https://github.com/ddmuzyk/PokeSearch.git
```

Install dependencies and start the server:

```
cd PokeSearch
npm install
npm run dev
```

## Technologies

* React.js
* CSS

## How it works?

The website makes use of public and free to use [PokéAPI](https://pokeapi.co/). Through async fetch calls, the data is translated from JSON format and dynamically displayed on the page.

One of the core functionalities is the ability to search the characters by their name. The main page contains a custom searchbar (which looks similar to the one that Google Search provides) and the search results are displayed below the user input.

Thanks to localStorage, users are able to save the pokemons to favorites locally in their browsers. Saved pokemons are displayed in the favorites tab, each character in a separate card containing two buttons - one which loads more information, and the other one that removes the character from favorites.