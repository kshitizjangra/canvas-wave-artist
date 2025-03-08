
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  Calendar, 
  BarChart, 
  PieChart, 
  FileText, 
  ChevronRight
} from "lucide-react";

export function DashboardContent() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: CreditCard,
    },
    {
      title: "New Users",
      value: "2,350",
      change: "+10.5%",
      icon: Users,
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+2.3%",
      icon: FileText,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+1.1%",
      icon: BarChart3,
    },
  ];

  const quickActions = [
    { title: "Create New Project", icon: FileText },
    { title: "Schedule Meeting", icon: Calendar },
    { title: "View Sales Report", icon: BarChart },
    { title: "Manage Team", icon: Users },
    { title: "View Analytics", icon: PieChart },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-green-500">
                {stat.change}
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Project {i + 1} Updated</h4>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                >
                  <action.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{action.title}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
