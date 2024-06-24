export function createNewebPayOrder(
    paymentGateway: string,
    MerchantId: string,
    TradeInfo: string,
    TradeSha: string,
    Version: string,
): string {
    return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <form id="newebpayForm" name="newebpayForm" method="post" action="${paymentGateway}" target="_blank">
                <input type="hidden" name="MerchantId" value="${MerchantId}">
                <input type="hidden" name="TradeInfo" value="${TradeInfo}">
                <input type="hidden" name="TradeSha" value="${TradeSha}">
                <input type="hidden" name="Version" value="${Version}">
                <noscript>
                    <p>JavaScript is required for this form to function properly.</p>
                </noscript>
            </form>
            <script>
                document.getElementById("newebpayForm").submit();
            </script>
        </body>
        </html>
    `
}
