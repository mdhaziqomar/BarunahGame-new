const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000/api' : 'https://barunah-backend.onrender.com/api');

console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  DEV: import.meta.env.DEV,
  API_BASE_URL
});

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  console.log('🌐 Making API request:', { endpoint, hasToken: !!token, url: `${API_BASE_URL}${endpoint}` });
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  console.log('📡 API response:', { status: response.status, ok: response.ok, endpoint });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    console.error('❌ API error:', { status: response.status, error: errorData });
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Auth API functions
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, username: string, fullName: string, password: string) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, fullName, password }),
    }),

  verify: () => apiRequest('/auth/verify'),
};

// Game API functions
export const gameAPI = {
  startGame: (difficulty: string, subject: string) =>
    apiRequest('/game/start', {
      method: 'POST',
      body: JSON.stringify({ difficulty, subject }),
    }),

  getQuestions: (difficulty: string, subject: string, count: number = 5) =>
    apiRequest(`/game/questions?difficulty=${difficulty}&subject=${subject}&count=${count}`),

  submitAnswer: (gameId: string, questionId: string, selectedAnswer: string, timeSpent: number) =>
    apiRequest('/game/answer', {
      method: 'POST',
      body: JSON.stringify({ gameId, questionId, selectedAnswer, timeSpent }),
    }),

  getBossQuestions: (difficulty: string) =>
    apiRequest(`/game/boss-questions?difficulty=${difficulty}`),

  completeGame: (gameId: string, bossDefeated: boolean) =>
    apiRequest('/game/complete', {
      method: 'POST',
      body: JSON.stringify({ gameId, bossDefeated }),
    }),

  purchaseShopItem: (gameId: string, itemId: string, itemPrice: number) =>
    apiRequest('/game/shop/purchase', {
      method: 'POST',
      body: JSON.stringify({ gameId, itemId, itemPrice }),
    }),

  getLeaderboard: (period: string = 'all-time', limit: number = 100) =>
    apiRequest(`/game/leaderboard?period=${period}&limit=${limit}`),
};

// User API functions
export const userAPI = {
  getProfile: (userId: string) => apiRequest(`/user/profile/${userId}`),
  
  updateProfile: (userId: string, updates: any) =>
    apiRequest(`/user/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  getStats: (userId: string) => apiRequest(`/user/stats/${userId}`),
};

// Rewards API functions
export const rewardsAPI = {
  getAllRewards: () => apiRequest('/rewards'),
  
  redeemReward: (rewardId: string) =>
    apiRequest('/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ rewardId }),
    }),

  getUserRedemptions: (userId: string) => apiRequest(`/rewards/user/${userId}`),
};

// Admin API functions
export const adminAPI = {
  getDashboardStats: () => apiRequest('/admin/dashboard'),
  
  getAllUsers: () => apiRequest('/admin/users'),
  
  getAnalytics: () => apiRequest('/admin/analytics'),
  
  getSystemHealth: () => apiRequest('/admin/system-health'),
  
  toggleUserStatus: (userId: string) =>
    apiRequest(`/admin/users/${userId}/toggle-status`, {
      method: 'PUT',
    }),
};

// Question API functions
export const questionAPI = {
  getAllQuestions: () => apiRequest('/questions'),
  
  createQuestion: (questionData: any) =>
    apiRequest('/questions', {
      method: 'POST',
      body: JSON.stringify(questionData),
    }),

  updateQuestion: (id: string, questionData: any) =>
    apiRequest(`/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(questionData),
    }),

  deleteQuestion: (id: string) =>
    apiRequest(`/questions/${id}`, {
      method: 'DELETE',
    }),

  bulkCreateQuestions: (questions: any[]) =>
    apiRequest('/questions/bulk', {
      method: 'POST',
      body: JSON.stringify({ questions }),
    }),

  // INSTANT REFRESH - Import all questions from compiled file
  refreshAllQuestions: () =>
    apiRequest('/questions/refresh', {
      method: 'POST',
    }),

  getQuestionStats: () => apiRequest('/questions/stats'),
};

// Vendor API functions
export const vendorAPI = {
  getVendorRewards: (vendorId: string) => apiRequest(`/vendor/rewards/${vendorId}`),
  
  getVendorRedemptions: (vendorId: string) => apiRequest(`/vendor/redemptions/${vendorId}`),
  
  getVendorDashboard: (vendorId: string) => apiRequest(`/vendor/dashboard/${vendorId}`),
  
  getVendorAnalytics: (vendorId: string) => apiRequest(`/vendor/analytics/${vendorId}`),
  
  updateRedemptionStatus: (redemptionId: string, status: string) =>
    apiRequest(`/vendor/redemptions/${redemptionId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
    
  validateQRCode: (qrCodeData: any) =>
    apiRequest('/vendor/validate-qr', {
      method: 'POST',
      body: JSON.stringify({ qrCodeData }),
    }),
}; 

// Review API functions
export const reviewAPI = {
  submitReview: (reviewData: any) =>
    apiRequest('/reviews/submit', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    }),

  getRecentReviews: (limit: number = 5) =>
    apiRequest(`/reviews/recent?limit=${limit}`),

  getReviewStats: () => apiRequest('/reviews/stats'),

  getAllReviews: () => apiRequest('/reviews/all'),
}; 