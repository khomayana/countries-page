const URL = 'https://restcountries.com/v3.1/';
const countriesContainer = document.querySelector('.countries-wrapper')
const countryTemplate = document.querySelector('template');
const select = document.querySelector('[data-selected-value]');
const searchBox = document.querySelector('[data-search-box]');
let dataArray = [];
let filterData = [];
let searchData = [];

async function getCountriesData() {
    const request = await fetch(`${URL}all`);
    const result = await request.json();
    dataArray = result;
    render(result);
}

searchBox.addEventListener('input', (e => {
    getSearchValue(e.target.value)
}));

const getSearchValue = debounce(value => {
    searchCountry(value.toLowerCase());
})

function debounce(cb, delay = 1000) {
    let timeout
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}

function filterRegion(value) {
    if (searchData.length !== 0) {
        filterData = searchData.filter(item => item.region == value ||
            item.region.includes(value));
    }
    else {
        filterData = dataArray.filter(item => item.region == value ||
            item.region.includes(value));
    }
    render(filterData);
    return filterData;
}

function searchCountry(value) {
    if (filterData.length !== 0) {
        filterData = filterData.filter(item => ((item.name.common).toLowerCase()).includes(value) ||
            ((item.name.official).toLowerCase()).includes(value));
        render(filterData);
    }
    else {
        searchData = dataArray.filter(item => ((item.name.common).toLowerCase()).includes(value) ||
            ((item.name.official).toLowerCase()).includes(value));
        render(searchData);
        return searchData;
    }
}

function render(countries) {
    clearElement(countriesContainer);
    const itemsToRender = countries.slice(0, 20);
    itemsToRender.forEach(({ name, flags, capital, continents, population }) => {
        countryElem = document.importNode(countryTemplate.content, true);
        const countryName = countryElem.querySelector('h3');
        countryName.textContent = name.common;
        const photoFlag = countryElem.querySelector('img');
        photoFlag.src = flags.svg;
        photoFlag.alt = flags.alt;
        const capitalLabel = countryElem.querySelector('.capital-label');
        capitalLabel.textContent = capital;
        const regionLabel = countryElem.querySelector('.region-label');
        regionLabel.textContent = continents;
        const populationNumber = countryElem.querySelector('.population-count');
        populationNumber.textContent = population;
        countriesContainer.appendChild(countryElem);
    });
}

function clearElement(element) {
    element.innerHTML = '';
}

getCountriesData();