import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const accessToken = process.env.REACT_APP_INSTA_FEED;

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

  // Close the popup when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      setSelectedPost(null);
    }
  };

  return (
    <div className="py-12 px-8 min-h-[350px] md:py-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#8A0404]">INSTAGRAM FEED</h2>

      {/* Carousel */}
      <div className="flex overflow-x-scroll space-x-6 py-4 scrollbar-hide">
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
                className="w-full h-60 object-cover"
              />
            ) : post.media_type === 'VIDEO' ? (
              <video src={post.media_url} controls className="w-full h-60 object-cover" />
            ) : null}
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedPost && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg p-4 w-11/12 sm:w-3/4 lg:w-2/3 flex flex-col lg:flex-row max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedPost(null)}
            >
              &times;
            </button>
            
            {/* Left side: Media */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
              {selectedPost.media_type === 'IMAGE' || selectedPost.media_type === 'CAROUSEL_ALBUM' ? (
                <img
                  src={selectedPost.media_url}
                  alt={selectedPost.caption || 'Instagram post'}
                  className="w-full h-auto max-h-[60vh] object-cover rounded-md"
                />
              ) : selectedPost.media_type === 'VIDEO' ? (
                <video src={selectedPost.media_url} controls className="w-full h-auto max-h-[60vh] object-cover rounded-md" />
              ) : null}
            </div>

            {/* Right side: Caption */}
            <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center">
              <p className="text-gray-700 text-lg mb-4">{selectedPost.caption}</p>
              <p className="text-sm text-gray-500">Posted on {new Date(selectedPost.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;
