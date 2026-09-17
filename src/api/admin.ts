import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { readGateway, readGatewayHealth, writeGateway } from '@/api/client';
import {
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
  activityEventSchema,
  communicationSummarySchema,
  healthCheckSchema,
  securityEventSchema,
  serviceHealthSchema,
  disputeResolutionInputSchema,
  suspensionInputSchema,
  verificationInputSchema,
} from '@/schemas/admin';
import type {
  ActivityEvent,
  AdminAnalytics,
  AdminBooking,
  AdminDispute,
  AdminNotification,
  AdminOverview,
  AdminPayment,
  AdminProfessional,
  AdminReport,
  AdminService,
  AdminUser,
  CommunicationSummary,
  HealthStatus,
  SecurityEvent,
  ServiceHealth,
} from '@/types/admin';
import type { z } from 'zod';

type QueryParams = Record<string, string | number | undefined>;

const useAdminQuery = <T>(
  key: readonly unknown[],
  path: string,
  schema: { parse: (value: unknown) => T },
  params?: QueryParams,
) =>
  useQuery({
    queryKey: [...key, params],
    queryFn: () => readGateway(path, schema, params),
  });

export const getGetAdminOverviewQueryKey = () => ['admin', 'overview'] as const;
export const getGetAdminActivityQueryKey = (params?: QueryParams) => ['admin', 'activity', params] as const;
export const getGetAdminHealthQueryKey = () => ['admin', 'health'] as const;
export const getGetAdminUsersQueryKey = (params?: QueryParams) => ['admin', 'users', params] as const;
export const getGetAdminProfessionalsQueryKey = (params?: QueryParams) => ['admin', 'professionals', params] as const;
export const getGetAdminDisputesQueryKey = (params?: QueryParams) => ['admin', 'disputes', params] as const;

export function useHealthCheck(): UseQueryResult<HealthStatus> {
  return useQuery({ queryKey: ['gateway', 'health'], queryFn: () => readGatewayHealth(healthCheckSchema) });
}
export function useGetAdminOverview(): UseQueryResult<AdminOverview> {
  return useAdminQuery(['admin', 'overview'], '/overview', adminOverviewSchema);
}
export function useGetAdminActivity(params?: { limit?: number }): UseQueryResult<ActivityEvent[]> {
  return useAdminQuery(['admin', 'activity'], '/activity', activityEventSchema.array(), params);
}
export function useGetAdminHealth(): UseQueryResult<ServiceHealth[]> {
  return useAdminQuery(['admin', 'health'], '/health', serviceHealthSchema.array());
}
export function useGetAdminUsers(params?: { search?: string; status?: string }): UseQueryResult<AdminUser[]> {
  return useAdminQuery(['admin', 'users'], '/users', adminUserSchema.array(), params);
}
export function useGetAdminProfessionals(params?: { search?: string; status?: string }): UseQueryResult<AdminProfessional[]> {
  return useAdminQuery(['admin', 'professionals'], '/professionals', adminProfessionalSchema.array(), params);
}
export function useGetAdminDisputes(params?: { status?: string }): UseQueryResult<AdminDispute[]> {
  return useAdminQuery(['admin', 'disputes'], '/disputes', adminDisputeSchema.array(), params);
}
export function useGetAdminBookings(params?: { search?: string; status?: string }): UseQueryResult<AdminBooking[]> {
  return useAdminQuery(['admin', 'bookings'], '/bookings', adminBookingSchema.array(), params);
}
export function useGetAdminPayments(params?: { status?: string }): UseQueryResult<AdminPayment[]> {
  return useAdminQuery(['admin', 'payments'], '/payments', adminPaymentSchema.array(), params);
}
export function useGetAdminServices(params?: { search?: string; status?: string }): UseQueryResult<AdminService[]> {
  return useAdminQuery(['admin', 'services'], '/services', adminServiceSchema.array(), params);
}
export function useGetAdminNotifications(params?: { status?: string }): UseQueryResult<AdminNotification[]> {
  return useAdminQuery(['admin', 'notifications'], '/notifications', adminNotificationSchema.array(), params);
}
export function useGetAdminReports(): UseQueryResult<AdminReport[]> {
  return useAdminQuery(['admin', 'reports'], '/reports', adminReportSchema.array());
}
export function useGetAdminSecurity(): UseQueryResult<SecurityEvent[]> {
  return useAdminQuery(['admin', 'security'], '/security', securityEventSchema.array());
}
export function useGetAdminAnalytics(): UseQueryResult<AdminAnalytics> {
  return useAdminQuery(['admin', 'analytics'], '/analytics', adminAnalyticsSchema);
}
export function useGetAdminCommunications(): UseQueryResult<CommunicationSummary[]> {
  return useAdminQuery(['admin', 'communications'], '/communications', communicationSummarySchema.array());
}

export function useSuspendAdminUser(): UseMutationResult<AdminUser, unknown, { id: string; data: z.infer<typeof suspensionInputSchema> }> {
  return useMutation({
    mutationFn: ({ id, data }) => writeGateway(`/users/${encodeURIComponent(id)}/suspend`, suspensionInputSchema.parse(data), adminUserSchema),
  });
}
export function useUpdateProfessionalVerification(): UseMutationResult<AdminProfessional, unknown, { id: string; data: z.infer<typeof verificationInputSchema> }> {
  return useMutation({
    mutationFn: ({ id, data }) => writeGateway(`/professionals/${encodeURIComponent(id)}/verification`, verificationInputSchema.parse(data), adminProfessionalSchema),
  });
}
export function useResolveAdminDispute(): UseMutationResult<AdminDispute, unknown, { id: string; data: z.infer<typeof disputeResolutionInputSchema> }> {
  return useMutation({
    mutationFn: ({ id, data }) => writeGateway(`/disputes/${encodeURIComponent(id)}/resolve`, disputeResolutionInputSchema.parse(data), adminDisputeSchema),
  });
}
