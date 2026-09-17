import { describe, expect, it } from 'vitest';
import { adminUserSchema, suspensionInputSchema } from '@/schemas/admin';

describe('admin gateway schemas', () => {
  it('accepts a gateway-owned customer record', () => {
    const result = adminUserSchema.parse({
      id: 'gateway-user',
      name: 'Gateway user',
      email: 'gateway@example.test',
      status: 'active',
      joinedAt: '2026-01-01T00:00:00.000Z',
      bookings: 0,
      lifetimeValue: 0,
    });

    expect(result.id).toBe('gateway-user');
  });

  it('rejects an empty administrative suspension reason', () => {
    expect(() => suspensionInputSchema.parse({ reason: '' })).toThrow();
  });
});
