
import { Brand } from "./Brand";

/**
 * Mock service for Brand
 */
export const BrandMockService = {
  generateMockData: (): Brand[] => {
    const mockData: Brand[] = [];

    for (let i = 1; i <= 100; i++) {
      const mockBrand: Brand = {
        id: i,
        name: `Brand ${i}`,
        description: `Description for Brand ${i}`,
        logo: `https://example.com/logos/brand${i}.png`,
        status: i % 2 === 0,
      };

      mockData.push(mockBrand);
    }

    return mockData;
  },

  getMockData: (page: number, size: number, searchTerm?: string) => {
    const mockData = BrandMockService.generateMockData();

    // Apply search filter
    let filteredData = [...mockData];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (brand) =>
          brand.name.toLowerCase().includes(term) ||
          brand.description.toLowerCase().includes(term)
      );
    }

    // Paginate
    const startIndex = page * size;
    const paginatedData = filteredData.slice(startIndex, startIndex + size);

    return Promise.resolve({
      data: {
        content: paginatedData,
        totalElements: filteredData.length,
        totalPages: Math.ceil(filteredData.length / size),
        size: size,
        number: page,
        last: startIndex + size >= filteredData.length,
      },
    });
  },

  getMockDataById: (id: number): Promise<Brand> => {
    const mockData = BrandMockService.generateMockData();
    const data = mockData.find((item) => item.id === id);

    if (!data) {
      return Promise.reject(new Error("Brand not found"));
    }

    return Promise.resolve(data);
  },
};
