//Profile information:
const overview = document.querySelector(".overview");
const username = "Becca-RB";
const displayReposList = document.querySelector(".repo-list");
const allRepoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const reposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos"); 



const gitInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data);
};

gitInfo();

const displayUserInfo = async function (data){
    const newDiv = document.createElement ("div");
    newDiv.classList.add ("user-info");
    newDiv.innerHTML = 
    `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

    overview.append(newDiv);
};

const fetchRepos = async function (){
  const listRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const sortedData = await listRepos.json();
  console.log(sortedData);
  displayRepoInfo(sortedData);
};

 fetchRepos();

 const displayRepoInfo = function (repos){
   filterInput.classList.remove("hide");
  for (const eachRepo of repos){
    const repoListItem = document.createElement("li");
    repoListItem.classList.add("repo");
    repoListItem.innerHTML = `<h3>${eachRepo.name}</h3>`;
    displayReposList.append(repoListItem);
  }
 };

 displayReposList.addEventListener("click", function (e){
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  } 
 });

 const getRepoInfo = async function (repoName){
   const grabRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
   const repoInfo = await grabRepoInfo.json();
   console.log(repoInfo);
   
   const fetchLanguages = await fetch (repoInfo.languages_url);
   const languageData = await fetchLanguages.json();
   console.log (languageData);

   const languages = [];
   for (const language in languageData){
     languages.push(language);
   }
   console.log(languages);

   showRepoInfo(repoInfo, languages);
  };
  


  const showRepoInfo = function (repoInfo, languages){
    reposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

  repoData.append(div);

  
  };

  reposButton.addEventListener("click", function (){
   allRepoInfo.classList.remove("hide");
   repoData.classList.add("hide");
   reposButton.classList.add("hide");
  });


  filterInput.addEventListener("input", function (e) {
    const searchValue= e.target.value;
    const repos= document.querySelectorAll(".repo");
    const lowercaseValue= searchValue.toLowerCase();

    for (const eachOfRepo of repos){
      const lowercaseText= eachOfRepo.innerText.toLowerCase();
      if (lowercaseText.includes(lowercaseValue)){
        eachOfRepo.classList.remove("hide");
      } else {
        eachOfRepo.classList.add("hide");
      }
    }
  });