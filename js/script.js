//Profile information:
const overview = document.querySelector(".overview");
const username = "Becca-RB";
const displayReposList = document.querySelector(".repo-list");

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
  for (const eachRepo of repos){
    const repoListItem = document.createElement("li");
    repoListItem.classList.add("repo");
    repoListItem.innerHTML = `<h3>${eachRepo.name}</h3>`;
    displayReposList.append(repoListItem);
  }
 };
