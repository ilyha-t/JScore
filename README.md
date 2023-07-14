Application for GET GitHub repositories via opening GitHub API.
This application live there: https://ilyha-t.github.io/JScore/

-----------------------------------
using methods:
GET - https://api.github.com/search/repositories?q=${repoName} ; repoName - name searching repository
-----------------------------------

Settings params:
1) getRepos = autocompleteInput(fetchGitRepos, 500), where: 500 - delay in ms between requests to GitHub API.

REST API
-----------------------------------
Registration user Ilyha Nefedev (method POST):
![](../../Pictures/Screenshots/Screenshot from 2023-07-14 17-35-43.png)

Authorization user (method POST):
![](../../Pictures/Screenshots/Screenshot from 2023-07-14 17-38-46.png)

Get current user (method GET):
![](../../Pictures/Screenshots/Screenshot from 2023-07-14 17-56-19.png)