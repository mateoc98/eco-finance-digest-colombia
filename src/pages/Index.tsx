
import { useState } from "react";
import { Calendar, Download, Search, Filter, FileText, TrendingUp, Globe, MapPin, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/NewsCard";
import { PDFGenerator } from "@/components/PDFGenerator";
import { NewsFilter } from "@/components/NewsFilter";
import { useNewsData } from "@/hooks/useNewsData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: newsData, isLoading, error } = useNewsData();

  const filteredNews = (newsData || []).filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesRegion = selectedRegion === "all" || article.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const handleGeneratePDF = () => {
    PDFGenerator.generateReport(filteredNews);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  IR Monitor Banco de Bogotá
                </h1>
                <p className="text-sm text-slate-600">
                  Seguimiento diario al entorno económico y bancario
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-slate-600">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date().toLocaleDateString('es-CO', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <Button
                onClick={handleGeneratePDF}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Generar PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Noticias</p>
                  <p className="text-2xl font-bold text-slate-900">{filteredNews.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Nacionales</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {filteredNews.filter(n => n.region === 'nacional').length}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Internacionales</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {filteredNews.filter(n => n.region === 'internacional').length}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Calificadoras</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {filteredNews.filter(n => n.category === 'calificadoras').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <NewsFilter
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                onCategoryChange={setSelectedCategory}
                onRegionChange={setSelectedRegion}
              />
            </div>
          )}
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-600">Cargando noticias...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Error al cargar noticias
            </h3>
            <p className="text-slate-600">
              {error.message || 'Intenta recargar la página'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredNews.length === 0 && newsData?.length > 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No se encontraron noticias
            </h3>
            <p className="text-slate-600">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
