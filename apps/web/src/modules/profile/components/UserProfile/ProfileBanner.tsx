import { Box, Divider, Group, Stack } from '@mantine/core'
import React, { Suspense } from 'react'
import classes from './index.module.css'
import { User } from '@/payload-types'
import { EditProfileDrawer } from '../EditProfileDrawer'
import EditProfileForm from '../EditProfileForm'
import { UsernameField } from '../EditProfileForm/UsernameField'
import { NextIntlClientProvider } from 'next-intl'
import pick from 'lodash.pick'
import { LevelField } from '../EditProfileForm/LevelField'
import { RenderIfSelf } from '@/modules/auth/components/RenderIfSelf'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { getLanguages } from '@/modules/common/data'
import { NativeLanguageField } from '../EditProfileForm/NativeLanguageField'
import { OtherLanguagesField } from '../EditProfileForm/OtherLanguagesField'
import { LeadershipField } from '../EditProfileForm/LeadershipField'
import { WeaponsField } from '../EditProfileForm/WeaponsField'
import { getWeapons } from '@/modules/weapons/data'
import { Locale } from '@/locales'

export const ProfileBanner = async ({ user }: { user: User }) => {
  const tProfile = await getTranslations('profile')
  const tActions = await getTranslations('common.actions')
  const messages = await getMessages()
  const languages = await getLanguages()
  const locale = (await getLocale()) as Locale
  const weapons = await getWeapons(locale)

  return (
    <Box className={classes.banner}>
      <Suspense fallback={<></>}>
        <RenderIfSelf userId={user.id}>
          <Group justify="flex-end" p="sm">
            <NextIntlClientProvider messages={pick(messages, ['validation', 'common'])}>
              <EditProfileForm user={user}>
                <EditProfileDrawer user={user}>
                  <Stack>
                    <UsernameField
                      label={tProfile('username.label')}
                      placeholder={tProfile('username.placeholder')}
                      description={tProfile('username.description')}
                    />
                    <LevelField
                      label="Level"
                      placeholder="2000"
                      description="Your in-game character's total level"
                    />
                    <NativeLanguageField
                      languages={languages}
                      label={tProfile('language.nativeLanguage.label')}
                      placeholder={tProfile('language.nativeLanguage.placeholder')}
                      notFound={tProfile('language.noLanguageFound')}
                    />
                    <OtherLanguagesField
                      languages={languages}
                      label={tProfile('language.otherLanguages.label')}
                      placeholder={tProfile('language.otherLanguages.placeholder')}
                      notFound={tProfile('language.noLanguageFound')}
                    />
                    <LeadershipField
                      label={tProfile('leadership.label')}
                      description={tProfile('leadership.description')}
                      light={tProfile('leadership.light')}
                      medium={tProfile('leadership.medium')}
                      heavy={tProfile('leadership.heavy')}
                    />
                    <Divider />
                    <WeaponsField
                      weapons={weapons}
                      label={tProfile('weapons.label')}
                      addWeapon={tProfile('weapons.addWeapon')}
                      leadershipLabel={tProfile('leadership.label')}
                      leadershipDescription={tProfile('weapons.leadershipDescription')}
                      leadershipTip={tProfile('weapons.leadershipTip')}
                      confirm={tActions('confirm')}
                      primaryWeapon={tProfile('weapons.primary')}
                    />
                  </Stack>
                </EditProfileDrawer>
              </EditProfileForm>
            </NextIntlClientProvider>
          </Group>
        </RenderIfSelf>
      </Suspense>
    </Box>
  )
}
