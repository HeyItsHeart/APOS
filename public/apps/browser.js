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

  function loadURL(url, push=true){
    const finalURL = normalizeURL(url);
    iframe.src = finalURL;
    addressBar.value = finalURL;

    if(push){
      historyStack = historyStack.slice(0, historyIndex+1);
      historyStack.push(finalURL);
      historyIndex++;
    }
  }

  addressBar.addEventListener("keydown", e=>{
    if(e.key==="Enter") loadURL(addressBar.value.trim());
  });

  backBtn.onclick = ()=>{
    if(historyIndex>0){
      historyIndex--;
      iframe.src = historyStack[historyIndex];
    }
  };

  forwardBtn.onclick = ()=>{
    if(historyIndex<historyStack.length-1){
      historyIndex++;
      iframe.src = historyStack[historyIndex];
    }
  };

  reloadBtn.onclick = ()=> iframe.src = iframe.src;

  loadURL("https://coolmathgames.com");
});
