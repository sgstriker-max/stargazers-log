const list = document.getElementById("starred-list");
const status = document.getElementById("status");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load repository data (${response.status}).`);
    }
    return response.json();
  })
  .then((repositories) => {
    repositories.forEach((repository) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const date = document.createElement("span");

      link.className = "repo-name";
      link.href = `https://github.com/${repository.name}`;
      link.textContent = repository.name;
      date.className = "starred-date";
      date.textContent = `Starred on ${repository.starred}`;

      item.append(link, date);
      list.appendChild(item);
    });

    status.textContent = repositories.length
      ? ""
      : "No starred repositories to show yet.";
  })
  .catch((error) => {
    status.textContent = "Unable to load starred repositories. Please try again later.";
    console.error(error);
  });
