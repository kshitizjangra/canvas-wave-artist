
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjectService, Project } from "@/services/projectService";
import { useToast } from "@/hooks/use-toast";

interface ProjectsSectionProps {
  projects: Project[];
  onRefresh: () => void;
}

export const ProjectsSection = ({ projects, onRefresh }: ProjectsSectionProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const projectService = useProjectService();
  const { toast } = useToast();

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const result = await projectService.createProject({
      name: newProject.name,
      description: newProject.description,
      progress: 0,
    });

    setIsLoading(false);
    
    if (result) {
      setIsCreateDialogOpen(false);
      setNewProject({ name: "", description: "" });
      onRefresh();
    }
  };

  return (
    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <Button 
          size="sm" 
          onClick={() => setIsCreateDialogOpen(true)}
        >
          New Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>You don't have any projects yet.</p>
          <Button 
            variant="link" 
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
            />
          ))}
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your dashboard
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Project Name</label>
              <Input
                id="name"
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter project name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateProject}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
