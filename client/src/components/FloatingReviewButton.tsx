import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewAPI } from '../api/api';

interface Question {
  id: number;
  question: string;
  type: 'rating' | 'text' | 'multiple-choice';
  options?: string[];
  required: boolean;
}

interface QuestionnaireData {
  overallRating: number;
  educationalValue: number;
  entertainmentValue: number;
  culturalAwareness: number;
  difficultyLevel: number;
  favoriteFeature: string;
  improvements: string;
  recommendToOthers: string;
  ageGroup: string;
  priorKnowledge: string;
}

const FloatingReviewButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    overallRating: 0,
    educationalValue: 0,
    entertainmentValue: 0,
    culturalAwareness: 0,
    difficultyLevel: 0,
    favoriteFeature: '',
    improvements: '',
    recommendToOthers: '',
    ageGroup: '',
    priorKnowledge: ''
  });

  const questions: Question[] = [
    {
      id: 1,
      question: "How would you rate your overall experience with Barunah?",
      type: 'rating',
      required: true
    },
    {
      id: 2,
      question: "How educational did you find the game?",
      type: 'rating',
      required: true
    },
    {
      id: 3,
      question: "How entertaining was the gameplay?",
      type: 'rating',
      required: true
    },
    {
      id: 4,
      question: "How much did the game increase your awareness of Brunei's MIB culture?",
      type: 'rating',
      required: true
    },
    {
      id: 5,
      question: "How would you rate the difficulty level?",
      type: 'rating',
      required: true
    },
    {
      id: 6,
      question: "What was your favorite feature of the game?",
      type: 'multiple-choice',
      options: [
        'Trivia Questions',
        'Boss Fights',
        'Rewards System',
        'Leaderboard',
        'Cultural Learning',
        'Visual Design',
        'Other'
      ],
      required: true
    },
    {
      id: 7,
      question: "What improvements would you suggest for the game?",
      type: 'text',
      required: false
    },
    {
      id: 8,
      question: "Would you recommend this game to others?",
      type: 'multiple-choice',
      options: [
        'Definitely Yes',
        'Probably Yes',
        'Maybe',
        'Probably Not',
        'Definitely Not'
      ],
      required: true
    },
    {
      id: 9,
      question: "What age group do you belong to?",
      type: 'multiple-choice',
      options: [
        'Under 13',
        '13-17',
        '18-25',
        '26-35',
        '36-50',
        'Over 50'
      ],
      required: true
    },
    {
      id: 10,
      question: "How much did you know about MIB philosophy before playing?",
      type: 'multiple-choice',
      options: [
        'Nothing at all',
        'Very little',
        'Some knowledge',
        'Quite knowledgeable',
        'Expert level'
      ],
      required: true
    }
  ];

  const handleRatingChange = (value: number) => {
    const fieldMap: { [key: number]: keyof QuestionnaireData } = {
      1: 'overallRating',
      2: 'educationalValue',
      3: 'entertainmentValue',
      4: 'culturalAwareness',
      5: 'difficultyLevel'
    };
    
    setFormData(prev => ({
      ...prev,
      [fieldMap[currentStep + 1]]: value
    }));
  };

  const handleTextChange = (value: string) => {
    const fieldMap: { [key: number]: keyof QuestionnaireData } = {
      7: 'improvements'
    };
    
    setFormData(prev => ({
      ...prev,
      [fieldMap[currentStep + 1]]: value
    }));
  };

  const handleMultipleChoiceChange = (value: string) => {
    const fieldMap: { [key: number]: keyof QuestionnaireData } = {
      6: 'favoriteFeature',
      8: 'recommendToOthers',
      9: 'ageGroup',
      10: 'priorKnowledge'
    };
    
    setFormData(prev => ({
      ...prev,
      [fieldMap[currentStep + 1]]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await reviewAPI.submitReview(formData);
      
      alert('Thank you for your feedback! Your review helps us improve Barunah.');
      setIsOpen(false);
      setCurrentStep(0);
      setFormData({
        overallRating: 0,
        educationalValue: 0,
        entertainmentValue: 0,
        culturalAwareness: 0,
        difficultyLevel: 0,
        favoriteFeature: '',
        improvements: '',
        recommendToOthers: '',
        ageGroup: '',
        priorKnowledge: ''
      });
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      alert('There was an error submitting your feedback. Please try again.');
    }
  };

  const canProceed = () => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion.required) return true;
    
    const fieldMap: { [key: number]: keyof QuestionnaireData } = {
      1: 'overallRating',
      2: 'educationalValue',
      3: 'entertainmentValue',
      4: 'culturalAwareness',
      5: 'difficultyLevel',
      6: 'favoriteFeature',
      7: 'improvements',
      8: 'recommendToOthers',
      9: 'ageGroup',
      10: 'priorKnowledge'
    };
    
    const field = fieldMap[currentStep + 1];
    const value = formData[field];
    
    if (currentQuestion.type === 'rating') {
      return typeof value === 'number' && value > 0;
    } else if (currentQuestion.type === 'text') {
      return true; // Text fields are optional
    } else {
      return typeof value === 'string' && value !== '';
    }
  };

  const renderQuestion = () => {
    const question = questions[currentStep];
    
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="space-y-6"
      >
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-2">
            Question {currentStep + 1} of {questions.length}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {question.question}
          </h3>
        </div>

        {question.type === 'rating' && (
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  formData[getFieldName(currentStep + 1) as keyof QuestionnaireData] === rating
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <textarea
            value={formData[getFieldName(currentStep + 1) as keyof QuestionnaireData] as string}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Share your thoughts..."
          />
        )}

        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleMultipleChoiceChange(option)}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  formData[getFieldName(currentStep + 1) as keyof QuestionnaireData] === option
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const getFieldName = (step: number): string => {
    const fieldMap: { [key: number]: string } = {
      1: 'overallRating',
      2: 'educationalValue',
      3: 'entertainmentValue',
      4: 'culturalAwareness',
      5: 'difficultyLevel',
      6: 'favoriteFeature',
      7: 'improvements',
      8: 'recommendToOthers',
      9: 'ageGroup',
      10: 'priorKnowledge'
    };
    return fieldMap[step] || '';
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center space-x-2"
      >
        <span>📝</span>
        <span>Share Your Review</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    🎮 Game Review
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {renderQuestion()}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentStep === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      canProceed()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingReviewButton; 