// main.js

import { login, isAdmin } from "./core/auth.js";
import { openUserManager } from "./apps/users.js";

// Initialize desktop after login
async function initDesktop() {
  let loggedIn = false;

  // --- LOGIN LOOP ---
  while (!loggedIn) {
    const username = prompt("Username:");
    const password = prompt("Password:");
    const result = login(username, password);

    if (!result.success) {
      alert("Login failed. Try again.");
    } else {
      loggedIn = true;
      alert(`Logged in as ${username} (${result.role})`);
    }
  }

  // --- REGISTER APPS ---
  // Users app (admin-only)
  AppManager.register("users", () => {
    if (!isAdmin()) {
      alert("Access Denied: Admin Only");
      return;
    }
    openUserManager();
  });

  // Browser app
  AppManager.register("browser", () => {
    WindowManager.create("Browser", `
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <button id="backBtn">⟵</button>
        <button id="forwardBtn">⟶</button>
        <button id="reloadBtn">⟳</button>
        <input id="addressBar" style="flex:1;" placeholder="Enter URL">
      </div>
      <iframe id="browserFrame" style="width:100%;height:90%;border:none;background:black;"></iframe>
    `);

    const iframe = document.getElementById("browserFrame");
    const addressBar = document.getElementById("addressBar");
    const backBtn = document.getElementById("backBtn");
    const forwardBtn = document.getElementById("forwardBtn");
    const reloadBtn = document.getElementById("reloadBtn");

    let historyStack = [];
    let historyIndex = -1;

    function normalizeURL(input) {
      if (!input.startsWith("http")) return "https://" + input;
      return input;
    }

    function loadURL(url, push = true) {
      const finalURL = normalizeURL(url);
      iframe.src = finalURL;
      addressBar.value = finalURL;

      if (push) {
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(finalURL);
        historyIndex++;
      }
    }

    addressBar.addEventListener("keydown", e => {
      if (e.key === "Enter") loadURL(addressBar.value.trim());
    });

    backBtn.onclick = () => {
      if (historyIndex > 0) {
        historyIndex--;
        iframe.src = historyStack[historyIndex];
      }
    };

    forwardBtn.onclick = () => {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        iframe.src = historyStack[historyIndex];
      }
    };

    reloadBtn.onclick = () => (iframe.src = iframe.src);

    loadURL("https://coolmathgames.com");
  });

  // Chat app
  AppManager.register("chat", () => {
    WindowManager.create("Chat", `<div id="chatWindow">Chat app placeholder</div>`);
    // Add chat.js logic here or import module
  });

  // Terminal app
  AppManager.register("terminal", () => {
    WindowManager.create("Terminal", `<div id="terminalWindow">Terminal app placeholder</div>`);
    // Add terminal.js logic here or import module
  });

  // DevTools app
  AppManager.register("devtools", () => {
    WindowManager.create("DevTools", `<div id="devtoolsWindow">DevTools app placeholder</div>`);
    // Add devtools.js logic here or import module
  });

  // --- OPTIONAL: you can register more apps here ---
}

// Start the desktop
initDesktop();

