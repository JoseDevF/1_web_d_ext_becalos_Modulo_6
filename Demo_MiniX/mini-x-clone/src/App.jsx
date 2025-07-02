const users = []
// -----------------------------------------------------------------------------
// 🧩 Lección 1 – Fundamentos, JSX, Props | Semana 1
// -----------------------------------------------------------------------------
// importaciones ES6: React + hooks y utilidades.
// Siempre importamos solo lo necesario del core de React.
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
  memo,
} from 'react';

// Framer Motion se usa para animaciones declarativas (fuera del scope React).
import { motion, AnimatePresence } from 'framer-motion';

// -----------------------------------------------------------------------------
// 🧩 Lección 6 – useReducer + Context | Autenticación global
// -----------------------------------------------------------------------------
// 💡 createContext() crea un "túnel" para compartir estado sin prop‑drilling.
const AuthContext = createContext(null);

// Reducer -> patrón tipo Redux pero sin librerías externas.
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    default:
      return state; // ⚠️ BEST PRACTICE: reducer siempre devuelve estado válido.
  }
};

// Componente proveedor (Provider) – envuelve a <App/>. Similar al RouteProvider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  // useCallback -> la identidad de la función sólo cambia cuando cambie dispatch.
  const login = useCallback((username) => {
    // Para principiantes: nunca mutamos el estado, sólo despachamos acciones.
    dispatch({ type: 'LOGIN', user: { username, avatar: '👤' } });
  }, []);

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), []);

  // ⚠️ BEST PRACTICE: Memoizar el value si fuera un objeto con refs grandes.
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de conveniencia – evitamos repetir useContext(AuthContext) en todos lados.
const useAuth = () => useContext(AuthContext);

// -----------------------------------------------------------------------------
// 🧩 Home – integra TweetComposer + TweetFeed
// -----------------------------------------------------------------------------
const Home = ({ onViewDetail, onViewProfile }) => {
  const { user, isAuthenticated } = useAuth();
  const [tweets, setTweets] = useState([
    {
      id: 1,
      user: 'demo_user',
      avatar: '🚀',
      text: 'Bienvenido a MiniX! Este es un tweet de ejemplo…',
      timestamp: Date.now() - 3600000,
      likes: 15,
      retweets: 4,
      replies: 2,
    },
    {
      id: 2,
      user: 'tech_lover',
      avatar: '💻',
      text: 'Acabo de terminar mi proyecto en React con hooks…',
      timestamp: Date.now() - 7200000,
      likes: 23,
      retweets: 7,
      replies: 5,
    },
    {
      id: 3,
      user: 'designer_pro',
      avatar: '🎨',
      text: 'El diseño responsive con Tailwind CSS es increíble.',
      timestamp: Date.now() - 10800000,
      likes: 8,
      retweets: 2,
      replies: 1,
    },
  ]);

  const publishTweet = useCallback(
    (text) => {
      if (!isAuthenticated || !user) return;
      const newTweet = {
        id: Date.now(),
        user: user.username,
        avatar: user.avatar,
        text,
        timestamp: Date.now(),
        likes: 0,
        retweets: 0,
        replies: 0,
      };
      setTweets((prev) => [newTweet, ...prev]);
    },
    [isAuthenticated, user]
  );

  const handleLike = useCallback((id, isLiking) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, likes: Math.max(0, t.likes + (isLiking ? 1 : -1)) } : t
      )
    );
  }, []);

  const handleRetweet = useCallback((id, isRetweeting) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, retweets: Math.max(0, t.retweets + (isRetweeting ? 1 : -1)) } : t
      )
    );
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <TweetComposer onTweet={publishTweet} />
      <TweetFeed
        tweets={tweets}
        onLike={handleLike}
        onRetweet={handleRetweet}
        onViewDetail={onViewDetail}
      />
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// 🧩 Profile – vista de usuario
// -----------------------------------------------------------------------------
const Profile = ({ username, onBack }) => {
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;

  const avatarMap = {
    demo_user: '🚀',
    tech_lover: '💻',
    designer_pro: '🎨',
  };
  const statsMap = {
    demo_user: { tweets: 42, following: 127, followers: 89 },
    tech_lover: { tweets: 234, following: 56, followers: 341 },
    designer_pro: { tweets: 156, following: 78, followers: 203 },
  };

  const avatar = avatarMap[username] ?? '👤';
  const stats = statsMap[username] ?? { tweets: 0, following: 0, followers: 0 };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl">
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <button onClick={onBack} className="text-blue-500 hover:underline text-sm">
            ← Volver
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-6xl">{avatar}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">@{username}</h1>
              <p className="text-gray-500 mb-3">
                {isOwnProfile ? 'Tu perfil' : `Perfil de ${username}`}
              </p>
              <div className="flex gap-6 text-sm">
                <span>
                  <strong>{stats.tweets}</strong>{' '}
                  <span className="text-gray-600">Tweets</span>
                </span>
                <span>
                  <strong>{stats.following}</strong>{' '}
                  <span className="text-gray-600">Siguiendo</span>
                </span>
                <span>
                  <strong>{stats.followers}</strong>{' '}
                  <span className="text-gray-600">Seguidores</span>
                </span>
              </div>
              {!isOwnProfile && (
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  Seguir
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 bg-white text-center text-gray-500">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-lg">Los tweets de @{username} aparecerían aquí</p>
        <p className="text-sm mt-2">
          En una implementación real, aquí se cargarían los tweets del usuario
        </p>
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// 🧩 PostDetail – detalle de un tweet
// -----------------------------------------------------------------------------
const PostDetail = ({ tweetId, onBack, onViewProfile }) => {
  const lookup = {
    1: {
      user: 'demo_user',
      avatar: '🚀',
      text: 'Bienvenido a MiniX! Este es un tweet de ejemplo…',
      timestamp: Date.now() - 3600000,
      likes: 15,
      retweets: 4,
      replies: 2,
    },
    2: {
      user: 'tech_lover',
      avatar: '💻',
      text: 'Acabo de terminar mi proyecto en React con hooks…',
      timestamp: Date.now() - 7200000,
      likes: 23,
      retweets: 7,
      replies: 5,
    },
  };

  const tweet =
    lookup[tweetId] ?? {
      user: 'usuario_ejemplo',
      avatar: '👤',
      text: 'Este es el contenido detallado del tweet.',
      timestamp: Date.now() - 3600000,
      likes: 0,
      retweets: 0,
      replies: 0,
    };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-white">
      <div className="p-4 border-b border-gray-200">
        <button onClick={onBack} className="text-blue-500 hover:underline text-sm">
          ← Volver
        </button>
      </div>
      <div className="p-6">
        <div className="flex gap-4">
          <div className="text-4xl">{tweet.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => onViewProfile(tweet.user)}
                className="font-bold text-lg hover:underline"
              >
                @{tweet.user}
              </button>
              <span className="text-gray-500">
                {new Date(tweet.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-xl leading-relaxed mb-6">{tweet.text}</p>
            <div className="flex items-center gap-8 text-gray-600 text-lg border-t border-gray-100 pt-4">
              <span className="flex items-center gap-2">❤️ {tweet.likes}</span>
              <span className="flex items-center gap-2">🔄 {tweet.retweets}</span>
              <span className="flex items-center gap-2">💬 {tweet.replies}</span>
              <span className="flex items-center gap-2">📤</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// -----------------------------------------------------------------------------
// 🧩 Lección 5 – Renderizado Condicional & props.children | LoginModal
// -----------------------------------------------------------------------------
const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState(''); // Lección 2 (useState)
  const { login } = useAuth();
  const inputRef = useRef(null); // Lección 6 (useRef)

  // useEffect → enfoca el input cuando el modal se abre (ciclo de vida: mount).
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Handler estable gracias a useCallback (evita re‑crearse en cada render).
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (!username.trim()) return; // guard clause.
      login(username.trim());
      onClose();
      setUsername('');
    },
    [login, username, onClose]
  );

  if (!isOpen) return null; // Render condicional básico.

  return (
    <motion.div
      /* Backdrop */
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        /* Caja modal */
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <input
          ref={inputRef}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
          placeholder="Ingresa tu nombre de usuario"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleLogin}
            disabled={!username.trim()}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Entrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// 🧩 Lección 1+2 – Props, Estado, Eventos | Navigation
// -----------------------------------------------------------------------------
const Navigation = ({ currentView, setCurrentView }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
          {/* Botón logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="text-2xl font-extrabold text-blue-500 hover:text-blue-600"
          >
            MiniX
          </button>

          {/* Menú derecho */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('home')}
              className={`hover:text-blue-500 ${currentView === 'home' ? 'font-bold text-blue-500' : 'text-gray-700'
                }`}
            >
              Inicio
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView(`profile-${user.username}`)}
                  className={`hover:text-blue-500 ${currentView.startsWith('profile')
                    ? 'font-bold text-blue-500'
                    : 'text-gray-700'
                    }`}
                >
                  {user.avatar} {user.username}
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Modal de login controlado por estado */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal isOpen onClose={() => setShowLoginModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// -----------------------------------------------------------------------------
// 🧩 Lección 2 (useState) + useRef + useCallback | TweetComposer
// -----------------------------------------------------------------------------
const TweetComposer = ({ onTweet }) => {
  const [text, setText] = useState('');
  const { user, isAuthenticated } = useAuth();
  const inputRef = useRef(null);

  // Focus automático al autenticarse.
  useEffect(() => {
    if (isAuthenticated) inputRef.current?.focus();
  }, [isAuthenticated]);

  const remaining = 280 - text.length;

  const handleSubmit = useCallback(() => {
    if (!text.trim() || remaining < 0) return;
    onTweet(text.trim());
    setText('');
  }, [text, remaining, onTweet]);

  if (!isAuthenticated)
    return (
      <div className="border-b border-gray-200 p-6 bg-white text-center text-gray-500">
        Inicia sesión para crear un tweet
      </div>
    );

  return (
    <motion.div
      className="border-b border-gray-200 p-6 bg-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-3">
        <div className="text-3xl">{user.avatar}</div>
        <div className="flex-1">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSubmit()}
            maxLength={280}
            placeholder="¿Qué está pasando?"
            className="w-full resize-none outline-none text-lg bg-transparent"
            rows={3}
          />

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {/* contador dinámico */}
              {remaining < 20 && (
                <span className={`text-sm font-medium ${remaining < 0 ? 'text-red-500' : 'text-orange-500'}`}>
                  {remaining} caracteres restantes
                </span>
              )}
              <span className="text-xs text-gray-400">Ctrl+Enter para enviar</span>
            </div>
            <button
              disabled={!text.trim() || remaining < 0}
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
            >
              Tweetear
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// 🧩 Lección 6 – useCallback + React.memo | TweetCard (presentacional)
// -----------------------------------------------------------------------------
const TweetCard = memo(({ tweet, onLike, onRetweet, onViewDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  // ⚠️ BEST PRACTICE: las dependencias incluyen sólo lo necesario.
  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();
      setIsLiked((prev) => !prev);
      onLike(tweet.id, !isLiked);
    },
    [tweet.id, isLiked, onLike]
  );

  const handleRetweet = useCallback(
    (e) => {
      e.stopPropagation();
      setIsRetweeted((prev) => !prev);
      onRetweet(tweet.id, !isRetweeted);
    },
    [tweet.id, isRetweeted, onRetweet]
  );

  return (
    <motion.div
      className="border-b border-gray-200 p-6 bg-white hover:bg-gray-50 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onViewDetail(tweet.id)}
    >
      <div className="flex gap-3">
        <div className="text-2xl">{tweet.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold hover:underline">@{tweet.user}</span>
            <span className="text-gray-500 text-sm">
              {new Date(tweet.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-900 mb-3 leading-relaxed">{tweet.text}</p>
          <div className="flex items-center gap-6 text-gray-500">
            {/* Botones de interacción */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              ❤️
              <span className="text-sm">{tweet.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button
              onClick={handleRetweet}
              className={`flex items-center gap-1 ${isRetweeted ? 'text-green-500' : 'hover:text-green-500'}`}
            >
              🔄
              <span className="text-sm">{tweet.retweets + (isRetweeted ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              💬 <span className="text-sm">{tweet.replies}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">📤</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// -----------------------------------------------------------------------------
// 🧩 Lección 3 – useMemo para filtrado + orden | TweetFeed
// -----------------------------------------------------------------------------
const TweetFeed = ({ tweets, onLike, onRetweet, onViewDetail }) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // useMemo evita trabajo pesado si tweets no cambian.
  const processedTweets = useMemo(() => {
    const filtered = tweets.filter((t) =>
      [t.text, t.user].some((field) => field.toLowerCase().includes(query.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'popular':
          return b.likes + b.retweets - (a.likes + a.retweets);
        default:
          return 0;
      }
    });
  }, [tweets, query, sortBy]);

  // 👀 EJERCICIO: loggear processedTweets.length y ver cómo cambia.

  return (
    <div>
      {/* UI de búsqueda + orden */}
      <div className="border-b border-gray-200 p-4 bg-white space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tweets o usuarios…"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="popular">Más populares</option>
          </select>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {processedTweets.length} tweet{processedTweets.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Listado */}
      <AnimatePresence>
        {processedTweets.length === 0 ? (
          <motion.div className="p-8 text-center text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {query ? (
              <>
                <div className="text-4xl mb-2">🔍</div>
                No se encontraron tweets para "{query}"
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🐦</div>
                No hay tweets aún. ¡Sé el primero!
              </>
            )}
          </motion.div>
        ) : (
          processedTweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onLike={onLike}
              onRetweet={onRetweet}
              onViewDetail={onViewDetail}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================================
   COMPONENTE PRINCIPAL <App/> – Une todo y demuestra react-router (semana 4).
============================================================================ */
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handlers memorizados (useCallback) – evitan renders innecesarios aguas abajo.
  const handleViewDetail = useCallback((id) => {
    setSelectedTweetId(id);
    setCurrentView('detail');
  }, []);

  const handleViewProfile = useCallback((username) => {
    setSelectedUser(username);
    setCurrentView('profile');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('home');
    setSelectedTweetId(null);
    setSelectedUser(null);
  }, []);

  // Renderiza la vista según el estado – reemplazar por react-router-dom en la
  // Semana 4 para mostrar la navegación real con rutas.
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home onViewDetail={handleViewDetail} onViewProfile={handleViewProfile} />;
      case 'detail':
        return (
          <PostDetail tweetId={selectedTweetId} onBack={handleBack} onViewProfile={handleViewProfile} />
        );
      case 'profile':
        return <Profile username={selectedUser} onBack={handleBack} />;
      default:
        return <Home onViewDetail={handleViewDetail} onViewProfile={handleViewProfile} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex justify-center py-4">
          <AnimatePresence mode="wait">{renderCurrentView()}</AnimatePresence>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-gray-500 text-sm">
          <p>MiniX – Clon educativo de Twitter con React Hooks</p>
        </footer>
      </div>
    </AuthProvider>
  );
}