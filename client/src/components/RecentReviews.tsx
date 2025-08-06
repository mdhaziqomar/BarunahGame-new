import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { reviewAPI } from '../api/api';

interface Review {
  overallRating: number;
  favoriteFeature: string;
  recommendToOthers: string;
  createdAt: string;
}

const RecentReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewAPI.getRecentReviews(3);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching recent reviews:', error);
        // Don't retry on rate limit errors
        if (error instanceof Error && error.message.includes('429')) {
          console.log('Rate limit hit, skipping reviews display');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show anything if no reviews
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="mt-12 max-w-4xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        What Players Are Saying
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">
                {getRatingStars(review.overallRating)}
              </div>
              <div className="text-sm opacity-75">
                {formatDate(review.createdAt)}
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-sm opacity-75">Favorite: </span>
              <span className="font-medium">{review.favoriteFeature}</span>
            </div>
            
            <div className="text-sm">
              <span className="opacity-75">Would recommend: </span>
              <span className="font-medium">{review.recommendToOthers}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentReviews; 