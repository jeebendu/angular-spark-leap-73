
# Public Components

This directory contains components used in the public-facing parts of the application.

## Directory Structure

- **shared/**: Components shared across multiple public routes
  - `Navbar.tsx`: Main navigation bar
  - `Footer.tsx`: Site footer
  - `AllSpecializationsModal.tsx`: Modal for displaying all specializations

- **home/**: Components specific to the home page
  - `AppDownloadSection.tsx`: Section promoting the mobile app

- **doctor/search/**: Components for doctor search functionality
  - `SearchBar.tsx`: Search bar for finding doctors

- **appointments/**: Components for appointment related pages

## Usage Guidelines

When creating new components:
1. Place them in the appropriate subdirectory based on where they're used
2. If used across multiple pages, place in the shared directory
3. Keep components focused and small for better maintainability
