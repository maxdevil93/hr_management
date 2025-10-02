import { Card, CardContent } from "../ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
  message?: string;
}

export function PlaceholderPage({ 
  title, 
  description, 
  message = "기능이 곧 추가될 예정입니다." 
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}