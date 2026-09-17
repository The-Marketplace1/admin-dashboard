import { z } from 'zod';

const trendPointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const healthCheckSchema = z.object({ status: z.string() });

export const adminOverviewSchema = z.object({
  activeUsers: z.number(),
  activeProfessionals: z.number(),
  liveBookings: z.number(),
  grossVolume: z.number(),
  escrowHeld: z.number(),
  openDisputes: z.number(),
  registrations: z.number(),
  bookingTrend: z.array(trendPointSchema),
});

export const activityEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
  severity: z.enum(['info', 'success', 'warning', 'critical']),
  actor: z.string().nullish(),
});

export const serviceHealthSchema = z.object({
  name: z.string(),
  status: z.enum(['operational', 'degraded', 'outage']),
  latency: z.number(),
  uptime: z.number(),
  lastChecked: z.string().optional(),
});

export const adminUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.enum(['active', 'suspended', 'pending']),
  joinedAt: z.string(),
  bookings: z.number(),
  lifetimeValue: z.number(),
  location: z.string().optional(),
});

export const adminProfessionalSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  status: z.enum(['verified', 'pending', 'rejected', 'suspended']),
  submittedAt: z.string(),
  rating: z.number(),
  bookings: z.number(),
  location: z.string().optional(),
  documentCount: z.number().optional(),
});

export const adminDisputeSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  subject: z.string(),
  customer: z.string(),
  professional: z.string(),
  status: z.enum(['open', 'investigating', 'resolved', 'escalated']),
  amount: z.number(),
  openedAt: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

export const adminBookingSchema = z.object({
  id: z.string(),
  customer: z.string(),
  professional: z.string(),
  service: z.string(),
  status: z.enum(['requested', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed']),
  amount: z.number(),
  updatedAt: z.string(),
});

export const adminPaymentSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  customer: z.string(),
  amount: z.number(),
  status: z.enum(['succeeded', 'pending', 'failed', 'refunded']),
  escrowStatus: z.enum(['held', 'released', 'refunded', 'not_applicable']),
  createdAt: z.string(),
});

export const adminServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  professional: z.string(),
  category: z.string(),
  status: z.enum(['published', 'under_review', 'removed', 'draft']),
  reports: z.number(),
  updatedAt: z.string(),
});

export const adminNotificationSchema = z.object({
  id: z.string(),
  channel: z.enum(['push', 'email', 'sms']),
  recipient: z.string(),
  template: z.string(),
  status: z.enum(['delivered', 'queued', 'failed']),
  createdAt: z.string(),
});

export const adminReportSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  format: z.enum(['csv', 'pdf', 'json']),
  lastGenerated: z.string(),
});

export const securityEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  actor: z.string(),
  location: z.string(),
  timestamp: z.string(),
  severity: z.enum(['info', 'warning', 'critical']),
});

export const adminAnalyticsSchema = z.object({
  revenue: z.array(trendPointSchema),
  customerGrowth: z.array(trendPointSchema),
  professionalGrowth: z.array(trendPointSchema),
  serviceDemand: z.array(trendPointSchema),
  conversionRate: z.number(),
});

export const communicationSummarySchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  channel: z.enum(['chat', 'call']),
  status: z.enum(['active', 'ended', 'reported']),
  durationSeconds: z.number(),
  reported: z.boolean(),
  updatedAt: z.string(),
});

export const suspensionInputSchema = z.object({ reason: z.string().min(1) });
export const verificationInputSchema = z.object({
  decision: z.enum(['approve', 'reject']),
  note: z.string().optional(),
});
export const disputeResolutionInputSchema = z.object({
  decision: z.enum(['customer_favor', 'professional_favor', 'partial_refund']),
  note: z.string().optional(),
});
