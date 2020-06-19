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
            row.insertCell().innerHTML = `<button class="button-primary" onclick="deleteLink(${d.id})">🗑️</button>`;
        })
    })
}


function deleteLink(id) {
    fetch("/l/delete/" + id, {method: "DELETE"})
    .then((res) => {
        if (res.ok) window.location.reload();
    })
}