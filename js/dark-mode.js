if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  darkModeSwitch.checked = true;
} else {
  body.classList.add("light-mode");
}

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    return;
  }
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  localStorage.setItem("theme", "light");
});
