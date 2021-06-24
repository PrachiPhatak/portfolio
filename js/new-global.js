// document.write(`
//
//     <h1>Add your HTML code here</h1>
//
//      <p>Notice, you do not have to escape LF's with a '\',
//         like demonstrated in the above code listing.
//     </p>
//
// `);
window.onload = function() {
    var elements = document.getElementsByTagName('*'),
        i;
    for (i in elements) {
        if (elements[i].hasAttribute && elements[i].hasAttribute('data-include')) {
            fragment(elements[i], elements[i].getAttribute('data-include'));
        }
    }
    function fragment(el, url) {
        var localTest = /^(?:file):/,
            xmlhttp = new XMLHttpRequest(),
            status = 0;

        xmlhttp.onreadystatechange = function() {
            /* if we are on a local protocol, and we have response text, we'll assume
 *  				things were sucessful */
            if (xmlhttp.readyState == 4) {
                status = xmlhttp.status;
            }
            if (localTest.test(location.href) && xmlhttp.responseText) {
                status = 200;
            }
            if (xmlhttp.readyState == 4 && status == 200) {
                el.outerHTML = xmlhttp.responseText;
            }
        }

        try {
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        } catch(err) {
            /* todo catch error */
        }
    }
}