# Matching and Referral Logic

## Customer Inquiry Flow

1. Customer submits request (location, animal types, dates, care details)
2. System validates location (geocode zip/city)
3. System checks for sitters by geography and status
4. Prioritize matches:
   - **Priority 1**: Licensed affiliates with local coverage
   - **Priority 2**: Credentialed independents within expanded range
   - **Priority 3**: No match → post to bulletin board + capture as unmet demand
5. Create referral or posting
6. Notify admin and/or matched operators
7. Track outcome

## Referral vs Bulletin Board

The system supports both:
- **Admin-mediated referrals** — admin reviews and connects customer to operator
- **Bulletin board posting** — unmatched requests visible to qualified operators in region

## Visibility Rules

- Not all credentialed operators are necessarily listed publicly in early versions
- Map/listing visibility can expand over time
- Customers can submit inquiries even when no local sitter is visible
- No-sitter zones are tracked as expansion signals

## Search Parameters

- Zip code / radius based
- Animal type matching
- Service type matching
- Sitter availability status
- Credential and compliance status must be current

## Coverage Intelligence (Future)

- Farm/feed store proximity
- Livestock density data
- Exurban cluster mapping
- Unmet-demand heat maps
