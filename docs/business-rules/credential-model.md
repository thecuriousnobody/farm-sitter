# Credential Model

## Credential States

| State | Description |
|-------|-------------|
| applicant | Submitted application, not yet enrolled |
| enrolled | Paid for and enrolled in training |
| completed_training | Finished workshop/coursework |
| passed_testing | Passed certification tests |
| credentialed | Active credential issued |
| expired | Credential lapsed (past renewal date) |
| suspended | Credential suspended (compliance issue) |
| in_renewal | Renewal period, awaiting payment/CE completion |

## Credential Record Fields

- Operator ID
- Credential type
- Issue date
- Expiration date
- Status
- Continuing education required
- Continuing education completed
- Public verification token

## Digital Badge

- Issued on credential completion
- Downloadable graphics for marketing
- Verification link for public lookup
- Expiration and renewal logic
- Displayed on operator profile and directory listing

## Continuing Education

- May be required for renewal
- Tracked per credential period
- Configurable requirements by credential type

## Public Verification

- Unique token per credential
- Public verification page: `/verify/{token}`
- Shows: name, credential level, status, issue/expiration dates
