import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSubscription = (clubId) => {
  const axiosSecure = useAxiosSecure();

  const { data: subscription, isLoading, error } = useQuery({
    queryKey: ['subscription', clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscriptions/status/${clubId}`);
      return res.data;
    },
    enabled: !!clubId,
  });

  const isBasic = subscription?.plan === 'basic' || !subscription?.plan;
  const isPro = subscription?.plan === 'pro';
  const isEnterprise = subscription?.plan === 'enterprise';
  const isActive = subscription?.status === 'active';
  const isExpired = subscription?.status === 'expired' || (subscription?.expiresAt && new Date(subscription.expiresAt) < new Date());

  const canCreateEvent = () => {
    if (!isActive || isExpired) return false;
    if (isBasic) return true; // Basic can create events
    return true;
  };

  const canAddMembers = () => {
    if (!isActive || isExpired) return false;
    return true;
  };

  const getFeatureLimit = (feature) => {
    const limits = {
      basic: { members: 50, events: 5 },
      pro: { members: 200, events: 20 },
      enterprise: { members: Infinity, events: Infinity },
    };
    return limits[subscription?.plan || 'basic']?.[feature] || 0;
  };

  return {
    subscription,
    isLoading,
    error,
    isBasic,
    isPro,
    isEnterprise,
    isActive,
    isExpired,
    canCreateEvent,
    canAddMembers,
    getFeatureLimit,
  };
};

export default useSubscription;
