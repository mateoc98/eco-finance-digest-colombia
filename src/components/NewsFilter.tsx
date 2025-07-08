
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface NewsFilterProps {
  selectedCategory: string;
  selectedRegion: string;
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
}

export const NewsFilter = ({
  selectedCategory,
  selectedRegion,
  onCategoryChange,
  onRegionChange,
}: NewsFilterProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="category-filter">Categoría</Label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger id="category-filter">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="sistema-bancario">Sistema Bancario</SelectItem>
            <SelectItem value="economia">Economía</SelectItem>
            <SelectItem value="finanzas">Finanzas</SelectItem>
            <SelectItem value="politica-monetaria">Política Monetaria</SelectItem>
            <SelectItem value="politica-geopolitica">Política y Geopolítica</SelectItem>
            <SelectItem value="calificadoras">Calificadoras de Riesgo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="region-filter">Región</Label>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger id="region-filter">
            <SelectValue placeholder="Seleccionar región" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las regiones</SelectItem>
            <SelectItem value="nacional">Nacional (Colombia)</SelectItem>
            <SelectItem value="internacional">Internacional</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
