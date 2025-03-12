
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, useProjectService } from "@/services/projectService";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onSelect?: () => void;
  onDelete?: () => void;
}

export const ProjectCard = ({ project, onSelect, onDelete }: ProjectCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteProject } = useProjectService();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProject(project.id);
    setIsDeleting(false);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer relative group"
      onClick={(e) => {
        // Prevent triggering click when clicking delete button
        if ((e.target as HTMLElement).closest('.delete-button')) {
          e.stopPropagation();
          return;
        }
        onSelect?.();
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-md">{project.name}</CardTitle>
            <CardDescription>Last edited {formatDate(project.updated_at)}</CardDescription>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="delete-button opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{project.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
          <span className="text-xs text-muted-foreground">{project.progress || 0}%</span>
        </div>
      </CardContent>
    </Card>
  );
};
