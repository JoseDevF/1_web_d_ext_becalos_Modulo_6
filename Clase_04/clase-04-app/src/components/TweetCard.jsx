// components/TweetCard.jsx
import React, { useState, useEffect } from 'react';
import InteractionButton from './InteractionButton';

const CommentIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const RetweetIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);
const LikeIcon = ({ filled }) => (
    <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
const ShareIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

function TweetCard({ usuario, contenido }) {
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);

    useEffect(() => {
        console.log(`TweetCard de ${usuario} montado`);
        return () => console.log(`TweetCard de ${usuario} desmontado`);
    }, [usuario]);

    return (
        <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-bold text-lg">
                        {usuario.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-gray-900">{usuario}</h3>
                        <span className="text-gray-500">@{usuario}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 text-sm">hace 2h</span>
                    </div>
                    <p className="text-gray-900 mb-3 leading-normal">{contenido}</p>
                    <div className="flex items-center justify-between max-w-md">
                        <InteractionButton>
                            <CommentIcon />
                        </InteractionButton>
                        <InteractionButton
                            onClick={() => setRetweets(r => r + 1)}
                            count={retweets}
                            hoverColor="text-green-500"
                            hoverBg="bg-green-50"
                        >
                            <RetweetIcon />
                        </InteractionButton>
                        <InteractionButton
                            onClick={() => setLikes(l => l + 1)}
                            count={likes}
                            active={likes > 0}
                            activeColor="text-red-500"
                            hoverBg="bg-red-50"
                        >
                            <LikeIcon filled={likes > 0} />
                        </InteractionButton>
                        <InteractionButton>
                            <ShareIcon />
                        </InteractionButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(TweetCard);
