import type { z } from 'zod';
import type {
  activityEventSchema,
  adminAnalyticsSchema,
  adminBookingSchema,
  adminDisputeSchema,
  adminNotificationSchema,
  adminOverviewSchema,
  adminPaymentSchema,
  adminProfessionalSchema,
  adminReportSchema,
  adminServiceSchema,
  adminUserSchema,
  communicationSummarySchema,
  healthCheckSchema,
  securityEventSchema,
  serviceHealthSchema,
} from '@/schemas/admin';

export type ActivityEvent = z.infer<typeof activityEventSchema>;
export type AdminAnalytics = z.infer<typeof adminAnalyticsSchema>;
export type AdminBooking = z.infer<typeof adminBookingSchema>;
export type AdminDispute = z.infer<typeof adminDisputeSchema>;
export type AdminNotification = z.infer<typeof adminNotificationSchema>;
export type AdminOverview = z.infer<typeof adminOverviewSchema>;
export type AdminPayment = z.infer<typeof adminPaymentSchema>;
export type AdminProfessional = z.infer<typeof adminProfessionalSchema>;
export type AdminReport = z.infer<typeof adminReportSchema>;
export type AdminService = z.infer<typeof adminServiceSchema>;
export type AdminUser = z.infer<typeof adminUserSchema>;
export type CommunicationSummary = z.infer<typeof communicationSummarySchema>;
export type HealthStatus = z.infer<typeof healthCheckSchema>;
export type SecurityEvent = z.infer<typeof securityEventSchema>;
export type ServiceHealth = z.infer<typeof serviceHealthSchema>;

export type AdminUserStatus = AdminUser['status'];
export type AdminProfessionalStatus = AdminProfessional['status'];
export type AdminDisputeStatus = AdminDispute['status'];
export type AdminDisputePriority = AdminDispute['priority'];
export type AdminBookingStatus = AdminBooking['status'];
export type AdminPaymentStatus = AdminPayment['status'];
export type AdminPaymentEscrowStatus = AdminPayment['escrowStatus'];
export type AdminServiceStatus = AdminService['status'];
export type AdminNotificationStatus = AdminNotification['status'];
export type AdminNotificationChannel = AdminNotification['channel'];
export type AdminReportFormat = AdminReport['format'];
export type CommunicationSummaryChannel = CommunicationSummary['channel'];
export type CommunicationSummaryStatus = CommunicationSummary['status'];
