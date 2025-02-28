interface MappingItem {
  task: string;
  hfModel: string;
  providerModel: string;
  status?: 'live' | 'staging';
}

interface StatusUpdateRequest {
  hfModel: string;
  status: 'live' | 'staging';
}

interface HFInferenceProviderOptions {
  baseUrl?: string;
  provider?: string;
}

class HFInferenceProviderClient {
  private baseUrl;
  private provider;
  private hfToken;

  constructor(options: HFInferenceProviderOptions = {}) {
    const { baseUrl = 'https://huggingface.co', provider = 'replicate' } = options;
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.provider = provider;
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      throw new Error('HF_TOKEN environment variable is required');
    }
    this.hfToken = hfToken;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${this.hfToken}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }

  async registerMappingItem(mappingItem: MappingItem): Promise<MappingItem> {
    const url = `${this.baseUrl}/api/partners/${this.provider}/models`;
    
    const itemToRegister = {
      ...mappingItem,
      status: mappingItem.status || 'staging'
    };

    return this.request<MappingItem>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemToRegister),
    });
  }

  async deleteMappingItem(hfModel: string): Promise<MappingItem> {
    const url = `${this.baseUrl}/api/partners/${this.provider}/models?hfModel=${encodeURIComponent(hfModel)}`;

    return this.request<MappingItem>(url, {
      method: 'DELETE'
    });
  }

  async updateMappingItemStatus(statusUpdate: StatusUpdateRequest): Promise<MappingItem> {
    const url = `${this.baseUrl}/api/partners/${this.provider}/models/status`;

    return this.request<MappingItem>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statusUpdate),
    });
  }
  
  async listMappingItems(): Promise<Record<string, Record<string, MappingItem>>> {
    const url = `${this.baseUrl}/api/partners/${this.provider}/models`;

    return this.request<Record<string, Record<string, MappingItem>>>(url, {
      method: 'GET'
    });
  }

  async listMappingIds(): Promise<string[]> {
    const mappings = await this.listMappingItems();

    const ids = [];

    for (const [_taskType, models] of Object.entries(mappings)) {
        for (const [modelId, _model] of Object.entries(models)) {
            ids.push(modelId);
        }
    }
    
    return ids;
  }

}

export default HFInferenceProviderClient;