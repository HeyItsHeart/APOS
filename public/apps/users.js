AppManager.register("users", () => {

  WindowManager.create("Online Users", `
    <ul id="userList"></ul>
  `);

  const list = document.getElementById("userList");

  socket.on("updateUsers", users => {
    list.innerHTML = "";
    users.forEach(u => {
      const li = document.createElement("li");
      li.textContent = u;
      list.appendChild(li);
    });
  });
});
