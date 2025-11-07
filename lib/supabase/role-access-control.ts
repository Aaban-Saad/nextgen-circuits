import { UserProfile } from './use-auth'

export const hasRole = (profile: UserProfile | null, roles: string[]) => {
  if (!profile) return false
  return roles.includes(profile.role)
}

export const isAdmin = (profile: UserProfile | null) => {
  return hasRole(profile, ['admin'])
}

export const isModerator = (profile: UserProfile | null) => {
  return hasRole(profile, ['moderator'])
}