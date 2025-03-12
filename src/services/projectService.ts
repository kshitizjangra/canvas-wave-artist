
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  progress: number;
  updated_at: string;
  user_id: string;
}

export interface Collaborator {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export const useProjectService = () => {
  const { toast } = useToast();

  const getProjects = async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error: any) {
      toast({
        title: "Error fetching projects",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'user_id' | 'updated_at'>): Promise<Project | null> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Project created",
        description: "Your new project has been created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'user_id'>>): Promise<Project | null> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Project updated",
        description: "Your project has been updated successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
