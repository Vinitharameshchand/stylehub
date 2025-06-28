// AI Service for product recommendations and smart features
export class AIService {
  private static instance: AIService;
  
  private constructor() {}
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Simulate AI-powered product recommendations
  async getRecommendations(userId: string, viewedProducts: string[], preferences: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock AI recommendation logic
    const recommendations = this.generateMockRecommendations(viewedProducts, preferences);
    return recommendations;
  }

  // Smart search with AI-powered suggestions
  async smartSearch(query: string, products: any[]) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const searchTerms = query.toLowerCase().split(' ');
    const results = products.filter(product => {
      const searchableText = `${product.name} ${product.brand} ${product.category} ${product.colors.join(' ')} ${product.description}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });

    // AI-powered relevance scoring
    return results.map(product => ({
      ...product,
      relevanceScore: this.calculateRelevanceScore(product, query)
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  // Style compatibility analysis
  analyzeStyleCompatibility(item1: any, item2: any): number {
    // Mock style compatibility algorithm
    const colorCompatibility = this.checkColorCompatibility(item1.colors, item2.colors);
    const categoryCompatibility = this.checkCategoryCompatibility(item1.category, item2.category);
    const brandCompatibility = item1.brand === item2.brand ? 0.8 : 0.6;
    
    return (colorCompatibility + categoryCompatibility + brandCompatibility) / 3;
  }

  // Generate outfit suggestions
  async generateOutfitSuggestions(baseItem: any, allProducts: any[]) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const compatibleItems = allProducts
      .filter(product => product.id !== baseItem.id)
      .map(product => ({
        ...product,
        compatibility: this.analyzeStyleCompatibility(baseItem, product)
      }))
      .filter(product => product.compatibility > 0.6)
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 6);

    return compatibleItems;
  }

  // Price prediction and trend analysis
  async analyzePriceTrends(productId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock price trend data
    return {
      currentPrice: Math.random() * 100 + 20,
      predictedPrice: Math.random() * 100 + 20,
      trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
      confidence: Math.random() * 0.3 + 0.7,
      recommendation: Math.random() > 0.5 ? 'buy_now' : 'wait'
    };
  }

  // Personalized size recommendations
  async getSizeRecommendation(userId: string, productId: string, userMeasurements?: any) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock size recommendation logic
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const recommendedSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    return {
      recommendedSize,
      confidence: Math.random() * 0.3 + 0.7,
      fitPrediction: Math.random() > 0.5 ? 'perfect' : 'slightly_loose',
      alternatives: sizes.filter(s => s !== recommendedSize).slice(0, 2)
    };
  }

  private generateMockRecommendations(viewedProducts: string[], preferences: any) {
    // Mock recommendation algorithm
    const categories = ['T-Shirts', 'Jackets', 'Dresses', 'Pants', 'Sweaters'];
    const brands = ['Premium', 'Denim Co.', 'Elegance', 'Tailored', 'Comfort'];
    
    return Array.from({ length: 8 }, (_, i) => ({
      id: `rec_${i}`,
      name: `AI Recommended ${categories[i % categories.length]}`,
      price: Math.random() * 80 + 20,
      image: `https://images.pexels.com/photos/${996329 + i}/pexels-photo-${996329 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`,
      category: categories[i % categories.length],
      brand: brands[i % brands.length],
      confidence: Math.random() * 0.3 + 0.7,
      reason: this.getRecommendationReason(i)
    }));
  }

  private calculateRelevanceScore(product: any, query: string): number {
    const queryLower = query.toLowerCase();
    let score = 0;
    
    if (product.name.toLowerCase().includes(queryLower)) score += 0.4;
    if (product.brand.toLowerCase().includes(queryLower)) score += 0.3;
    if (product.category.toLowerCase().includes(queryLower)) score += 0.2;
    if (product.description.toLowerCase().includes(queryLower)) score += 0.1;
    
    return score;
  }

  private checkColorCompatibility(colors1: string[], colors2: string[]): number {
    const compatibleColors = {
      'black': ['white', 'gray', 'navy', 'cream'],
      'white': ['black', 'navy', 'gray', 'blue'],
      'navy': ['white', 'cream', 'gray', 'khaki'],
      'gray': ['white', 'black', 'navy', 'blue']
    };
    
    for (const color1 of colors1) {
      for (const color2 of colors2) {
        if (compatibleColors[color1.toLowerCase()]?.includes(color2.toLowerCase())) {
          return 0.9;
        }
      }
    }
    return 0.5;
  }

  private checkCategoryCompatibility(category1: string, category2: string): number {
    const compatibleCategories = {
      'T-Shirts': ['Jackets', 'Pants', 'Skirts'],
      'Jackets': ['T-Shirts', 'Pants', 'Dresses'],
      'Pants': ['T-Shirts', 'Jackets', 'Sweaters'],
      'Dresses': ['Jackets'],
      'Sweaters': ['Pants', 'Skirts']
    };
    
    if (compatibleCategories[category1]?.includes(category2)) {
      return 0.8;
    }
    return 0.4;
  }

  private getRecommendationReason(index: number): string {
    const reasons = [
      'Based on your recent views',
      'Popular in your style category',
      'Trending this season',
      'Matches your color preferences',
      'Similar to your favorites',
      'Recommended by AI stylist',
      'Perfect for your wardrobe',
      'Highly rated by similar users'
    ];
    return reasons[index % reasons.length];
  }
}

export const aiService = AIService.getInstance();