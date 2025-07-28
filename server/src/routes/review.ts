import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Submit a new review
router.post('/submit', async (req, res) => {
  try {
    const {
      overallRating,
      educationalValue,
      entertainmentValue,
      culturalAwareness,
      difficultyLevel,
      favoriteFeature,
      improvements,
      recommendToOthers,
      ageGroup,
      priorKnowledge
    } = req.body;

    // Validate required fields
    if (!overallRating || !educationalValue || !entertainmentValue || 
        !culturalAwareness || !difficultyLevel || !favoriteFeature || 
        !recommendToOthers || !ageGroup || !priorKnowledge) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Validate rating ranges (1-5)
    const ratings = [overallRating, educationalValue, entertainmentValue, culturalAwareness, difficultyLevel];
    for (const rating of ratings) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ 
          error: 'Ratings must be between 1 and 5' 
        });
      }
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        overallRating,
        educationalValue,
        entertainmentValue,
        culturalAwareness,
        difficultyLevel,
        favoriteFeature,
        improvements: improvements || null,
        recommendToOthers,
        ageGroup,
        priorKnowledge
      }
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });

  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all reviews (for admin dashboard)
router.get('/all', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get review statistics (for admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const totalReviews = await prisma.review.count();
    
    const averageRatings = await prisma.review.aggregate({
      _avg: {
        overallRating: true,
        educationalValue: true,
        entertainmentValue: true,
        culturalAwareness: true,
        difficultyLevel: true
      }
    });

    const favoriteFeatures = await prisma.review.groupBy({
      by: ['favoriteFeature'],
      _count: {
        favoriteFeature: true
      },
      orderBy: {
        _count: {
          favoriteFeature: 'desc'
        }
      }
    });

    const recommendations = await prisma.review.groupBy({
      by: ['recommendToOthers'],
      _count: {
        recommendToOthers: true
      }
    });

    const ageGroups = await prisma.review.groupBy({
      by: ['ageGroup'],
      _count: {
        ageGroup: true
      }
    });

    const priorKnowledge = await prisma.review.groupBy({
      by: ['priorKnowledge'],
      _count: {
        priorKnowledge: true
      }
    });

    res.json({
      totalReviews,
      averageRatings: averageRatings._avg,
      favoriteFeatures,
      recommendations,
      ageGroups,
      priorKnowledge
    });

  } catch (error) {
    console.error('Error fetching review statistics:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get recent reviews (for public display)
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    const reviews = await prisma.review.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        overallRating: true,
        favoriteFeature: true,
        recommendToOthers: true,
        createdAt: true
      }
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching recent reviews:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

export default router; 