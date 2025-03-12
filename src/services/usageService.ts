
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UsageLog {
  id: string;
  user_id: string;
  session_duration: number;
  activity_type: string;
  recorded_at: string;
}

export interface UsageData {
  date: string;
  value: number;
}

export const useUsageService = () => {
  const { toast } = useToast();

  const logUsage = async (duration: number, activityType: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('usage_logs')
        .insert({
          session_duration: duration,
          activity_type: activityType,
        });

      if (error) {
        throw error;
      }

      return true;
    } catch (error: any) {
      console.error("Error logging usage:", error.message);
      return false;
    }
  };

  const getUsageData = async (days: number = 7, activityType?: string): Promise<UsageData[]> => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      let query = supabase
        .from('usage_logs')
        .select('*')
        .gte('recorded_at', startDate.toISOString());

      if (activityType) {
        query = query.eq('activity_type', activityType);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Process data for charts - group by day
      const groupedByDay = (data || []).reduce((acc: Record<string, number>, log) => {
        const date = new Date(log.recorded_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + log.session_duration;
        return acc;
      }, {});

      // Convert to array format for charts
      return Object.entries(groupedByDay).map(([date, value]) => ({
        date: date,
        value: value,
      })).sort((a, b) => a.date.localeCompare(b.date));
    } catch (error: any) {
      toast({
        title: "Error fetching usage data",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  return {
    logUsage,
    getUsageData,
  };
};
