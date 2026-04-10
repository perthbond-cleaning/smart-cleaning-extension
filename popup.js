const service = document.getElementById("service");
const formArea = document.getElementById("formArea");
const totalText = document.getElementById("total");

let state = {
  serviceType: "",
  bedrooms: 0,
  bathrooms: 0,
  carpet: false,
  oven: false,
  name: "",
  phone: ""
};

// 💰 PRICING
const pricing = {
  bond: { base: 120, bedroom: 30, bathroom: 25, carpet: 60, oven: 35 },
  vacate: { base: 150, bedroom: 35, bathroom: 30, carpet: 70, oven: 40 },
  end: { base: 180, bedroom: 40, bathroom: 35, carpet: 80, oven: 50 }
};

// SERVICE CHANGE
service.addEventListener("change", function () {
  state.serviceType = this.value;
  renderForm();
  calculate();
});

// FORM UI
function renderForm() {
  formArea.innerHTML = "";

  if (!state.serviceType) return;

  formArea.innerHTML = `
    <input id="name" placeholder="Your Name" />
    <input id="phone" placeholder="Phone Number" />

    <hr>

    <label>Bedrooms</label>
    <input type="number" id="bedrooms" value="0" min="0">

    <label>Bathrooms</label>
    <input type="number" id="bathrooms" value="0" min="0">

    <label><input type="checkbox" id="carpet"> Carpet Cleaning</label>
    <label><input type="checkbox" id="oven"> Oven Cleaning</label>

    <hr>

    <div id="summary"></div>
  `;

  document.getElementById("name").addEventListener("input", e => state.name = e.target.value);
  document.getElementById("phone").addEventListener("input", e => state.phone = e.target.value);

  document.getElementById("bedrooms").addEventListener("input", e => {
    state.bedrooms = Number(e.target.value);
    calculate();
  });

  document.getElementById("bathrooms").addEventListener("input", e => {
    state.bathrooms = Number(e.target.value);
    calculate();
  });

  document.getElementById("carpet").addEventListener("change", e => {
    state.carpet = e.target.checked;
    calculate();
  });

  document.getElementById("oven").addEventListener("change", e => {
    state.oven = e.target.checked;
    calculate();
  });
}

// CALCULATION ENGINE
function calculate() {
  if (!state.serviceType) return;

  let p = pricing[state.serviceType];
  let total = p.base;

  total += state.bedrooms * p.bedroom;
  total += state.bathrooms * p.bathroom;
  if (state.carpet) total += p.carpet;
  if (state.oven) total += p.oven;

  totalText.innerText = total;

  showSummary(total);
}

// SUMMARY
function showSummary(total) {
  const summary = document.getElementById("summary");
  if (!summary) return;

  summary.innerHTML = `
    <hr>
    <b>Quote Summary</b><br>
    Name: ${state.name || "-"}<br>
    Phone: ${state.phone || "-"}<br>
    Service: ${state.serviceType}<br>
    Bedrooms: ${state.bedrooms}<br>
    Bathrooms: ${state.bathrooms}<br>
    Carpet: ${state.carpet ? "Yes" : "No"}<br>
    Oven: ${state.oven ? "Yes" : "No"}<br>
    <h3>Total: $${total}</h3>

    <button id="whatsappBtn">Send WhatsApp Quote</button>
  `;

  document.getElementById("whatsappBtn").addEventListener("click", sendWhatsApp);
}

// WHATSAPP INTEGRATION
function sendWhatsApp() {
  let msg = `
Hi, I need cleaning quote:

Service: ${state.serviceType}
Bedrooms: ${state.bedrooms}
Bathrooms: ${state.bathrooms}
Carpet: ${state.carpet ? "Yes" : "No"}
Oven: ${state.oven ? "Yes" : "No"}

Name: ${state.name}
Phone: ${state.phone}

Estimated Price: $${totalText.innerText}
`;

  let url = "https://wa.me/92XXXXXXXXXX?text=" + encodeURIComponent(msg);

  window.open(url, "_blank");
}

// BOOK BUTTON
document.getElementById("bookBtn").addEventListener("click", () => {
  window.open("https://perthbondcleaning.com.au/", "_blank");
});