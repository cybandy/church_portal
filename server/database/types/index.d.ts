import * as schema from '../../database/schema'

export type Member = Omit<typeof schema.members.$inferSelect, 'password_hash'>
export type NewMember = typeof schema.members.$inferInsert

export type SSGroup = typeof schema.ss_group.$inferSelect

export type Role = typeof schema.roleEnum.enumValues