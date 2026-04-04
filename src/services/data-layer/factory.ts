import { InMemoryRecordRepository } from '@/services/data-layer/drivers/in-memory-record-repository';
import { SupabaseRecordRepository } from '@/services/data-layer/drivers/supabase-record-repository';
import { DataRepository, EntityRecord } from '@/services/data-layer/types';
import { getDataLayerDriver } from '@/services/data-layer/config';

export function createDataRepository<T extends EntityRecord>(
  entity: string
): DataRepository<T> {
  const driver = getDataLayerDriver();

  if (driver === 'memory') {
    return new InMemoryRecordRepository<T>();
  }

  return new SupabaseRecordRepository<T>(entity);
}
