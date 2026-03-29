// playersystem.js

let playerName = localStorage.getItem("playerName") || "";
let playerAvatar = localStorage.getItem("playerAvatar") || "";

//  INIT funktion (bara körs på index)
export function initPlayerSystem() {

  const avatarBtn = document.getElementById("avatarBtn");
  const nameBtn = document.getElementById("nameBtn");
  const avatarBlock = document.getElementById("avatarBlock");
  const avatarList = document.getElementById("avatarList");
  const selectedAvatar = document.getElementById("selectedAvatar");
  const selectedName = document.getElementById("selectedName");

  if (!avatarBtn) return;

  const TOTAL_AVATARS = 100;

  // visa sparad info
  if (playerAvatar && selectedAvatar) {
    selectedAvatar.src = playerAvatar;
    selectedAvatar.style.display = "block";
  }

  if (playerName && selectedName) {
    selectedName.textContent = playerName;
  }

  // skapa avatars
  for (let i = 1; i <= TOTAL_AVATARS; i++) {
    const img = document.createElement("img");
    img.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`;
    
    img.addEventListener("click", () => {
      playerAvatar = img.src;
      localStorage.setItem("playerAvatar", playerAvatar);

      selectedAvatar.src = playerAvatar;
      selectedAvatar.style.display = "block";
      avatarBlock.style.display = "none";
    });

    avatarList.appendChild(img);
  }

  avatarBtn.addEventListener("click", () => {
    avatarBlock.style.display =
      avatarBlock.style.display === "flex" ? "none" : "flex";
  });

  nameBtn.addEventListener("click", () => {
    const name = prompt("Enter your name:", playerName);
    if (name) {
      playerName = name;
      localStorage.setItem("playerName", playerName);
      selectedName.textContent = playerName;
    }
  });
}

// används av ALLA sidor
export function getPlayerInfo() {
  return {
    name: localStorage.getItem("playerName") || "",
    avatar: localStorage.getItem("playerAvatar") || ""
  };
}