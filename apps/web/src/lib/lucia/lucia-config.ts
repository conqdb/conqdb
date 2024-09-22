import {
  Lucia,
  RegisteredDatabaseSessionAttributes,
  RegisteredDatabaseUserAttributes,
  SessionCookieOptions,
  TimeSpan,
} from 'lucia'

export const getUserAttributes = (attributes: RegisteredDatabaseUserAttributes) => {
  return {
    collection: 'user',
    discordId: attributes.discordId,
    discordUsername: attributes?.discordUsername,
    avatar: attributes?.avatar,
    raid: attributes?.raid,
    roles: attributes.roles,
    editLanguages: attributes.editLanguages,
    username: attributes.username,
    slug: attributes.slug,
    level: attributes.level,
    nativeLanguage: attributes.nativeLanguage,
    otherLanguages: attributes.otherLanguages,
    lightLeadership: attributes.lightLeadership,
    mediumLeadership: attributes.mediumLeadership,
    heavyLeadership: attributes.heavyLeadership,
    weapons: attributes.weapons,
  }
}

export const sessionCookie: SessionCookieOptions = {
  expires: false,
  attributes: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const luciaConfig: {
  sessionExpiresIn?: TimeSpan
  sessionCookie?: SessionCookieOptions
  getSessionAttributes?: (
    databaseSessionAttributes: RegisteredDatabaseSessionAttributes,
  ) => Lucia['getSessionAttributes']
  getUserAttributes?: (
    databaseUserAttributes: RegisteredDatabaseUserAttributes,
  ) => Lucia['getUserAttributes']
} = {
  sessionCookie,
  getUserAttributes,
}
