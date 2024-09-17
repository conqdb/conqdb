import { CollectionBeforeValidateHook } from 'payload'

export const syncDiscordFields: CollectionBeforeValidateHook = async ({
  operation,
  data,
  originalDoc,
}) => {
  if (
    data &&
    (operation === 'update' || operation === 'create') &&
    data?.metadata !== originalDoc?.metadata
  ) {
    const hasDiscordDiscriminator = data?.metadata?.discriminator !== '0'

    if (
      hasDiscordDiscriminator &&
      data?.discordUsername !== `${data?.metadata?.username}#${data?.metadata?.discriminator}`
    ) {
      data.discordUsername = `${data.metadata.username}#${data.metadata.discriminator}`
    }

    if (!hasDiscordDiscriminator && data?.discordUsername !== data?.metadata?.username) {
      data.discordUsername = data.metadata.username
    }

    if (
      data?.avatar !==
        `https://cdn.discordapp.com/avatars/${data?.metadata?.id}/${data?.metadata?.avatar}` &&
      data?.metadata?.avatar
    ) {
      data.avatar = `https://cdn.discordapp.com/avatars/${data?.metadata?.id}/${data?.metadata?.avatar}`
    }

    return data
  }
}
