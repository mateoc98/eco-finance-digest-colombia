
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin, Building2 } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
  region: string;
  language: string;
  url: string;
  priority: 'high' | 'medium' | 'low';
}

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'sistema-bancario': 'bg-blue-100 text-blue-800',
      'economia': 'bg-green-100 text-green-800',
      'finanzas': 'bg-purple-100 text-purple-800',
      'politica-monetaria': 'bg-orange-100 text-orange-800',
      'politica-geopolitica': 'bg-red-100 text-red-800',
      'calificadoras': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRegionColor = (region: string) => {
    return region === 'nacional' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getPriorityBorder = (priority: string) => {
    const borders = {
      'high': 'border-l-4 border-l-red-500',
      'medium': 'border-l-4 border-l-yellow-500',
      'low': 'border-l-4 border-l-green-500'
    };
    return borders[priority as keyof typeof borders] || '';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 bg-white ${getPriorityBorder(article.priority)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-900 leading-tight">
            {article.title}
          </CardTitle>
          <div className="flex flex-col gap-1 shrink-0">
            <Badge variant="outline" className={getCategoryColor(article.category)}>
              {article.category.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className={getRegionColor(article.region)}>
              {article.region}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-700 text-sm leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Building2 className="h-3 w-3 mr-1" />
              <span>{article.source}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="uppercase">{article.language}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => window.open(article.url, '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Leer más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
