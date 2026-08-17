// Spanish profanity and slurs, in normalised form (lowercase, no accents). `obscenity`
// only ships an English dataset, and half of this site's reviews arrive in Spanish.
// Matching is substring-based against a normalised copy of the comment, so inflections
// ("puta", "putas", "putazo") are covered by the stem.
export const PROFANITY_ES = [
  'puta', 'puto', 'mierd', 'coño', 'joder', 'jodid', 'pendejo', 'pendeja',
  'cabron', 'cabrona', 'gilipoll', 'imbecil', 'idiota', 'maricon', 'marica',
  'verga', 'chinga', 'culero', 'zorra', 'perra', 'pinche', 'carajo', 'polla', 'follar',
  'malparid', 'hijueput', 'huevon', 'boludo', 'pelotudo', 'concha tu'
];
