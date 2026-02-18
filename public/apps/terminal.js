AppManager.register("terminal", () => {

  WindowManager.create("Terminal", `
    <div style="display:flex; flex-direction:column; height:100%; font-family:monospace;">
      <div id="termOut" style="flex:1; overflow-y:auto;"></div>
      <input id="termIn" placeholder="Enter command..." />
    </div>
  `);

  const out = document.getElementById("termOut");
  const input = document.getElementById("termIn");

  function print(text) {
    const div = document.createElement("div");
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function run(cmd) {
    print("> " + cmd);

    switch (cmd.toLowerCase()) {
      case "help":
        print("help, clear, whoami, apps, version");
        break;

      case "clear":
        out.innerHTML = "";
        break;

      case "whoami":
        print("User: " + Kernel.user);
        break;

      case "apps":
        print("Installed Apps:");
        Object.keys(AppManager.apps).forEach(a => print("- " + a));
        break;

      case "version":
        print("Access Point OS Alpha 1");
        break;

      default:
        print("Unknown command.");
    }
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      run(input.value.trim());
      input.value = "";
    }
  });

  print("Access Point Terminal Ready.");
});
