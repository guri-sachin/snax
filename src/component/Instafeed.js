
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const accessToken = 'IGQWROMnhrVEMyd1lldkg2YU9hUER0WW5ta0xLc2RaYmxCYWc4X1JFeXdqeUJMU1htLUVPbXREeDJhRWxhMF9yRWJmLTFLQ1ZAsYzFRTC1vLUIwdkotU2xhYUJCODFXaV9CVWlsd2RKeExWOExudFNvdE5LN1B1OG8ZD'; // Replace with your generated access token.

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`);
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };
    fetchInstagramPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Instagram Feed</h2>

      {/* Carousel */}
      <div className="flex overflow-x-scroll space-x-6 py-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="instagram-post rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 min-w-[250px] cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
              <img
                src={post.media_url}
                alt={post.caption || 'Instagram post'}
                className="w-full h-56 object-cover"
              />
            ) : post.media_type === 'VIDEO' ? (
              <video src={post.media_url} controls className="w-full h-56 object-cover" />
            ) : null}
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedPost(null)}
            >
              &times;
            </button>
            <div>
              {selectedPost.media_type === 'IMAGE' || selectedPost.media_type === 'CAROUSEL_ALBUM' ? (
                <img
                  src={selectedPost.media_url}
                  alt={selectedPost.caption || 'Instagram post'}
                  className="w-full h-auto object-cover mb-4"
                />
              ) : selectedPost.media_type === 'VIDEO' ? (
                <video src={selectedPost.media_url} controls className="w-full h-auto object-cover mb-4" />
              ) : null}
              <p className="text-gray-700">{selectedPost.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;
