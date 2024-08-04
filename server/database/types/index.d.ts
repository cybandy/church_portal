import * as schema from '../../database/schema'

export type User = typeof schema.members.$inferSelect

export type SSGroup = typeof schema.ss_group.$inferSelect

export type Role = typeof schema.roleEnum.enumValues