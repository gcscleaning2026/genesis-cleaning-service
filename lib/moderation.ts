import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import { PROFANITY_ES } from './profanity-es';

export type RawReview = { name: unknown; comment: unknown; rating: unknown; lang: unknown };
export type CleanReview = { name: string; comment: string; rating: number; lang: 'en' | 'es' };
export type RejectReason = 'name' | 'length' | 'words' | 'profanity' | 'links' | 'shouting' | 'rating';
export type ModerationResult = { ok: true; review: CleanReview } | { ok: false; reason: RejectReason };

export const LIMITS = {
  nameMin: 2,
  nameMax: 40,
  commentChars: 500,
  wordsMin: 8,
  wordsMax: 80
} as const;

// Catches leetspeak and separator tricks ("sh1t", "s h i t") that a plain word list misses.
const english = new RegExpMatcher({ ...englishDataset.build(), ...englishRecommendedTransformers });

// Links, emails and phone numbers are the entire payload of comment spam. A cleaning
// review has no reason to contain one, so they are rejected rather than stripped.
const LINK = /(https?:\/\/|www\.|\b[\w.+-]+@[\w-]+\.[a-z]{2,}\b|\b[\w-]+\.(com|net|org|io|shop|xyz|ru)\b)/i;

// Strips accents so "coño"/"cono" and "mierdá"/"mierda" hit the same list entry.
const normalise = (text: string) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function countWords(text: string) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function hasProfanity(text: string) {
  if (english.hasMatch(text)) return true;
  const flat = normalise(text);
  return PROFANITY_ES.some(word => flat.includes(normalise(word)));
}

// Any sentence can be typed in caps by accident; a whole comment in caps is either shouting
// or an ad. Measured over letters only, so punctuation and digits do not skew it.
function isShouting(text: string) {
  const letters = text.replace(/[^A-Za-zÀ-ÿ]/g, '');
  if (letters.length < 20) return false;
  const upper = letters.replace(/[^A-ZÀ-Þ]/g, '').length;
  return upper / letters.length > 0.7;
}

export function moderateReview(input: RawReview): ModerationResult {
  const lang = input.lang === 'es' ? 'es' : input.lang === 'en' ? 'en' : null;
  const rating = typeof input.rating === 'number' ? input.rating : NaN;
  if (!lang || !Number.isInteger(rating) || rating < 1 || rating > 5) return { ok: false, reason: 'rating' };

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const comment = typeof input.comment === 'string' ? input.comment.trim() : '';

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax || LINK.test(name)) {
    return { ok: false, reason: 'name' };
  }
  if (comment.length > LIMITS.commentChars) return { ok: false, reason: 'length' };

  const words = countWords(comment);
  if (words < LIMITS.wordsMin || words > LIMITS.wordsMax) return { ok: false, reason: 'words' };

  if (LINK.test(comment)) return { ok: false, reason: 'links' };
  if (hasProfanity(comment) || hasProfanity(name)) return { ok: false, reason: 'profanity' };
  if (isShouting(comment)) return { ok: false, reason: 'shouting' };

  return { ok: true, review: { name, comment, rating, lang } };
}
