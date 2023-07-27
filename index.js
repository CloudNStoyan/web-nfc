const scanButton = document.querySelector("#scanButton");
const scanName = document.querySelector("#scanName");
const scanValue = document.querySelector("#scanValue");
const addToScansBtn = document.querySelector("#addToScans");
const scansContainer = document.querySelector("#scans");

const scans = [];

const updateScansUI = () => {
  scansContainer.innerHTML = "";

  for (const scan of scans) {
    const writeWrapper = document.createElement("li");
    const writeButton = document.createElement("button");
    writeButton.addEventListener("click", async () => {
      try {
        console.log("Trying to write: " + scan.serialNumber);
        const ndef = new NDEFReader();
        await ndef.write(scan.serialNumber);
        alert("Message written");
      } catch (error) {
        alert("Error: " + error);
      }
    });
    writeButton.innerText = scan.name;

    writeWrapper.appendChild(writeButton);
    scansContainer.appendChild(writeWrapper);
  }
};

scanButton.addEventListener("click", async () => {
  try {
    const ndef = new NDEFReader();
    await ndef.scan();

    ndef.addEventListener("readingerror", () => {
      alert("NFC Read Error");
    });

    ndef.addEventListener("reading", ({ serialNumber }) => {
      scanValue.value = serialNumber;
    });
  } catch (error) {
    alert("Error: " + error);
  }
});

addToScansBtn.addEventListener("click", () => {
  const serialNumber = scanValue.value;
  const name = scanName.value;

  scans.push({ serialNumber, name });
  void updateScansUI();
});
