export const bodyMetric = (): string => `
    <!— Rating Mail.ru counter —>
        <script type="text/javascript">
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3169578", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
            if (d.getElementById(id)) return;
            var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
            ts.src = "https://top-fwz1.mail.ru/js/code.js";
            var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
            if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "topmailru-code");
        </script>
        <noscript><div><img src="https://top-fwz1.mail.ru/counter?id=3169578;js=na" style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div></noscript>
    <!— //Rating Mail.ru counter —>
    
    
    
    <!— Google Tag Manager (noscript) —>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVL7KKZ"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!— End Google Tag Manager (noscript) —>
`
