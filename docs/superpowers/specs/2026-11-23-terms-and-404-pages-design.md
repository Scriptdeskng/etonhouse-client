# Terms & Conditions and 404 Pages

## Goal

Add a public Terms & Conditions page using the supplied Eton House legal copy, connect it to the standard and registry checkout acceptance controls and the site footer, and add a branded 404 page.

## Design

- Add a Pages Router route at `/terms-and-conditions`.
- Reuse the existing `Navbar`, `Entrance`, `Footer`, Inter typography, and Eton House color tokens.
- Use a responsive legal-document layout with a light page background, a prominent title/effective date, numbered section headings, readable body copy, bullets, and a customer acknowledgement block.
- Update both checkout flows so the Terms & Conditions text links to `/terms-and-conditions` while preserving required checkbox validation.
- Update the footer Terms & Conditions link to `/terms-and-conditions`.
- Add `src/pages/404.tsx` with a branded not-found state and links to Home and Shop, plus the shared navbar/footer.

## Content

The Terms page will use the supplied November 2026 terms verbatim, including sections 1–15 and the Customer Acknowledgement.

## Validation

- Run the production build.
- Confirm the new routes compile and the changed checkout/footer components have no TypeScript errors.
- Confirm the Terms link is keyboard-accessible and the checkbox remains required in both checkout flows.
