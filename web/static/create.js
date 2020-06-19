var tb = document.getElementById("short")

function getToken() {
    fetch("/l/get_short")
    .then((res) => {
        if (res.ok) return res.json();
    })
    .then((data) => {
        tb.value = data.short;
    })
}