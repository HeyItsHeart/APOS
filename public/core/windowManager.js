const WindowManager = {
  z: 1,
  create(title, html) {
    const win = document.createElement("div");
    win.className = "window";
    win.style.width = "700px";
    win.style.height = "500px";
    win.style.top = "80px";
    win.style.left = "120px";
    win.style.zIndex = this.z++;

    win.innerHTML = `
      <div class="window-header">${title}</div>
      <div class="window-content">${html}</div>
    `;

    document.getElementById("desktop").appendChild(win);

    const header = win.querySelector(".window-header");

    header.onmousedown = (e) => {
      const offsetX = e.clientX - win.offsetLeft;
      const offsetY = e.clientY - win.offsetTop;

      document.onmousemove = (e2) => {
        win.style.left = e2.clientX - offsetX + "px";
        win.style.top = e2.clientY - offsetY + "px";
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };
  }
};
