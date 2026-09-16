export type DoctrinalStatus =
  | "affirmed"
  | "bounded-inference"
  | "open"
  | "descriptive-only";

export type EvidenceStatus =
  | "direct"
  | "strong"
  | "plausible"
  | "contested"
  | "speculative";

export type ClaimDomain =
  | "biblical-text"
  | "history"
  | "language"
  | "doctrine"
  | "interpretation"
  | "ethics"
  | "reception-history";

export type InterpretationType =
  | "historical-critical"
  | "traditional"
  | "theological"
  | "canonical"
  | "feminist"
  | "queer"
  | "liberation"
  | "literary"
  | "reception-history";

export interface SourceRef {
  id: string;
}

export interface Claim {
  id: string;
  proposition: string;
  domain: ClaimDomain;
  doctrinalStatus: DoctrinalStatus;
  evidenceStatus: EvidenceStatus;
  authorityRefs: string[];
  sourceRefs: string[];
  scriptureRefs: string[];
  supports?: string[];
  challenges?: string[];
  qualifies?: string[];
  traditions?: string[];
  reviewedAt?: string;
}

export interface Interpretation {
  id: string;
  label: string;
  passageRefs: string[];
  conceptRefs: string[];
  type: InterpretationType;
  proposition: string;
  evidenceStatus: EvidenceStatus;
  doctrinalStatus: DoctrinalStatus;
  sourceRefs: string[];
  heldBy?: string[];
  agreesWith?: string[];
  differsFrom?: string[];
}

export interface StatementArticle {
  id: string;
  number: number;
  title: string;
  text: string;
  affirmedClaims: string[];
  boundedInferences: string[];
  openQuestions: string[];
  interpretiveRules: string[];
}

export interface TraditionPosition {
  doctrineRef: string;
  claimRef: string;
  authority: "official" | "historical" | "common" | "varied";
  sourceRefs: string[];
}

export interface Tradition {
  id: string;
  name: string;
  family: "catholic" | "orthodox" | "protestant" | "restoration" | "other";
  officialSourceRefs: string[];
  positions: TraditionPosition[];
}

export interface Lexeme {
  id: string;
  language: "grc" | "hbo" | string;
  lemma: string;
  glosses: string[];
  occurrenceRefs: string[];
  semanticClaimRefs: string[];
  disputedMeaning: boolean;
  sourceRefs: string[];
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  conceptRefs: string[];
  doctrineRefs: string[];
  scriptureRefs: string[];
  claimRefs: string[];
  sourceRefs: string[];
  relatedTopicRefs: string[];
  curriculumRefs: string[];
  searchAliases: string[];
}

export interface LearnerContext {
  unitId?: string;
  lessonId?: string;
  masteryActive: boolean;
  depth: "novice" | "intermediate" | "advanced";
}

export interface TheologyPolicyContext {
  question: string;
  doctrinalStatus: DoctrinalStatus;
  canonicalPosition?: string;
  statementArticleRefs: string[];
  requiredClaimRefs: string[];
  prohibitedOverstatements: string[];
  scriptureRefs: string[];
  interpretationRefs: string[];
  sourceRefs: string[];
  learnerContext?: LearnerContext;
}

export interface ValidationIssue {
  code:
    | "CONTRADICTS_STATEMENT"
    | "INVENTS_DOCTRINE"
    | "OVERSTATES_EVIDENCE"
    | "RECEPTION_AS_TEXTUAL_FACT"
    | "LEXICAL_SHORTCUT"
    | "MISATTRIBUTES_TRADITION"
    | "MISSING_CITATION"
    | "LGBTQ_DIGNITY_AS_OPEN"
    | "MASTERY_ANSWER_LEAK";
  message: string;
  severity: "error" | "warning";
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}
