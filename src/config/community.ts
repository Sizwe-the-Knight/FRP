// Owner-approved destinations only. Null keeps the corresponding link unavailable.
export const community: { repository: string | null; alternative: { label: string; url: string } | null } = {
  repository: null, // e.g. https://github.com/OWNER/REPOSITORY after publication approval
  alternative: null, // approved mailto: address or HTTPS contact page
};
if (community.repository && !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(community.repository)) throw new Error('Community repository must be an HTTPS GitHub repository URL.');
if (community.alternative && !/^(https:\/\/|mailto:)/.test(community.alternative.url)) throw new Error('Use an approved HTTPS or mailto contact.');
