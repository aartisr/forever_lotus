import { NextRequest } from 'next/server';
import { badRequest, ok, serverError } from '@/lib/api-response';
import { parseJsonBody } from '@/lib/api-request';
import {
  type AwariconApplicationInput,
  computeIntegrity,
  computeOmega,
  computeScore,
  determineRecommendedTier,
  generateApplicationId,
  validateApplicationInput,
} from '@/lib/awariconCertification';
import { AwariconCertificationStorage } from '@/services/awaricon-certification-storage';
import { normalizeSite } from '@/lib/awariconBadgeVerification';

export async function POST(request: NextRequest) {
  const { data, error } = await parseJsonBody<AwariconApplicationInput>(request);
  if (error || !data) {
    return badRequest(error ?? 'Invalid request body.');
  }

  const errors = validateApplicationInput(data);
  if (errors.length > 0) {
    return badRequest(errors.map((e) => e.message).join(' '));
  }

  const site = normalizeSite(data.site);
  if (!site) {
    return badRequest('Invalid website URL.');
  }

  try {
    const omega = computeOmega(data.operatingYears);
    const integrity = computeIntegrity(data.integrityFlags);
    const score = computeScore(data.phi, data.df, omega, integrity);
    const recommendedTier = determineRecommendedTier(score);

    const now = new Date().toISOString();
    const id = generateApplicationId();

    await AwariconCertificationStorage.save({
      id,
      site,
      organizationName: data.organizationName.trim(),
      contactEmail: data.contactEmail.trim().toLowerCase(),
      description: data.description.trim(),
      phi: data.phi,
      df: data.df,
      operatingYears: data.operatingYears,
      omega,
      integrity,
      score,
      recommendedTier,
      integrityFlags: data.integrityFlags,
      statement: data.statement.trim(),
      tierRequested: data.tierRequested,
      status: 'submitted',
      createdAt: now,
      updatedAt: now,
    });

    return ok({
      id,
      site,
      score,
      recommendedTier,
      status: 'submitted',
      message: 'Application submitted successfully. Use the application ID to track your status.',
    });
  } catch {
    return serverError('Failed to submit application. Please try again.');
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
