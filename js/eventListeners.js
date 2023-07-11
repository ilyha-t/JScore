const repoInput = document.querySelector('input');
const repoList = document.querySelector('.repository__list');
let repoItems = repoList.children;
const infoMessage = document.querySelector('.repository__info-message');
const showAutocompleteArea = document.querySelector('.autocomplete__list');
let getRepos = autocompleteInput(fetchGitRepos, 500);


repoInput.addEventListener('input', function (e) {
    if(e.target.value.trim()) {
        getRepos(e.target.value)
            .then(response => {
                let repos = showAutoComplete(showAutocompleteArea, response);
                let autocompleteItems = document.querySelectorAll('.autocomplete__list__item');
                if (repos.length > 0) {
                    autocompleteItems.forEach(curRepo => curRepo.addEventListener('click', function(e) {
                        createCardRepo(e.target.data ,repos);
                        showAutocompleteArea.classList.add('hidden');
                        infoMessage.classList.add('hidden');
                        repoInput.value = '';
                    }));
                }
            })
            .catch(error => console.log(error));
    }

});


