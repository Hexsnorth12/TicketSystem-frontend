// utils/paymentUtils.ts

export function createNewebPayOrder(
    paymentGatewayUrl: string,
    merchantId: string,
    tradeInfo: string,
    tradeSha: string,
    version: string,
): string {
    return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <form id="newebpayForm" name="newebpayForm" method="post" action="${paymentGatewayUrl}">
                <input type="hidden" name="MerchantID" value="${merchantId}">
                <input type="hidden" name="TradeInfo" value="${tradeInfo}">
                <input type="hidden" name="TradeSha" value="${tradeSha}">
                <input type="hidden" name="Version" value="${version}">
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
