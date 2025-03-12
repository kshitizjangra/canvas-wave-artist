
import { UsageData } from "@/services/usageService";
import { Project } from "@/services/projectService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface OverviewTabProps {
  projects: Project[];
  usageData: UsageData[];
}

// Helper function to format chart data
const formatChartData = (data: UsageData[]) => {
  return data.map(item => ({
    name: item.date.split('-')[2], // Just the day
    value: item.value,
  }));
};

export const OverviewTab = ({ projects, usageData }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {projects.length > 0 ? "+1 since last month" : "Create your first project"}
            </p>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formatChartData(usageData.slice(-7))}>
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Collaborators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(projects.length * 2, 8)}
            </div>
            <p className="text-xs text-muted-foreground">
              {projects.length > 0 ? "+3 since last month" : "Add collaborators to your projects"}
            </p>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatChartData(usageData.slice(-7))}>
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Usage Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(usageData.reduce((acc, curr) => acc + curr.value, 0) / 3600)} hrs
            </div>
            <p className="text-xs text-muted-foreground">
              {projects.length > 0 ? "+5.2 hrs since last month" : "Start using the platform"}
            </p>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatChartData(usageData.slice(-7))}>
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardTitle className="text-muted-foreground text-sm font-normal">Your application performance over time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatChartData(usageData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
