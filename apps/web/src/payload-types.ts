/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    user: UserAuthOperations;
  };
  collections: {
    language: Language;
    media: Media;
    raid: Raid;
    'raid-invite': RaidInvite;
    'raid-member': RaidMember;
    'raid-settings': RaidSetting;
    server: Server;
    session: Session;
    unit: Unit;
    'unit-type': UnitType;
    'unit-era': UnitEra;
    'unit-category': UnitCategory;
    'unit-tag': UnitTag;
    user: User;
    'user-unit': UserUnit;
    weapon: Weapon;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    't-common': TCommon;
    't-auth': TAuth;
    't-navigation': TNavigation;
    't-profile': TProfile;
    't-validation': TValidation;
  };
  locale: 'ar' | 'cz' | 'de' | 'en' | 'pl' | 'ru' | 'tr';
  user: User & {
    collection: 'user';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "language".
 */
export interface Language {
  id: string;
  name?: string | null;
  languageCode: string;
  countryCode?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  blurHash?: string | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    blur?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "raid".
 */
export interface Raid {
  id: string;
  name?: string | null;
  owner: string | User;
  server?: (string | null) | Server;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "user".
 */
export interface User {
  id: string;
  username?: string | null;
  level?: number | null;
  nativeLanguage?: (string | null) | Language;
  otherLanguages?: (string | Language)[] | null;
  lightLeadership?: number | null;
  mediumLeadership?: number | null;
  heavyLeadership?: number | null;
  weapons?:
    | {
        weapon?: (string | null) | Weapon;
        leadership?: number | null;
        id?: string | null;
      }[]
    | null;
  slug?: string | null;
  discordId: string;
  discordUsername?: string | null;
  avatar?: string | null;
  raid?: (string | null) | Raid;
  roles?: ('banned' | 'user' | 'member' | 'translator' | 'maintainer' | 'admin')[] | null;
  metadata?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "weapon".
 */
export interface Weapon {
  id: string;
  name?: string | null;
  type?: ('light' | 'medium' | 'heavy') | null;
  icon?: (string | null) | Media;
  slug?: string | null;
  weight?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "server".
 */
export interface Server {
  id: string;
  name?: string | null;
  code?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "raid-invite".
 */
export interface RaidInvite {
  id: string;
  raid: string | Raid;
  code: string;
  conditions?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  expires?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "raid-member".
 */
export interface RaidMember {
  id: string;
  raid: string | Raid;
  user: string | User;
  role: 'leader' | 'officer' | 'member' | 'alumni' | 'banned';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "raid-settings".
 */
export interface RaidSetting {
  id: string;
  raid: string | Raid;
  owner?: (string | null) | User;
  permissions?: {
    leader?: {
      members?: {
        read?: boolean | null;
        manage?: boolean | null;
      };
    };
    officer?: {
      members?: {
        read?: boolean | null;
        manage?: boolean | null;
      };
    };
    member?: {
      members?: {
        read?: boolean | null;
        manage?: boolean | null;
      };
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "session".
 */
export interface Session {
  id: string;
  user: string | User;
  expiresAt: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "unit".
 */
export interface Unit {
  id: string;
  name: string;
  tags?: (string | UnitTag)[] | null;
  leadership: number;
  leadershipDoc?: number | null;
  stars: number;
  maxLevel: number;
  type: string | UnitType;
  category: string | UnitCategory;
  era: string | UnitEra;
  image?: (string | null) | Media;
  imageSettings: {
    x: number;
    y: number;
    scale: number;
  };
  mastery?: {
    hasMastery?: boolean | null;
    nodes?:
      | {
          title?: string | null;
          description?: string | null;
          id?: string | null;
        }[]
      | null;
  };
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "unit-tag".
 */
export interface UnitTag {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "unit-type".
 */
export interface UnitType {
  id: string;
  name?: string | null;
  slug?: string | null;
  weight?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "unit-category".
 */
export interface UnitCategory {
  id: string;
  name?: string | null;
  slug?: string | null;
  weight?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "unit-era".
 */
export interface UnitEra {
  id: string;
  name?: string | null;
  slug?: string | null;
  weight?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "user-unit".
 */
export interface UserUnit {
  id: string;
  user: string | User;
  unit: string | Unit;
  status: 'training' | 'ready' | 'maxed';
  favourite?: boolean | null;
  hasLeadershipDoc?: boolean | null;
  masteryNodes?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'language';
        value: string | Language;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'raid';
        value: string | Raid;
      } | null)
    | ({
        relationTo: 'raid-invite';
        value: string | RaidInvite;
      } | null)
    | ({
        relationTo: 'raid-member';
        value: string | RaidMember;
      } | null)
    | ({
        relationTo: 'raid-settings';
        value: string | RaidSetting;
      } | null)
    | ({
        relationTo: 'server';
        value: string | Server;
      } | null)
    | ({
        relationTo: 'session';
        value: string | Session;
      } | null)
    | ({
        relationTo: 'unit';
        value: string | Unit;
      } | null)
    | ({
        relationTo: 'unit-type';
        value: string | UnitType;
      } | null)
    | ({
        relationTo: 'unit-era';
        value: string | UnitEra;
      } | null)
    | ({
        relationTo: 'unit-category';
        value: string | UnitCategory;
      } | null)
    | ({
        relationTo: 'unit-tag';
        value: string | UnitTag;
      } | null)
    | ({
        relationTo: 'user';
        value: string | User;
      } | null)
    | ({
        relationTo: 'user-unit';
        value: string | UserUnit;
      } | null)
    | ({
        relationTo: 'weapon';
        value: string | Weapon;
      } | null);
  globalSlug?: string | null;
  _lastEdited: {
    user: {
      relationTo: 'user';
      value: string | User;
    };
    editedAt?: string | null;
  };
  isLocked?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'user';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "t-common".
 */
export interface TCommon {
  id: string;
  actions?: {
    save?: string | null;
    cancel?: string | null;
    confirm?: string | null;
    preview?: string | null;
    delete?: string | null;
    remove?: string | null;
    copy?: string | null;
    copied?: string | null;
  };
  responses?: {
    success?: string | null;
    error?: string | null;
    somethingWentWrong?: string | null;
    notFound?: string | null;
    nothingFound?: string | null;
    mustBeLoggedIn?: string | null;
    fieldsAreInvalid?: string | null;
  };
  warning?: {
    label?: string | null;
    unsavedChanges?: string | null;
    delete?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "t-auth".
 */
export interface TAuth {
  id: string;
  actions?: {
    signIn?: string | null;
    signOut?: string | null;
  };
  signIn?: {
    subtitle?: string | null;
    signInWithDiscord?: string | null;
    legalNotice?: string | null;
    securityConcerns?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "t-navigation".
 */
export interface TNavigation {
  id: string;
  news?: {
    label?: string | null;
  };
  units?: {
    label?: string | null;
    allUnits?: {
      label?: string | null;
      description?: string | null;
    };
    doctrines?: {
      label?: string | null;
      description?: string | null;
    };
    guides?: {
      label?: string | null;
      description?: string | null;
    };
    tierList?: {
      label?: string | null;
      description?: string | null;
    };
  };
  weapons?: {
    label?: string | null;
    allWeapons?: {
      label?: string | null;
      description?: string | null;
    };
    guides?: {
      label?: string | null;
      description?: string | null;
    };
    tierList?: {
      label?: string | null;
      description?: string | null;
    };
  };
  tools?: {
    label?: string | null;
    leadershipCalculator?: {
      label?: string | null;
      description?: string | null;
    };
    unitXpCalculator?: {
      label?: string | null;
      description?: string | null;
    };
    scrimPlanner?: {
      label?: string | null;
      description?: string | null;
    };
  };
  actions?: {
    switchLanguage?: string | null;
    toggleColorScheme?: string | null;
  };
  menu?: {
    notifications?: string | null;
    profile?: string | null;
    createProfile?: string | null;
    joinRaid?: string | null;
    createRaid?: string | null;
    dashboard?: string | null;
    translate?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "t-profile".
 */
export interface TProfile {
  id: string;
  actions?: {
    createProfile?: string | null;
    editProfile?: string | null;
    deleteProfile?: string | null;
  };
  responses?: {
    createSuccess?: string | null;
    updateSuccess?: string | null;
    unitAdded?: string | null;
    unitDeleted?: string | null;
  };
  create?: {
    title?: string | null;
    subtitle?: string | null;
  };
  username?: {
    label?: string | null;
    placeholder?: string | null;
    description?: string | null;
  };
  slug?: {
    label?: string | null;
    placeholder?: string | null;
    description?: string | null;
    slugTaken?: string | null;
  };
  language?: {
    nativeLanguage?: {
      label?: string | null;
      placeholder?: string | null;
    };
    otherLanguages?: {
      label?: string | null;
      placeholder?: string | null;
    };
    noLanguageFound?: string | null;
  };
  leadership?: {
    label?: string | null;
    description?: string | null;
    light?: string | null;
    medium?: string | null;
    heavy?: string | null;
  };
  weapons?: {
    label?: string | null;
    addWeapon?: string | null;
    leadershipDescription?: string | null;
    leadershipTip?: string | null;
  };
  raidManager?: string | null;
  exclusiveFeatures?: string | null;
  units?: {
    label?: string | null;
    dontHaveUnits?: string | null;
    addUnit?: string | null;
    addUnits?: string | null;
    hideOwned?: string | null;
    status?: string | null;
    favourite?: string | null;
    hasLeadershipDoc?: string | null;
    unlockedMasteryNodes?: string | null;
    max?: string | null;
    training?: {
      label?: string | null;
      description?: string | null;
    };
    ready?: {
      label?: string | null;
      description?: string | null;
    };
    maxed?: {
      label?: string | null;
      description?: string | null;
    };
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "t-validation".
 */
export interface TValidation {
  id: string;
  invalid?: string | null;
  required?: string | null;
  minChar?: string | null;
  maxChar?: string | null;
  minNum?: string | null;
  maxNum?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}