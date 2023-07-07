/**
 *  Function for fetch data from API GitHub
 *  @param {string} repoName - name of search repository
 *  @returns {Promise}
 */
async function fetchGitRepos(repoName) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error fetch data or data empty!');
        }

    } catch (e) {
        throw new Error(e.message);
    }
}

/**
 * Function for autocomplete user input
 * @param {Function} fetchFunction - function fetch data
 * @param {number} delay - timeout in ms for execute request
 * @returns {Function}
 */
function autocompleteInput(fetchFunction, delay) {
    let timeout;
    return async function(...args) {
        return new Promise((resolve, reject) => {
            clearTimeout(timeout);
            try {
                timeout = setTimeout( async () => {
                    const result = await fetchFunction.apply(this, args);
                    resolve(result.items);
                } , delay);
            } catch (e) {
                reject(e.message);
            }
        })
    }
}

/**
 * Function show autocomplete for user below search form
 * @param {Element} searchForm - DOM element, parent for li item
 * @param {Array} items - array objects
 * @returns {Array} - array showing objects
 */
function showAutoComplete(searchForm, items) {
    const oldResults = searchForm.querySelectorAll('.autocomplete__list__item');
    let showingRepo = new Array();

    oldResults.forEach(oldResult => {
        oldResult.remove();
    });

    if(searchForm.classList.contains('hidden')) {
        searchForm.classList.remove('hidden')
    }

    if (items.length === 0) {
        let li = document.createElement('li');
        li.classList.add('autocomplete__list__item');
        li.textContent = 'Sorry, nothing found..';
        searchForm.appendChild(li);
        return showingRepo;
    }


    for (let i = 0; i < items.length && i < 5; i++) {
        let curRepo = items[i];
        let li = document.createElement('li');
        li.classList.add('autocomplete__list__item');
        li.textContent = curRepo.name;
        li.data = curRepo;
        searchForm.appendChild(li);
        showingRepo.push(curRepo);
    }

    return showingRepo;
}

/**
 * Function for create card and add append on page
 * @param {Object} repo - entity of repository
 */
function createCardRepo(repo) {

    const currentRepo = {Name: repo.name, Owner: repo.owner.login, Stars: repo.stargazers_count};
    let cardRepo = document.createElement('li');
    cardRepo.classList.add('repository__list__item');

    let leftContainer = document.createElement('div');
    leftContainer.classList.add('repository__list__item-info-left');

    let deleteRepoBtn = document.createElement('button');
    deleteRepoBtn.classList.add('repository__list__delete-btn');
    deleteRepoBtn.textContent = 'Delete';
    deleteRepoBtn.addEventListener('click', function(e) {removeCard(e.target)});

    for (let prop in currentRepo) {
        let propEl = document.createElement('p');
        propEl.textContent = `${prop}:  ${currentRepo[prop]}`;
        leftContainer.appendChild(propEl);
    }

    cardRepo.appendChild(leftContainer);
    cardRepo.appendChild(deleteRepoBtn);

    repoList.appendChild(cardRepo);

}

/**
 * Function for remove card and view info message, if there are no cards
 * @param {event.target} target - DOM element of card
 */
function removeCard(target) {
    target.parentElement.remove();
    if (repoItems.length == 0) {
        infoMessage.classList.remove('hidden');
    }
}
