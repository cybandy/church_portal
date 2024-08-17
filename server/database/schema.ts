// schema.ts
import { pgEnum, pgTable, serial, text, varchar, timestamp, integer, date, time, boolean, customType, index } from "drizzle-orm/pg-core";
import { relations, sql, SQL } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const tsVector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});


export const roleEnum = pgEnum('role', ['member', 'sabbath_school_leader', 'pastor', 'secretary', 'elder', 'deacon', 'chorister', 'communication_department', 'admin'])

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
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  password_hash: varchar('password_hash'),
  email: text("email").unique().notNull(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  address: varchar("address"),
  avatar_url: varchar("avatar_url"),
  tel: varchar("tel", { length: 20 }),
  roles: roleEnum('roles').array(),
  ss_group_id: integer('ss_group_id')
});

export const membersRelations = relations(members, ({ one, many }) => ({
  ss_group: one(ss_group, {
    fields: [members.ss_group_id],
    references: [ss_group.id]
  }),
  attendance: many(attendance),
  eventOfficials: one(eventOfficials)
}))

const insertMemberSchema = createInsertSchema(members, {
  email: (schema) => schema.email.email(),
  
})


export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  datetime: timestamp('datetime', { withTimezone: true }),
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

export const eventOfficials = pgTable('event_officials', {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  title: varchar('title'),
  rank: integer('rank'),
  member_id: integer('member_id').references(()=>members.id),
  event_id: integer('event_id')
})

export const eventOfficialsRelations = relations(eventOfficials, ({ one, many }) => ({
  events: one(events, {
    fields: [eventOfficials.event_id],
    references: [events.id]
  })
}))

export const events = pgTable('events', {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  // date: timestamp('date', { withTimezone: true }),
  date: date('date', { mode: 'string' }),
  from: time('from', { withTimezone: true }),
  to: time('to', { withTimezone: true }),
  event_type: eventEnum('event_type').$default(() => 'church'),
  location: varchar('location', { length: 256 }),

})

export const eventRelations = relations(events, ({ many }) => ({
  attendees: many(attendance),
  officials: many(eventOfficials)
}))

export const stanza = pgTable('stanza', {
  id: serial("id").primaryKey(),
  number: integer('number'),
  verse: varchar('verse'),
  hymn_id: integer('hymn_id'),
  is_refrain: boolean('is_refrain').default(false)
})

export const stanzaRelations = relations(stanza, ({ one }) => ({
  hymn: one(hymn, {
    fields: [stanza.hymn_id],
    references: [hymn.id]
  })
}))

export const insertStanzaSchema = createInsertSchema(stanza)

export const hymnLanguagesEnum = pgEnum('hymnLanguagesEnum', [
  'twi', 'en-US', 'fr-FR', 'it-IT', 'de-DE'
])

export const hymn = pgTable('hymn', {
  id: serial("id").primaryKey(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  number: varchar('number', { length: 10 }),
  language: hymnLanguagesEnum('language'),
  author: varchar('author'),
  mp3: varchar('mp3'),
  title: varchar('title'),
  hymnSearch: tsVector("hymnSearch", {
    dimensions:3,
  }).generatedAlwaysAs(
    (): SQL =>sql`to_tsvector('english', COALESCE(${hymn.number}, '') || ' ' || COALESCE(${hymn.title}, '') || ' ' || COALESCE(${hymn.author}, ''))`
  )
}, (t) => ({
  idx: index('idx_hymn_search').using("gin", t.hymnSearch)
})
)

export const insertSchemaHymn = createInsertSchema(hymn)
export const selectSchemaHymn = createSelectSchema(hymn)


export const hymnRelations = relations(hymn, ({ many }) => ({
  stanzas: many(stanza)
}))