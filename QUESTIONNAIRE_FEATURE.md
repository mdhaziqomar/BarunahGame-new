# Barunah Game Review Questionnaire Feature

## Overview
The Barunah game now includes a comprehensive review questionnaire system that allows players to provide feedback about their gaming experience. This feature helps collect valuable insights to improve the game and understand user satisfaction.

## Features

### 1. Review Questionnaire Component
- **Location**: Floating button on the homepage (bottom-right corner)
- **Access**: Available to all users without requiring authentication
- **Design**: Modern, animated modal with step-by-step questions

### 2. Questionnaire Questions
The questionnaire includes 10 carefully crafted questions:

#### Rating Questions (1-5 scale):
1. **Overall Experience**: How would you rate your overall experience with Barunah?
2. **Educational Value**: How educational did you find the game?
3. **Entertainment Value**: How entertaining was the gameplay?
4. **Cultural Awareness**: How much did the game increase your awareness of Brunei's MIB culture?
5. **Difficulty Level**: How would you rate the difficulty level?

#### Multiple Choice Questions:
6. **Favorite Feature**: What was your favorite feature of the game?
   - Trivia Questions
   - Boss Fights
   - Rewards System
   - Leaderboard
   - Cultural Learning
   - Visual Design
   - Other

7. **Recommendation**: Would you recommend this game to others?
   - Definitely Yes
   - Probably Yes
   - Maybe
   - Probably Not
   - Definitely Not

8. **Age Group**: What age group do you belong to?
   - Under 13
   - 13-17
   - 18-25
   - 26-35
   - 36-50
   - Over 50

9. **Prior Knowledge**: How much did you know about MIB philosophy before playing?
   - Nothing at all
   - Very little
   - Some knowledge
   - Quite knowledgeable
   - Expert level

#### Text Question:
10. **Improvements**: What improvements would you suggest for the game? (Optional)

### 3. Recent Reviews Display
- **Location**: Homepage, below the main content
- **Content**: Shows the 3 most recent reviews with ratings and key feedback
- **Design**: Clean cards displaying star ratings, favorite features, and recommendations

### 4. Admin Dashboard Integration
- **New Tab**: "Reviews" tab in the admin dashboard
- **Statistics**: Comprehensive analytics including:
  - Total number of reviews
  - Average ratings across all categories
  - Favorite features breakdown
  - Recommendation distribution
  - Age group demographics
  - Prior knowledge levels

- **Data Visualization**: Charts and tables showing review trends and patterns

## Technical Implementation

### Frontend Components
1. **ReviewQuestionnaire.tsx**: Main questionnaire component with step-by-step navigation
2. **RecentReviews.tsx**: Component to display recent reviews on the homepage
3. **AdminDashboard.tsx**: Enhanced with reviews tab and analytics

### Backend Implementation
1. **Database Schema**: New `Review` model in Prisma schema
2. **API Routes**: `/api/reviews` endpoints for:
   - `POST /submit`: Submit new review
   - `GET /all`: Get all reviews (admin)
   - `GET /stats`: Get review statistics (admin)
   - `GET /recent`: Get recent reviews (public)

3. **Data Validation**: Server-side validation for all review submissions

### API Integration
- **reviewAPI**: New API module for review-related operations
- **Error Handling**: Comprehensive error handling for API calls
- **Loading States**: Proper loading indicators for better UX

## Benefits

### For Players
- **Voice**: Players can provide feedback and suggestions
- **Transparency**: See what other players think about the game
- **Engagement**: Feel more connected to the game's development

### For Administrators
- **Insights**: Detailed analytics on user satisfaction and preferences
- **Improvement Data**: Specific feedback for game enhancements
- **Demographics**: Understanding of user base and their needs

### For Game Development
- **Data-Driven Decisions**: Make improvements based on actual user feedback
- **Feature Prioritization**: Understand which features are most valued
- **Quality Assurance**: Monitor game satisfaction over time

## Usage Instructions

### For Players
1. Visit the Barunah homepage
2. Click the "📝 Share Your Review" button (bottom-right)
3. Answer each question in the step-by-step questionnaire
4. Submit your review
5. View recent reviews from other players on the homepage

### For Administrators
1. Access the admin dashboard
2. Navigate to the "Reviews" tab
3. View comprehensive analytics and recent reviews
4. Use the data to make informed decisions about game improvements

## Future Enhancements
- Export review data to CSV/Excel
- Advanced filtering and search in admin dashboard
- Review moderation system
- Automated feedback analysis
- Integration with game analytics
- Review-based reward system

## Database Schema
```sql
model Review {
  id                String   @id @default(cuid())
  overallRating     Int
  educationalValue  Int
  entertainmentValue Int
  culturalAwareness Int
  difficultyLevel   Int
  favoriteFeature   String
  improvements      String?
  recommendToOthers String
  ageGroup          String
  priorKnowledge    String
  createdAt         DateTime @default(now())
  
  @@map("reviews")
}
```

This questionnaire system provides a comprehensive way to gather user feedback and continuously improve the Barunah game experience. 