import React, { useState } from 'react';
import { Star, MessageSquare, Utensils, Send, User } from 'lucide-react';

const FoodReviews = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [mealType, setMealType] = useState('Lunch');
  const [comment, setComment] = useState('');
  
  const [reviews, setReviews] = useState([
    { id: 1, student: 'Rahul Kumar', meal: 'Dinner', rating: 5, comment: 'Paneer was exceptionally good tonight!', date: 'Today, 8:30 PM' },
    { id: 2, student: 'Amit Singh', meal: 'Lunch', rating: 4, comment: 'Rajma chawal is always a classic. Good food.', date: 'Today, 1:15 PM' },
    { id: 3, student: 'Priya Sharma', meal: 'Breakfast', rating: 3, comment: 'Idlis were a bit cold, but sambhar was tasty.', date: 'Today, 9:00 AM' },
  ]);

  const todaysMenu = [
    { type: 'Breakfast', time: '8:00 AM - 10:00 AM', items: 'Aloo Paratha, Curd, Pickle, Tea/Coffee' },
    { type: 'Lunch', time: '12:30 PM - 2:30 PM', items: 'Rajma, Jeera Rice, Roti, Salad, Raita' },
    { type: 'Snacks', time: '5:00 PM - 6:00 PM', items: 'Samosa, Green Chutney, Tea' },
    { type: 'Dinner', time: '8:00 PM - 10:00 PM', items: 'Kadai Paneer, Dal Tadka, Roti, Rice, Gulab Jamun' },
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0) return alert('Please select a rating');
    
    const newReview = {
      id: reviews.length + 1,
      student: 'Current User',
      meal: mealType,
      rating: rating,
      comment: comment || 'No comment provided',
      date: 'Just now'
    };
    
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="bg-orange-100 p-2 rounded-lg mr-3">
            <Utensils className="w-6 h-6 text-orange-600" />
          </div>
          Mess Food & Reviews
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Menu & Write Review */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Menu */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-indigo-500" />
              Today's Menu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysMenu.map((meal, index) => (
                <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100 flex flex-col transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-orange-900">{meal.type}</span>
                    <span className="text-xs font-medium text-orange-700 bg-orange-200 px-2.5 py-1 rounded-full">{meal.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">{meal.items}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
              Write a Review
            </h2>
            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Meal</label>
                  <select 
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 bg-gray-50/50 transition-colors"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                
                <div className="w-full sm:w-2/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Rating</label>
                  <div className="flex items-center space-x-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transform hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating) 
                              ? 'text-yellow-400 fill-current drop-shadow-sm' 
                              : 'text-gray-200'
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      {rating > 0 ? `${rating} / 5` : 'Rate the meal'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Feedback</label>
                <textarea 
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was the taste and quality? Any suggestions?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 bg-gray-50/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium flex items-center transition-all hover:shadow-lg active:scale-95"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Recent Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <div className="bg-yellow-100 p-1.5 rounded-lg mr-2">
                <Star className="w-4 h-4 text-yellow-600 fill-current" />
              </div>
              Recent Reviews
            </h2>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Live updates
            </span>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{rev.student}</p>
                      <p className="text-[11px] font-medium text-gray-500 mt-0.5">{rev.date} • <span className="text-indigo-600">{rev.meal}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white border border-yellow-200 shadow-sm px-2 py-1 rounded-lg">
                    <span className="text-sm font-bold text-yellow-600 mr-1.5">{rev.rating}</span>
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pl-12 line-clamp-3">
                  "{rev.comment}"
                </p>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="text-center py-10 text-gray-500 flex flex-col items-center">
                <MessageSquare className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-sm">No reviews yet. Be the first!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodReviews;
