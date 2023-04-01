const generateBtn = document.getElementById("gnt");
const copyBtn = document.getElementById("cpy");
const outputInp = document.getElementById("output");
const pwd_range = document.getElementById("pwd-range");
const range = document.getElementById("range");

// footer copyright year
// const cYear =
document.getElementById("cYear").innerHTML = new Date().getFullYear();
// Char boxes
const numCheck = document.getElementById("numeric");
const upCaseCheck = document.getElementById("uppercase");
const lowCaseCheck = document.getElementById("lowercase");
const symCheck = document.getElementById("symbols");

// Alert Section
alertDiv = document.getElementById("alert-div");

// Range Value
let rangeVal = range.value;

// Generated Password
let generatedPwd;

//while change
range.addEventListener("change", () => {
  rangeVal = range.value;
  pwd_range.textContent = rangeVal;
});

// while oninput
range.addEventListener("input", () => {
  rangeVal = range.value;
  pwd_range.textContent = rangeVal;
});

// functions

function numChar() {
  return generateRandom(48, 57);
}

function symChar() {
  const symbolsVal = "!@#$%^&()";
  return symbolsVal[Math.floor(Math.random() * symbolsVal.length)];
}

function lowChar() {
  return generateRandom(97, 122);
}

function upChar() {
  return generateRandom(65, 90);
}

function generateRandom(min, max) {
  const valCheck = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * valCheck) + min);
}

const funArr = [
  {
    element: numCheck,
    funct: numChar,
  },
  {
    element: symCheck,
    funct: symChar,
  },
  {
    element: lowCaseCheck,
    funct: lowChar,
  },
  {
    element: upCaseCheck,
    funct: upChar,
  },
];

generateBtn.addEventListener("click", () => {
  const limitRange = rangeVal;

  generatedPwd = "";
  if (
    numCheck.checked ||
    symCheck.checked ||
    lowCaseCheck.checked ||
    upCaseCheck.checked
  ) {
    const funArray = funArr.filter(({ element }) => element.checked);
    alertDiv.innerHTML = "";
    for (i = 0; i <= limitRange; i++) {
      const index = Math.floor(Math.random() * funArray.length);
      generatedPwd += funArray[index].funct();
    }
    outputInp.value = generatedPwd;
    copyBtn.disabled = false;
  } else {
    copyBtn.disabled = true;
    const alertMsg = `<div class="alert col-11 mt-3 col-md-6 col-lg-4 mx-auto alert-danger alert-dismissible fixed-top fade show" role="alert">
        <strong>INFO</strong> Check atleast one type of Password.
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    alertDiv.innerHTML = "";
    const alertEl = document.createElement("div");
    alertEl.innerHTML = alertMsg;
    alertDiv.appendChild(alertEl);
  }
});

copyBtn.addEventListener("click", async () => {
  if (generatedPwd) {
    await navigator.clipboard.writeText(generatedPwd);
    const alertMsg = `<div class="alert col-11 mt-3 col-md-6 col-lg-4 mx-auto alert-success alert-dismissible fixed-top fade show" role="alert">
        <strong>Success</strong> Password Copied.
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    alertDiv.innerHTML = "";
    const alertEl = document.createElement("div");
    alertEl.innerHTML = alertMsg;
    alertDiv.appendChild(alertEl);
  } else {
    const alertMsg = `<div class="alert col-11 mt-3 col-md-6 col-lg-4 mx-auto alert-info alert-dismissible fixed-top fade show" role="alert">
        <strong>INFO</strong> Please generate a password to copy.
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    alertDiv.innerHTML = "";
    const alertEl = document.createElement("div");
    alertEl.innerHTML = alertMsg;
    alertDiv.appendChild(alertEl);
  }
});
