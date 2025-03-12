
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/services/projectService";

interface ProjectCardProps {
  project: Project;
  onSelect?: () => void;
}

export const ProjectCard = ({ project, onSelect }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-md">{project.name}</CardTitle>
        <CardDescription>Last edited {formatDate(project.updated_at)}</CardDescription>
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
