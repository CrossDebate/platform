import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ModelCard } from './ModelCard';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

export interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  previewUrl?: string;
  metadata?: Record<string, any>;
}

interface VisualModelSelectorProps {
  models: Model[];
  selectedModelId?: string;
  onSelectModel: (model: Model) => void;
  categories?: string[];
  className?: string;
}

export function VisualModelSelector({
  models,
  selectedModelId,
  onSelectModel,
  categories: propCategories,
  className
}: VisualModelSelectorProps) {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories and tags
  const categories = useMemo(() => {
    return propCategories || [...new Set(models.map(model => model.category))];
  }, [models, propCategories]);

  const tags = useMemo(() => {
    const allTags = models.flatMap(model => model.tags);
    return [...new Set(allTags)];
  }, [models]);

  // Filter models based on search query, category and tags
  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const matchesSearch = searchQuery === '' || 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || 
        model.category === selectedCategory;

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => model.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [models, searchQuery, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-2 items-end">
        <div className="relative flex-1">
          <Label htmlFor="search-models" className="sr-only">
            Search models
          </Label>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            id="search-models"
            placeholder="Search models..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search models"
          />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          aria-controls="filter-options"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {(selectedCategory || selectedTags.length > 0) && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategory ? 1 : 0 + selectedTags.length}
            </Badge>
          )}
        </Button>
      </div>
      
      {/* Filter options */}
      {showFilters && (
        <div 
          id="filter-options"
          className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 border rounded-lg"
          role="region" 
          aria-label="Filter options"
        >
          <div className="flex-1">
            <Label htmlFor="category-filter">Category</Label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category-filter" aria-label="Filter by category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label className="mb-2 block">Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                  role="checkbox"
                  aria-checked={selectedTags.includes(tag)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTagToggle(tag);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="self-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              aria-label="Reset filters"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}
      
      {/* Results count */}
      <div 
        className="text-sm text-gray-500"
        aria-live="polite"
        aria-atomic="true"
      >
        {filteredModels.length} {filteredModels.length === 1 ? 'model' : 'models'} found
      </div>
      
      {/* Model grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        role="listbox"
        aria-label="Available models"
      >
        {filteredModels.length > 0 ? (
          filteredModels.map(model => (
            <ModelCard
              key={model.id}
              model={model}
              isSelected={model.id === selectedModelId}
              onSelect={() => onSelectModel(model)}
              role="option"
              aria-selected={model.id === selectedModelId}
            />
          ))
        ) : (
          <div 
            className="col-span-full p-8 text-center text-gray-500 border rounded-lg"
            role="alert"
          >
            No models match your filters. Try adjusting your search or filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
