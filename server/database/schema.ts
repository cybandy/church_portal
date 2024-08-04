// schema.ts
import { pgEnum, pgTable, serial, text, varchar, timestamp, integer, date, time } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum('role', ['member', 'sabbath_school_leader', 'pastor', 'secretary', 'elder', 'deacon', 'chorister'])

export const ss_group = pgTable("sabbath_school_group", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow()
})

export const ss_groupRelations = relations(ss_group, ({ many }) => ({
  members: many(members)
}))

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', {withTimezone:true}).defaultNow(),
  username: varchar("username").unique().notNull(),
  email: text("email").notNull(),
  first_name: varchar("first_name", {length:256}).notNull(),
  last_name: varchar("last_name", {length:256}).notNull(),
  address: varchar("address"),
  avatar_url: varchar("avatar_url"),
  tel: varchar("tel", { length: 20 }),
  role: roleEnum('role'),
  ss_group_id: integer('ss_group_id')
});

export const membersRelations = relations(members, ({ one, many }) => ({
  ss_group: one(ss_group, {
    fields: [members.ss_group_id],
    references: [ss_group.id]
  }),
  attendances: many(attendance)
}))

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  datetime: timestamp('datetime', {withTimezone:true}),
  member_id: integer('member_id'),
  event_id: integer('event_id')
})

export const attendanceRelations = relations(attendance, ({ one }) => ({
  member: one(members, {
    fields: [attendance.member_id],
    references: [members.id]
  }),
  event: one(events, {
    fields: [attendance.event_id],
    references: [events.id]
  })
}))

export const eventEnum = pgEnum('event_type', [
  'church', 'sabbath_school_service'
])

export const events = pgTable('events', {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  datetime: timestamp('datetime', { withTimezone: true }),
  event_type: eventEnum('event_type').$default(() => 'church'),
  location: varchar('location', {length:256}),
  
})

export const eventRelations = relations(events, ({ many }) => ({
  attendees: many(attendance)
}))