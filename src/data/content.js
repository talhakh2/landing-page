export const NAV = [
  { id: 'services', label: 'Services' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'process', label: 'Process' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export const PROFILE = {
  first: 'Abdullah',
  last: 'Farooq',
  eyebrow: 'Battery Service Engineer — Jeddah',
  headline: ['Industrial', 'batteries,', 'kept alive.'],
  role:
    'Inspection, sizing, charger configuration and commissioning for forklift and heavy-duty traction batteries.',
  email: 'abd.kh31135@gmail.com',
  phone: '+966538591812',
  phoneLabel: '+966 53 859 1812',
  linkedin: 'https://www.linkedin.com/in/abdullah-farooq-466b0531b/',
  linkedinLabel: '/in/abdullah-farooq-466b0531b',
  location: 'Jeddah, Saudi Arabia',
  availability: 'Available across the Kingdom',
};

/* Hero strip. Scope, not credentials — nothing here claims a rating. */
export const FACTS = [
  { key: 'Covers', value: 'Traction packs & chargers' },
  { key: 'Machines', value: 'Forklifts, heavy-duty plant' },
  { key: 'Work', value: 'Site & workshop' },
  { key: 'Based in', value: 'Jeddah, Saudi Arabia' },
];

export const SERVICES = [
  {
    n: '01',
    title: 'Battery inspection',
    body: 'Cell-by-cell health check — voltage, electrolyte, terminals and links. You get a written report with what is failing and what it will cost to ignore.',
  },
  {
    n: '02',
    title: 'Sizing & selection',
    body: 'Pack specified against the duty the machine actually runs, not the catalogue number. Shift length, charge window and tray dimensions all decide the answer.',
  },
  {
    n: '03',
    title: 'Charger configuration',
    body: 'Charger matched and set to the pack: output, curve and cut-off. A mismatched charger quietly destroys a battery over months.',
  },
  {
    n: '04',
    title: 'Diagnosis & repair',
    body: 'Fault-finding across packs, rectifiers and charger control boards — down to the component where that is the economical fix.',
  },
  {
    n: '05',
    title: 'Installation & handover',
    body: 'Pack landed, leads and connector terminated, system commissioned, and the operators shown how to run it properly.',
  },
  {
    n: '06',
    title: 'Preventive maintenance',
    body: 'Scheduled visits with a maintained service history, so failures are caught while they are still cheap.',
  },
];

export const PROCESS = [
  { n: '01', title: 'Site visit', body: 'I come to the machine, in service conditions, and see how it is actually used.' },
  { n: '02', title: 'Test & report', body: 'Measurements on every cell and on the charger, written up plainly.' },
  { n: '03', title: 'Fix or specify', body: 'Repair what is economical; specify a correctly sized replacement where it is not.' },
  { n: '04', title: 'Commission', body: 'Set up, verified under load, handed over with the records.' },
];

export const ABOUT = {
  lede: 'Batteries rarely fail suddenly. They are usually mis-sized, mis-charged or unmonitored for months first.',
  body:
    'I am an electrical engineer working on industrial battery systems in Jeddah — inspection, sizing, charger configuration and commissioning for forklifts and heavy-duty machinery. Before batteries I worked in high-voltage testing and commissioning, which is where the method came from: measure everything, write it down, and never assume the drawing matches the panel.',
};

export const CREDENTIALS = [
  { title: 'Bachelor of Electrical Engineering', issuer: 'COMSATS University Islamabad', kind: 'Degree' },
  { title: 'Battery Maintenance', issuer: 'CPD-verified certification', kind: 'Certified' },
  { title: 'Medium Voltage Switchgear', issuer: 'Manufacturer training institute', kind: 'Certified' },
  { title: 'Electrical Incident Investigation', issuer: 'OSHA (Oregon)', kind: 'Safety' },
  { title: 'Professional Engineering Registration', issuer: 'Pakistan Engineering Council', kind: 'Registered' },
];

export const LANGUAGES = [
  ['English', 'Professional'],
  ['Urdu', 'Native'],
  ['Arabic', 'Basic'],
];

/* Reference photography. These are licensed third-party images of the
   equipment classes this work covers — not photographs of Abdullah's own
   sites. Swap any entry's `src`/`credit` when real site photos are available. */
export const WORK = [
  {
    id: 'lfp-forklift',
    feature: true,
    title: 'Traction pack, forklift',
    note: 'Main leads and connector landed on the tray; pack ready for drop-in.',
    tag: 'Battery',
    credit: { author: 'Newone', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', page: 'https://commons.wikimedia.org/wiki/File:Newone_-_PKG_LFP_battery_for_forklift_03.jpg', modified: 'cropped' },
  },
  {
    id: 'cells-damaged',
    title: 'Corroded terminals',
    note: 'Sulphation and creep across the links — what a routine inspection is looking for.',
    tag: 'Inspection',
    credit: { author: 'FalkorD', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', page: 'https://commons.wikimedia.org/wiki/File:Damaged_Traction_battery.jpg' },
  },
  {
    id: 'charger-board',
    title: 'Charger control board',
    note: 'Rectifier control stage — where charge-curve and fault behaviour are traced.',
    tag: 'Charger',
    credit: { author: 'Hannes Grobe', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', page: 'https://commons.wikimedia.org/wiki/File:Still-ladegeraet-24V-1_hg_06.jpg' },
  },
  {
    id: 'charger-unit',
    title: 'Charger on the floor',
    note: 'Unit sited next to the truck it serves, ready for configuration and handover.',
    tag: 'Install',
    credit: { author: 'P1898', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0', page: 'https://commons.wikimedia.org/wiki/File:Anhui_Heli_2026-08-11_Forklift_Intelligent_lithium-ion_charger_02.jpg' },
  },
  {
    id: 'gis-switchgear',
    title: 'Gas-insulated switchgear',
    note: 'GIS hall of the type tested for open/close function from the local control cabinet.',
    tag: 'HV',
    credit: { author: 'Geoprofi', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0', page: 'https://commons.wikimedia.org/wiki/File:SF6SchaltSt.JPG' },
  },
  {
    id: 'substation',
    title: 'SF6 busbar runs',
    note: 'Outdoor busbar and bushings on a substation of the class commissioned in Jeddah.',
    tag: 'Substation',
    credit: { author: 'Kreuzschnabel', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', page: 'https://commons.wikimedia.org/wiki/File:2015_SF6-Leitungen_Leingarten_03_ks01.jpg' },
  },
];

export const WORK_STRIP = {
  id: 'charger-plate',
  title: 'Rating plate — 24 V / 35 A',
  note: 'Output DC, battery capacity window and cell chemistry: the three numbers that decide whether a charger and a pack belong together.',
  tag: 'Sizing',
  credit: { author: 'Hannes Grobe', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', page: 'https://commons.wikimedia.org/wiki/File:Still-ladegeraet-24V-1_hg_08.jpg' },
};
