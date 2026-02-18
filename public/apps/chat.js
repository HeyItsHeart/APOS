AppManager.register("chat", () => {

  WindowManager.create("AP P2P Chat", `
    <div style="display:flex; flex-direction:column; height:100%;">
      
      <input id="chat-name" placeholder="Your name" value="${Kernel.user}" />
      <div style="display:flex; gap:6px; margin:6px 0;">
        <button id="chat-create">Create Room</button>
        <button id="chat-join">Join Room</button>
        <button id="chat-apply">Apply Answer</button>
      </div>

      <textarea id="chat-roomCode" rows="3" placeholder="Room code" style="width:100%;"></textarea>

      <div id="chat-messages" style="flex:1; overflow-y:auto; border:1px solid var(--red); padding:6px; margin-top:6px;"></div>

      <input id="chat-input" placeholder="Type message..." disabled />
    </div>
  `);

  let chatPC, chatChannel;
  let isCreator = false;

  const messages = document.getElementById("chat-messages");
  const input = document.getElementById("chat-input");
  const roomCode = document.getElementById("chat-roomCode");

  function log(msg) {
    const div = document.createElement("div");
    div.textContent = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function setup(creator) {
    isCreator = creator;

    chatPC = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    chatPC.ondatachannel = e => {
      chatChannel = e.channel;
      setupChannel();
    };

    chatPC.onicecandidate = e => {
      if (!e.candidate) {
        roomCode.value = btoa(JSON.stringify(chatPC.localDescription));
      }
    };
  }

  function setupChannel() {
    chatChannel.onopen = () => {
      input.disabled = false;
      log("Connected.");
    };

    chatChannel.onmessage = e => log(e.data);
  }

  document.getElementById("chat-create").onclick = async () => {
    setup(true);
    chatChannel = chatPC.createDataChannel("chat");
    setupChannel();

    const offer = await chatPC.createOffer();
    await chatPC.setLocalDescription(offer);
  };

  document.getElementById("chat-join").onclick = async () => {
    setup(false);
    try {
      const offer = JSON.parse(atob(roomCode.value));
      await chatPC.setRemoteDescription(offer);

      const answer = await chatPC.createAnswer();
      await chatPC.setLocalDescription(answer);
    } catch {
      alert("Invalid room code.");
    }
  };

  document.getElementById("chat-apply").onclick = async () => {
    try {
      const answer = JSON.parse(atob(roomCode.value));
      await chatPC.setRemoteDescription(answer);
    } catch {
      alert("Invalid answer code.");
    }
  };

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && chatChannel?.readyState === "open") {
      const msg = `${Kernel.user}: ${input.value}`;
      chatChannel.send(msg);
      log(msg);
      input.value = "";
    }
  });
});
