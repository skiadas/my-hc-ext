// const baseUrl = "https://policies.hanover.edu";
// const policiesLink = "https://policies.hanover.edu/?pdc=ACADAF&pcn=NDAw"

// function domifyAndGetSelector(text, selector) {
//   const dom = document.createElement('div');
//   dom.insertAdjacentHTML('afterBegin', text);
//   if (!selector) return dom;
//   return dom.querySelector(selector);
// }

// function getBody(url) {
//   return fetch(url).then((resp) => resp.text())
// }

// function getAsElement(url, selector) {
//   return getBody(url).then(text => {
//     console.log(text);
//     return domifyAndGetSelector(text, selector);
//   });
// }

// function processEntry(entry) {
//   getAsElement(baseUrl + entry.link).then(el => {
//     const content = el.querySelector(".content");
//     const title = el.querySelector(".title span").textContent;
//     const newEl = document.createElement("section");
//     newEl.insertAdjacentHTML("afterbegin", `<h2>${title}</h2>`)
//     newEl.insertAdjacentElement("beforeend", content);
//     document.querySelector("#sections")
//       .insertAdjacentElement("beforeEnd", newEl);
//   });
// }

// function preparePageFromMain(text) {
//   const toc = domifyAndGetSelector(text, "tbody");
//   const rows = toc.querySelectorAll("tr");
//   const entries = [];
//   console.log(rows);
//   for (const row of rows) {
//     const tds = row.querySelectorAll("td");
//     if (tds.length < 3) continue;
//     const linkEntry = tds[2].querySelector("a");
//     if (!linkEntry) continue;
//     const entry = {
//       pmsFilename: tds[0].textContent,
//       FMSection: tds[1].textContent,
//       title: linkEntry.textContent,
//       link: linkEntry.getAttribute("href"),
//       approvedBy: tds[3].textContent,
//       revision: tds[4].textContent
//     }
//     entries.push(entry);
//   }
//   for (const entry of entries) {
//     processEntry(entry);
//   }
// }

// window.addEventListener("DOMContentLoaded", () => {
//   getBody(policiesLink).then(preparePageFromMain);
// })
