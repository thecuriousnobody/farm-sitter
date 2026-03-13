# Data Model

## Core Entities

### User
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| roles | enum[] | public_lead, operator_prospect, trainee, credentialed_operator, affiliate, animal_owner, admin, instructor |
| first_name | string | |
| last_name | string | |
| email | string | unique |
| phone | string | |
| address | string | |
| city | string | |
| state | string | |
| zip | string | |
| timezone | string | |
| account_status | enum | active, inactive, suspended |
| created_at | timestamp | |
| updated_at | timestamp | |

### Operator Profile
| Field | Type | Notes |
|-------|------|-------|
| user_id | UUID | FK → User |
| business_name | string | |
| legal_entity_name | string | |
| credential_level | enum | none, credentialed, affiliate |
| affiliate_status | enum | none, pending, active, expired, suspended |
| service_radius_miles | int | |
| states_served | string[] | |
| zip_codes_served | string[] | |
| animals_experienced | string[] | tier tags |
| services_offered | string[] | |
| years_experience | int | |
| bio | text | |
| accepting_clients | boolean | |
| directory_visible | boolean | |
| insurance_verified | boolean | |
| background_verified | boolean | |
| references_verified | boolean | |
| badge_status | enum | none, active, expired |
| renewal_date | date | |

### Customer Profile
| Field | Type | Notes |
|-------|------|-------|
| user_id | UUID | FK → User |
| property_type | string | |
| primary_animal_types | string[] | |
| animal_counts | jsonb | e.g. {"horses": 3, "chickens": 12} |
| city | string | |
| state | string | |
| zip | string | |
| notes | text | |
| marketing_consent | boolean | |

### Animal Inquiry / Care Request
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| customer_id | UUID | FK → User |
| trip_start | date | |
| trip_end | date | |
| animal_types | string[] | |
| animal_quantities | jsonb | |
| service_notes | text | |
| overnight_requested | boolean | |
| dog_care_required | boolean | |
| estimated_care_time | string | |
| latitude | float | |
| longitude | float | |
| status | enum | new, matched, posted, closed |
| matched_operator_ids | UUID[] | |
| bulletin_board | boolean | |
| admin_notes | text | |
| close_reason | string | |

### Course / Training Program
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| title | string | |
| description | text | |
| format | enum | in_person, virtual, hybrid, self_paced |
| cohort_date | date | nullable |
| modules | jsonb | |
| instructor_id | UUID | FK → User |
| price_cents | int | |
| status | enum | draft, open, closed, completed |
| completion_requirements | jsonb | |

### Enrollment
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| user_id | UUID | FK → User |
| course_id | UUID | FK → Course |
| payment_status | enum | pending, paid, refunded |
| attendance_status | enum | registered, attended, no_show |
| completion_status | enum | incomplete, completed |
| test_status | enum | not_taken, passed, failed |
| credential_issued | boolean | |

### Credential Record
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| operator_id | UUID | FK → User |
| credential_type | string | |
| issue_date | date | |
| expiration_date | date | |
| status | enum | active, expired, suspended, renewal_pending |
| ce_required | int | hours/credits |
| ce_completed | int | |
| verification_token | string | unique, for public lookup |

### Affiliate / License Record
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| operator_id | UUID | FK → User |
| license_start | date | |
| license_end | date | |
| annual_fee_tier | string | |
| territory_preference | jsonb | geographic area definition |
| status | enum | pending, active, expired, suspended |
| compliance_flags | jsonb | |
| brand_use_approved | boolean | |
| listing_priority | int | higher = more prominent |

### Verification / Compliance Record
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| operator_id | UUID | FK → User |
| insurance_uploaded | boolean | |
| insurance_expiration | date | |
| background_status | enum | not_started, pending, cleared, flagged |
| references_count | int | |
| references_status | enum | pending, verified |
| documents_signed | boolean | |
| terms_accepted | boolean | |
| manual_review_status | enum | pending, approved, denied |
| notes | text | |

### Event / Workshop
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| title | string | |
| dates | daterange | |
| venue | string | |
| registration_cap | int | |
| itinerary | text | |
| meal_notes | text | |
| transport_notes | text | |

### Document / Resource
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| title | string | |
| audience | enum | public, trainee, operator, affiliate, admin |
| type | enum | guide, checklist, template, brochure, agreement |
| file_url | string | |
| gated | boolean | requires auth |
| version | string | |
| status | enum | draft, published, archived |
