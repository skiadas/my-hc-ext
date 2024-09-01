const policiesLink = "https://policies.hanover.edu/?pdc=ACADAF&pcn=NDAw"
console.log("loading policy stuff");
alert("yo!");
function insertHandlersAndCSS() {
  const toggler = `
  <div class="toggler">
  <button data-action="enable">Expand All</button>
  <button data-action="disable" class="hidden">Collapse All</button>
  </div>
  `
  document.querySelector("body").insertAdjacentHTML('afterbegin', toggler);
  document.querySelector(".toggler").addEventListener("click", (ev) => {
    const el = ev.target;
    if (!el.matches("button")) return;
    const allAdded = document.querySelectorAll(".inserted-content-row");
    if (el.dataset.action == "enable") {
      allAdded.forEach(e => e.classList.remove("hidden"));
    } else if (el.dataset.action == "disable") {
      allAdded.forEach(e => e.classList.add("hidden"));
    }
    el.parentElement.querySelectorAll("button").forEach(e => e.classList.toggle("hidden"));
  });
  document.querySelector('tbody').addEventListener('click', (ev) => {
    const el = ev.target;
    if (el.matches("button.collapse, button.expand")) {
      el.closest("tr").classList.toggle("hidden");
    }
  });
}


function domifyAndGetSelector(text, selector) {
  const dom = document.createElement('div');
  dom.insertAdjacentHTML('afterBegin', text);
  if (!selector) return dom;
  return dom.querySelector(selector);
}

function getBody(url) {
  return fetch(url).then((resp) => resp.text());
}

function getAsElement(url, selector) {
  return getBody(url).then(text => {
    return domifyAndGetSelector(text, selector);
  });
}


function populateEntry(entry) {
  getAsElement(entry.link, ".content").then(el => {
    const td = document.createElement('td');
    td.setAttribute('colspan', 5);
    entry.element.classList.add('hidden');
    entry.element.insertAdjacentElement('afterbegin', td);
    td.insertAdjacentHTML('afterbegin', '<button class="collapse">▼</button><button class="expand">▶</button><div></div>')
    td.querySelector("div").insertAdjacentElement('beforeend', el);
  });
}

const tbody = document.querySelector("tbody");
if (tbody) {
  insertHandlersAndCSS();
  // We copy the rows so we can safely insert new rows
  const rows = [...tbody.querySelectorAll("tr")];
  const entries = [];
  for (const row of rows) {
    const tds = row.querySelectorAll("td");
    if (tds.length < 3) continue;
    const linkEntry = tds[2].querySelector("a");
    if (!linkEntry) continue;
    const newEl = document.createElement("tr");
    newEl.classList.add("inserted-content-row");
    row.insertAdjacentElement('afterend', newEl);
    const entry = {
      pmsFilename: tds[0].textContent,
      FMSection: tds[1].textContent,
      title: linkEntry.textContent,
      link: linkEntry.getAttribute("href"),
      approvedBy: tds[3].textContent,
      revision: tds[4].textContent,
      element: newEl
    }
    entries.push(entry);
  }
  entries.forEach(populateEntry);
}
