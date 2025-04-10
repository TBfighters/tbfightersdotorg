function printPage() {
    if (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {


        let win = window.open("./talking-points.html", '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
            win.addEventListener("afterprint", (_) => {
                win.close()
            }, { once: true });
        }, 500)
    } else {
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.src = "./talking-points.html";
        document.body.appendChild(iframe);
        iframe.contentWindow.onload = () => {
            iframe.contentWindow.print()
            iframe.contentWindow.addEventListener("afterprint", (event) => {
                iframe.remove();
            })
        };
    }
}
