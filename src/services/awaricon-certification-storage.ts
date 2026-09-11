import { createDataRepository } from '@/services/data-layer/factory';
import type { AwariconCertificationRecord } from '@/lib/awariconCertification';

const repo = createDataRepository<AwariconCertificationRecord>('awaricon_certifications');

export const AwariconCertificationStorage = {
  save: (record: AwariconCertificationRecord) => repo.save(record),
  get: (id: string) => repo.get(id),
  list: (limit = 100) => repo.list(limit),
  update: (id: string, updates: Partial<AwariconCertificationRecord>) => repo.update(id, updates),
};
