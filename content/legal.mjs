// Privacy Policy & Terms of Use (text unchanged from Release 2.0). Effective February 2026.
// Block types: p (paragraph), h (sub-heading), ul (list), strong (emphasized line), mail (line ending in legal@ link).
const p = t => ['p', t], h = t => ['h', t], ul = (...i) => ['ul', i], strong = t => ['strong', t], mail = t => ['mail', t];

export const EFFECTIVE = 'February 2026';
export const LEGAL = [
  { id: 'privacy', title: 'Privacy Policy', sections: [
    ['Introduction', [p('CyberActive AI ("CyberActive AI," "CyberActive," "we," "us," or "our") respects your privacy. This Privacy Policy describes how we collect, use, and protect information through this website.')]],
    ['Information We Collect', [h('Information You Provide'), ul('Name', 'Company name', 'Title', 'Email address', 'Phone number', 'Industry', 'Inquiry details'), h('Automatically Collected Information'), ul('IP address', 'Device/browser type', 'Pages visited', 'Time spent on pages', 'Referral source'), p('We use cookies and similar technologies for analytics and security.')]],
    ['How We Use Information', [p('We use information to:'), ul('Respond to inquiries', 'Provide requested materials', 'Schedule briefings or demonstrations', 'Improve website functionality', 'Maintain system security', 'Comply with legal obligations'), strong('We do not sell personal information.')]],
    ['Data Sharing', [p('We may share information with:'), ul('Service providers (hosting, analytics, CRM)', 'Legal or compliance advisors', 'Authorities if required by law', 'In connection with corporate transactions'), p('All service providers are required to protect data appropriately.')]],
    ['Data Retention', [p('We retain information only as long as necessary to fulfill the purposes described above or comply with legal requirements.')]],
    ['Security', [p('We implement reasonable administrative, technical, and physical safeguards to protect submitted information. However, no internet transmission is guaranteed to be completely secure.')]],
    ['International Visitors', [p('If you access the Site from outside the United States, your information may be transferred to and processed in the United States.')]],
    ['Your Rights', [p('Depending on applicable law, you may have the right to:'), ul('Access your information', 'Correct inaccuracies', 'Request deletion', 'Opt out of communications'), mail('To exercise rights, contact:')]],
    ['Updates', [p('We may update this Privacy Policy periodically. Changes will be posted with a revised effective date.')]],
    ['Contact', [mail('')]]
  ] },
  { id: 'terms', title: 'Terms of Use', sections: [
    ['Acceptance of Terms', [p('These Terms of Use ("Terms") govern your access to and use of the CyberActive AI website at cyberactive.ai (the "Site"), operated by CyberActive AI ("CyberActive AI," "CyberActive," "Company," "we," "us," or "our").'), p('By accessing or using this Site, you agree to these Terms. If you do not agree, you must not use this Site.')]],
    ['Permitted Use', [p('You may use this Site for lawful business purposes only. You may not:'), ul('Attempt unauthorized access to any systems', 'Interfere with Site security or functionality', 'Use the Site to transmit malicious code', 'Scrape, harvest, or misuse Site content', 'Reverse engineer or replicate proprietary materials')]],
    ['Intellectual Property', [p('All content on this Site, including text, graphics, logos, trademarks, layout, and design elements, is the property of CyberActive AI or its licensors and is protected by intellectual property laws.'), p('No license is granted except for limited personal, non-commercial viewing. Use of the CyberActive AI and CyberActive names, logos, or trademarks without written permission is prohibited.')]],
    ['No Security Guarantee', [p('This Site is informational in nature. Nothing on this Site constitutes a guarantee of security outcomes, performance results, or protection from cyber incidents. Security effectiveness depends on multiple environmental and operational factors.')]],
    ['Forward-Looking Statements', [p('The Site may contain statements regarding future plans, expectations, or strategic direction. Such statements are forward-looking and involve risks and uncertainties. Actual results may differ materially.')]],
    ['Disclaimer of Warranties', [p('This Site is provided "as is" and "as available." To the maximum extent permitted by law, CyberActive disclaims all warranties, express or implied, including:'), ul('Merchantability', 'Fitness for a particular purpose', 'Non-infringement', 'Accuracy or completeness of information')]],
    ['Limitation of Liability', [p('To the maximum extent permitted by law, CyberActive shall not be liable for indirect, incidental, special, consequential, or punitive damages, loss of profits, loss of data, or business interruption arising from or related to your use of this Site.')]],
    ['Indemnification', [p('You agree to indemnify and hold harmless CyberActive from claims arising out of your misuse of the Site, your violation of these Terms, or your violation of applicable laws.')]],
    ['Governing Law', [p('These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in Delaware courts unless otherwise required by law.')]],
    ['Modifications', [p('CyberActive may update these Terms at any time. Continued use of the Site constitutes acceptance of updated Terms.')]],
    ['Contact', [mail('')]]
  ] }
];
