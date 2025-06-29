let batteries = document.querySelector(".real");
let batteryNumber = document.querySelector(".middle");
let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");

setInterval(() => {
  navigator.getBattery().then((battery) => {
    if (battery.charging) {
      let chargeN = Math.round(battery.level * 100);
      let charge = chargeN + "%";
      batteries.style.width = charge;
      batteries.style.transition = "1s linear all";
      batteryNumber.style.transition = "1s linear all";
      batteryNumber.innerText = charge;
      if (navigator.userAgentData.platform.includes("Android")) {
        let minuteM = 100 - chargeN;
        let totalTimeMinutes = minuteM * 2;

        let hoursM = Math.floor(totalTimeMinutes / 60);
        let minutesM = totalTimeMinutes % 60;

        batteries.style.background = "rgb(50 252 255)";
        text2.innerText = "Your Device Will Full Charge at :";
        text1.innerText = `⌛ Hour: ${hoursM} ⌛ Minutes: ${minutesM} ⌛`;

        text2.style.color = "white";
        text1.style.color = "rgb(50 252 255)";
      } else if (navigator.userAgentData.platform.includes("Windows")) {
        let minuteM = 100 - chargeN;
        let timePerPercent = 1.5;
        let totalTimeMinutes = minuteM * timePerPercent;

        let hoursW = Math.floor(totalTimeMinutes / 60);
        let minutesW = totalTimeMinutes % 60;

        batteries.style.background = "rgb(50 252 255)";
        text2.style.color = "white";
        text1.style.color = "rgb(50 252 255)";
        text2.innerText =
          "Your Device Is Charging . It Will Be Full Charge at :";
        text1.innerText = `⌛ Hour: ${hoursW} ⌛ Minutes: ${minutesW} ⌛`;
      }
    } else {
      let chargeN = Math.round(battery.level * 100);
      let charge = chargeN + "%";
      batteries.style.width = charge;
      batteries.style.transition = "1s linear all";
      batteryNumber.style.transition = "1s linear all";
      batteryNumber.innerText = charge;
      if (navigator.userAgentData.platform.includes("Android")) {
        if (chargeN <= 15) {
          let chargeM = chargeN * 6;
          let houreM = Math.floor(chargeM / 60);
          let minuteM = chargeM % 60;
          batteries.style.background = "#ff3c3c";
          text2.innerText = "Please Charge Your Device";
          text1.style.color = "#ff3c3c";
          text2.style.color = "white";
          text2.innerText = "Please Charge Your Device ";
          text1.innerText = `⌛ Hour: ${houreM} ⌛ Minutes: ${minuteM} ⌛`;
        } else if (chargeN < 49) {
          let chargeM = chargeN * 6;
          let houreM = Math.floor(chargeM / 60);
          let minuteM = chargeM % 60;
          batteries.style.background = "#fcff4f";
          text2.innerText = "Please Charge Your Device";
          text1.style.color = "#fcff4f";
          text2.style.color = "white";
          text2.innerText = "Your Device Will Off At: ";
          text1.innerText = `⌛ Hour: ${houreM} ⌛ Minutes: ${minuteM} ⌛`;
        } else {
          let chargeM = chargeN * 6;
          let houreM = Math.floor(chargeM / 60);
          let minuteM = chargeM % 60;

          batteries.style.background = "#32ff7c";
          text2.innerText = "Your Device Will Off At: ";
          text1.innerText = `⌛ Hour: ${houreM} ⌛ Minutes: ${minuteM} ⌛`;
          text1.style.color = "#32ff7c";
        }
      } else if (navigator.userAgentData.platform.includes("Windows")) {
        if (chargeN < 20) {
          let chargeW = chargeN;
          let houreW = Math.floor(chargeW / 60);
          let minuteW = chargeW % 60;
          batteries.style.background = "#ff3c3c";
          text2.innerText = "Please Charge Your Device";
          text1.style.color = "#ff3c3c";
          text2.style.color = "white";
          text2.innerText = "Please Charge Your Device ";
          text1.innerText = `⌛ Hour: ${houreW} ⌛ Minutes: ${minuteW} ⌛`;
        } else if (chargeN < 49) {
          let chargeW = chargeN;
          let houreW = Math.floor(chargeW / 60);
          let minuteW = chargeW % 60;
          batteries.style.background = "#fcff4f";
          text2.innerText = "Please Charge Your Device";
          text1.style.color = "#fcff4f";
          text2.style.color = "white";
          text2.innerText = "Your Device Will Off At: ";
          text1.innerText = `⌛ Hour: ${houreW} ⌛ Minutes: ${minuteW} ⌛`;
        } else {
          let chargeW = chargeN;
          let houreW = Math.floor(chargeW / 60);
          let minuteW = chargeW % 60;

          batteries.style.background = "#32ff7c";
          text2.innerText = "Your Device Will Off At: ";
          text1.innerText = `⌛ Hour: ${houreW} ⌛ Minutes: ${minuteW} ⌛`;
          text1.style.color = "#32ff7c";
        }
      }
    }
  });
}, 100);

navigator.getBattery().then((battery) => {
  let chargeN = Math.round(battery.level * 100);
  let charge = chargeN + "%";
  if (chargeN < 20) {
    Notification.requestPermission().then((Permissions) => {
      if (Permissions === "granted") {
        new Notification("Battery Level Low: " + charge, {
          icon: "./assets/images/battery_error.jpg",
          image: "./assets/images/battery_error.jpg",
          vibrate: [200, 100, 200],
          requireInteraction: true,
        });
      }
    });
  }
});

navigator.getBattery().then((battery) => {
  let chargeN = Math.round(battery.level * 100);
  let charge = chargeN + "%";
        window.onclick = function () {
          var audio = document.getElementById("myAudio");
          navigator.mediaSession.metadata = new MediaMetadata({
            title: "Your Charge Is : ",
            artist: charge,
          });
          setInterval(() => {
            audio.play();
          }, 100);
        };
  Notification.requestPermission().then((Permissions) => {
    battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
    battery.addEventListener("chargingchange", () =>
      updateBatteryStatus(battery)
    );

    function updateBatteryStatus(battery) {
      if (Permissions === "granted") {
        if (chargeN <= 15 || chargeN < 20) {
          if (battery.charging) {
            new Notification("Your Battery Is Charging: " + charge, {
              icon: "./assets/images/battery_charging.jpg",
              image: "./assets/images/battery_charging.jpg",
              vibrate: [200, 100, 200],
              requireInteraction: true,
            });
          } else {
            new Notification("Your Battery Is Not Charging: " + charge, {
              icon: "./assets/images/battery_error.jpg",
              image: "./assets/images/battery_error.jpg",
              vibrate: [200, 100, 200],
              requireInteraction: true,
            });
          }
        }
      }
    }
  });
});

navigator.wakeLock.request("screen");

const msg = new SpeechSynthesisUtterance(
  "Welcome To Battery System Of , Danial Jamshidi"
);
speechSynthesis.speak(msg);