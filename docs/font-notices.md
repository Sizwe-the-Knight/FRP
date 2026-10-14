# Self-hosted typography

Updated 14 October 2026. The three existing font families are served locally from pinned Fontsource 5.3.0 packages, using unmodified WOFF2 files. No Google Fonts stylesheet or font-file service is used by the working website.

| Family / package | Bundled variant | Licence and copyright |
| --- | --- | --- |
| UnifrakturCook / `@fontsource/unifrakturcook` | Latin, normal, 700 | [Original OFL notice](../public/third-party-notices/UnifrakturCook-OFL.txt) |
| Bricolage Grotesque / `@fontsource-variable/bricolage-grotesque` | Latin, normal, variable weight/optical size/width | [Original OFL notice](../public/third-party-notices/Bricolage-Grotesque-OFL.txt) |
| DM Sans / `@fontsource-variable/dm-sans` | Latin, normal, variable weight | [Original OFL notice](../public/third-party-notices/DM-Sans-OFL.txt) |

All three are licensed under SIL Open Font License 1.1. Complete upstream licence and copyright notices are copied unchanged from the packages and included in the static output. Fontsource package metadata identifies the upstream Google Fonts collection; this does not cause runtime Google requests. Sources: [UnifrakturCook](https://fontsource.org/fonts/unifrakturcook), [Bricolage Grotesque](https://fontsource.org/fonts/bricolage-grotesque), [DM Sans](https://fontsource.org/fonts/dm-sans).

Existing CSS uses UnifrakturCook 700, Bricolage Grotesque 400–800 and DM Sans 400–700. Variable files cover those weights without separate downloads for each. Bricolage retains the original optical-size axis; DM Sans retains the original default optical size. Italic decorative text uses the existing Georgia fallback. Only three normal Latin WOFF2 files enter the build; unused package subsets and italics do not. Additional language coverage would require an explicit future subset addition.

Original family names, sizes, spacing, colours, artwork and animations remain unchanged. The archived reference CSS retains its original imports for provenance and is not deployed.

Before launch, configure the approved direct contact route in [community configuration](../src/config/community.ts). Until then, Privacy and Terms explicitly disclose that it is unavailable. No operator identity, legal entity, address or jurisdiction has been invented. Hosting and wider asset/repository licensing decisions remain outside this limited font-and-policy task.
