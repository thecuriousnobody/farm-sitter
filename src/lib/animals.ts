// Shared animal list used consistently across:
// - Pre-screening assessment (sitter lead capture)
// - Onboarding Step 4 (review & confirm)
// - Dashboard profile (editable)
// - Find-a-sitter form (owner intake)

export const ANIMAL_TIERS_SITTER = [
  {
    label: "Tier 1 — Small & Companion Animals",
    animals: ["Cats", "Chickens", "Ducks", "Rabbits", "Fish", "Caged Pets", "Lizards / Reptiles"],
  },
  {
    label: "Tier 2 — Herd & Flock Animals",
    animals: ["Goats", "Sheep", "Llamas", "Alpacas", "Turkeys", "Exotic Birds"],
  },
  {
    label: "Tier 3 — Stalled & Equine",
    animals: ["Horses", "Donkeys", "Mini Horses", "Stalled Livestock"],
  },
  {
    label: "Tier 4 — Specialized Care",
    animals: ["Dairy / Milking Animals", "Animals on Medication", "Rehab or Injured Animals", "Other Specialty Care"],
  },
  {
    label: "Standalone Services",
    animals: ["Dogs", "Plants / Garden Care"],
  },
];

export const ALL_ANIMALS = ANIMAL_TIERS_SITTER.flatMap((t) => t.animals);

export const ANIMALS_STORAGE_KEY = "tfs_sitter_animals";
