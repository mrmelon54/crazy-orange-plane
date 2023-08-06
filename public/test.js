var win = null;

window.addEventListener("load", function () {
  let btn = document.createElement("button");
  btn.textContent = "Awesome Button";
  btn.addEventListener("click", attemptToGetGithubInfo);
  document.body.appendChild(btn);
});

window.addEventListener("message", function (event) {
  console.log(event);
  if (event.origin !== "https://crazy-orange-plane.glitch.me") return;
  if (win != null) {
    win.close();
    win = null;
  }

  let d1 = document.createElement("div");
  let d2 = document.createElement("pre");
  d2.textContent = JSON.stringify(event.data, null, "  ");
  d1.appendChild(d2);
  document.body.appendChild(d1);
});

function attemptToGetGithubInfo() {
  win = window.open(
    "https://api.modrinth.com/v2/auth/init?url=https://crazy-orange-plane.glitch.me/callback",
    "Testing...",
    "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1,height=1,left=-1000,top=-1000"
  );
  setTimeout(function () {
    if (win != null) {
      win.close();
      win = null;
    }
  }, 100000);
}
