let table = document.getElementById("list")

fetchData();

function fetchData() {
    fetch("/l/get_list")
    .then((res) => {
        if (res.ok) return res.json();
    })
    .then(data => {    
        data.forEach(d => {
            let row = table.insertRow()
    
            row.insertCell().innerHTML = d.long;
            row.insertCell().innerHTML = d.short;
            row.insertCell().innerHTML = d.nb;
            row.insertCell().innerHTML = `<button class="button-primary" onclick="copyLink('${d.short}')">🔗</button>`
            row.insertCell().innerHTML = `<button class="button-primary" onclick="deleteLink('${d.id}')">🗑️</button>`;
        })
    })
}


function deleteLink(id) {
    fetch("/l/delete/" + id, {method: "DELETE"})
    .then((res) => {
        if (res.ok) window.location.reload();
    })
}

function copyLink(short) {
    let url = window.location.protocol + "//" + window.location.host + "/" + short;

    copyToClipboard(url);
    Toastify({
        text: "Adresse copiée dans votre presse papier : " + url,
        duration: 1500, 
        destination: url,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: 'center',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}

function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};