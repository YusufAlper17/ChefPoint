import { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Heart, Eye, MessageCircle, Share2 } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Shorts = () => {
  const { t } = useLanguage();
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const allShorts = mockRestaurants.flatMap(restaurant => 
    restaurant.shorts.map(short => ({
      ...short,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image
    }))
  );

  const toggleLike = (shortId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(shortId)) {
        newSet.delete(shortId);
      } else {
        newSet.add(shortId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('shorts.title')}</h1>
        <p className="text-gray-600">{t('shorts.subtitle')}</p>
      </div>

      {/* Shorts Grid */}
      <div className="space-y-6">
        {allShorts.map((short) => (
          <Card key={short.id} className="overflow-hidden p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Video Thumbnail */}
              <div className="relative h-96 md:h-auto bg-gray-900">
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{short.title}</h3>
                  <p className="text-gray-200 text-sm">{short.description}</p>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[20px] border-l-primary-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                {/* Restaurant Info */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={short.restaurantImage}
                      alt={short.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{short.restaurantName}</h4>
                    <p className="text-sm text-gray-600">{t('shorts.restaurant')}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Eye size={20} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{short.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{t('common.views')}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-pink-600 mb-1">
                      <Heart size={20} className={likedVideos.has(short.id) ? 'fill-pink-600' : ''} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {(short.likes + (likedVideos.has(short.id) ? 1 : 0)).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{t('common.likes')}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <MessageCircle size={20} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{short.comments.length}</p>
                    <p className="text-xs text-gray-500">{t('common.comment')}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button
                    onClick={() => toggleLike(short.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      likedVideos.has(short.id)
                        ? 'bg-pink-100 text-pink-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={20} className={likedVideos.has(short.id) ? 'fill-pink-600' : ''} />
                    <span>{likedVideos.has(short.id) ? t('common.liked') : t('common.like')}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    <Share2 size={20} />
                    <span>{t('common.share')}</span>
                  </button>
                </div>

                {/* Comments Preview */}
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">{t('common.comments')}</h4>
                  {short.comments.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {t('shorts.noComments')}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {short.comments.slice(0, 3).map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{comment.userName}</p>
                            <p className="text-sm text-gray-600">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

