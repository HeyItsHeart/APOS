AppManager.register("devtools", () => {

  if (Kernel.role !== "admin") {
    alert("Access Denied.");
    return;
  }

  WindowManager.create("Developer Tools", `
    <h3 style="color:var(--red)">Developer Panel</h3>
    <p>User: ${Kernel.user}</p>
    <p>Role: ${Kernel.role}</p>
    <hr>
    <p>System Status: <span style="color:#4caf50;">OK</span></p>
    <p>Proxy Core: Offline</p>
    <p>Kernel Mode: Active</p>
  `);
});
