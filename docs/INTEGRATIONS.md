# Integrations
## Razorpay
Complete merchant onboarding and use test credentials first. Set server-only RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET. The API creates orders and verifies checkout signatures. Before live launch add signed webhooks, idempotency, refunds, reconciliation, invoices and customer support. Do not trust browser-side success alone.
## AdSense
AdSense is an advertising monetisation service, not a customer payment gateway. Apply on your actual domain. Add only the publisher code and ads.txt line Google supplies. This project does not guarantee approval.
## Email
Connect a transactional email service and store its API key server-side. Send lead notifications only after successful database persistence.
## Mobile
Configure the production API URL and wire mobile forms/authentication to the shared API before release.
