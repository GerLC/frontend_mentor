document.addEventListener('DOMContentLoaded', () => {
    let _timer = 1686341775;
    let flipdown = new FlipDown(_timer)
        .start()
        .ifEnded(() => {
            document.querySelector(".flipdown").innerHTML = `<h2>Timer is finished</h2>`;
        })
})
